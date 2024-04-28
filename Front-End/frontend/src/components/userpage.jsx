import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function handleViewOrders(user_id) {
    
}

const UserTable = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [constUserDetails, setConstUserDetails] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    let baseUrl = "http://127.0.0.1:5000/api";
    const filterFunction = (e) => {
        setSearchVal(e.target.value);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/users');
                setUserDetails(response.data);
                setConstUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        const searchValue = searchVal.toLowerCase();
        const filteredList = constUserDetails.filter((user) => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseEmail = user.email.toLowerCase();
            const lowerCaseContact = user.contact.toLowerCase();

            return (
                lowerCaseName.includes(searchValue) ||
                lowerCaseEmail.includes(searchValue) ||
                lowerCaseContact.includes(searchValue)
            );
        });

        setUserDetails(filteredList);
    }, [searchVal, constUserDetails]);

    async function fetchAllOrders() {
        try {
            // Fetch orders data based on user_id from the backend API
            const ordersResponse = await fetch(`${baseUrl}/orders`);
            if (!ordersResponse.ok) {
                throw new Error('Failed to fetch orders');
            }
            const orders = await ordersResponse.json();

            // Fetch all devices from the backend API
            const devicesResponse = await fetch(`${baseUrl}/devices`);
            if (!devicesResponse.ok) {
                throw new Error('Failed to fetch devices');
            }
            const devices = await devicesResponse.json();

            const usersResponse = await fetch(`${baseUrl}/users`);
            if (!usersResponse.ok) {
                throw new Error('Failed to fetch devices');
            }
            const users = await usersResponse.json();

            // Map all devices to their orders based on the device_id
            const filteredOrders = orders
                .filter(order => order.status === "Processed")
                .map(order => {
                    const device = devices.find(device => device.device_id === order.device_id);
                    const user = users.find(user => user.user_id === order.user_id);
                    return {
                        name: user.name,
                        device_name: device.device_name,
                        device_type: device.device_type,
                        classification: device.classification,
                        order_id: order.order_id,
                        date: order.date,
                        status: order.status,
                        price: device.price,
                        photos: device.photos,
                    };
                });

            console.log(orders)
            setOrders(filteredOrders)
            return filteredOrders;
        } catch (error) {
            console.error('Error fetching filtered orders:', error);
            return []; // Return an empty array or handle error as needed
        }
    }
    fetchAllOrders().then(() => {"fetched all the orders"})
    /*const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/orders/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            return [];
        }
    };*/

    /*const handleViewOrders = async (userId) => {
        const orders = await fetchUserOrders(userId);
        // Here you can do something with the orders, like displaying them in a modal or navigating to another page
        console.log('Orders for user', userId, ':', orders);
    };*/

    return (
        <div className="overflow-x-auto">
            <div className="row">
                <h1 className="text-2xl font-bold mb-4 p-4" style={{ textAlign: "center" }}>User Information</h1>
                <button className="add-button" onClick={() => navigate("/user/adduser")}> + Add User</button>
            </div>

            <div className="divider"></div>

            <div className="flex items-center justify-center h-full p-4">
                <div className="products flex flex-wrap justify-center gap-4 overflow-y-auto">
                    {userDetails.map((user) => (
                        <div className="card card-compact w-80 bg-base-100 shadow-xl" key={user.user_id}>
                            <div className="card-body">
                                <h2 className="card-title">{user.name}</h2>
                                <p>Email: {user.email}</p>
                                <p>Contact: {user.contact}</p>
                                <button className="btn btn-primary" onClick={() => handleViewOrders(user.user_id)}>View Orders</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTable;
