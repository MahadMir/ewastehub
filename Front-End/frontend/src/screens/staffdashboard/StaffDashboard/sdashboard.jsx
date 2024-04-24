import React, { useState } from 'react';
import './sdashboard.css';
import StaffNavbar from "../../../components/staffNavbar";
import AdminDashboardStats from "../../../components/admindashboardstats";
import AdminDashboardTable from "../../../components/admindashboardtable";
import axios from "axios";
import {  useEffect } from "react";
import AdminDashBoardDeviceType from "../../../components/admindashboarddevicetype";
import AdminDashboardStatusCount from "../../../components/admindashboardstatuscount";
import StaffDashboardStats from "../../../components/staffdashboardstats";



const Sdashboard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [numberOfStaff, setNumberOfStaff] = useState(0);
    const [numberOfProcessedOrders, setNumberOfProcessedOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    const [changed, setChanged] = useState(false);
    const [numUsers, setNumUsers] = useState([]);

    useEffect(() => {
        const fetchDataUrl = async (url) => {
            try {
                const res = await axios.get(url);
                const result = res.data;
                return result;
            } catch (error) {
                return [];
            }
        };

        const fetchData = async () => {
            let endpoints = [
                "/users/staff",
                "/orders",
                "/users/customers",
            ];
            let baseUrl = "http://127.0.0.1:5000/api";

            try {
                let data = await Promise.all(
                    endpoints.map(async (url) => {
                        let currData = await fetchDataUrl(baseUrl + url);
                        return currData;
                    })
                );

                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const getNumberOfProcessedOrders = (data) => {
            let pendingItems = data.map((item) => {
                let statusOfItem = item["status"] === "Processed" ? 1 : 0;
                return statusOfItem;
            });
            const initialValue = 0;
            const sumWithInitial = pendingItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue
            );
            return sumWithInitial;
        };

        fetchData().then((res) => {
            setNumberOfStaff(res[0].length + res[1].length);
            setNumberOfProcessedOrders(getNumberOfProcessedOrders(res[2]));
            setOrders(res[2]);
            setNumUsers(res[3].length);
        });

        /*const fetchDataInterval = setInterval(() => {
          fetchData().then((res) => {
            setNumberOfStaff(res[0].length + res[1].length);
            setNumberOfProcessedOrders(getNumberOfProcessedOrders(res[2]));
            setOrders(res[2]);
            setNumUsers(res[3].length);
          });
        }, 1000);

        return () => clearInterval(fetchDataInterval);*/
    },[]);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <StaffNavbar/>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
            </div>
            <div className="divider"></div>
            <StaffDashboardStats
                /*numberOfStaff={numberOfStaff}*/
                numberOfUsers={numUsers}
                numberOfProcessedOrders={numberOfProcessedOrders}
            ></StaffDashboardStats>
            <div className="divider"></div>
            <div className="flex w-full">
                <div className="grid flex-grow  bg-base-300 rounded-box place-items-center">
                    <h1>Last Five Orders</h1>
                    <AdminDashboardTable
                        orders={orders}
                        changed={setChanged}
                        changevar={changed}
                    ></AdminDashboardTable>
                </div>
                <div className="divider divider-horizontal"></div>

                <div className="">
                    <div className="m-6">
                        <AdminDashBoardDeviceType changed={changed} className="m-20"/>
                    </div>
                    <div className="m-6">
                        <AdminDashboardStatusCount changed={changed} className="m-20"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sdashboard;
