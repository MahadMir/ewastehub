import CustomerNavbar from "../../components/customerNavbar";
import React, {useEffect, useState} from "react";
import {useStoreLogin} from "../../stores/store-login";
import {OrderTable} from "../customer-portal/ordertable/ordertable";
import {useNavigate} from "react-router-dom";



export const Orders = () => {

    let navigate = useNavigate();

    let baseUrl = "http://127.0.0.1:5000/api";


    const [orders, setOrders] = useState([]);
    const [sortChoice, setSortChoice] = useState();
    const [categoryChoice, setCategoryChoice] = useState();
    const [deviceTypeChoice, setDeviceTypeChoice] = useState();


    const {loggedUser, updateLoggedUser} = useStoreLogin();

    let userID = loggedUser.user_id

    function countPendingOrders(){
        let pendingCount = 0;

// Iterate over the array of orders
        orders.forEach(order => {
            // Check if the status of the current order is "pending"
            if (order.status === 'Pending') {
                // If yes, increment the pendingCount
                pendingCount++;
            }
        });
        return pendingCount
    }

    useEffect(() => {
        // This code will be executed once when the component mounts

        async function fetchFilteredOrders(userID) {
            try {
                // Fetch orders data based on user_id from the backend API
                const ordersResponse = await fetch(`${baseUrl}/orders/user/${userID}`);
                if (!ordersResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }


                const orders = await ordersResponse.json();


                const serviceResponse = await fetch(`${baseUrl}/service`);
                if (!serviceResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const services = await serviceResponse.json()

                // Fetch all devices from the backend API
                const devicesResponse = await fetch(`${baseUrl}/devices`);
                if (!devicesResponse.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const devices = await devicesResponse.json();

                // Map all devices to their orders based on the device_id
                const filteredOrders = orders.map(order => {
                    const device = devices.find(device => device.device_id === order.device_id);
                    const service = services.find(service => service.service_id === order.service_id)
                    return {
                        device_name: device.device_name,
                        device_type: device.device_type,
                        classification: device.classification,
                        order_id: order.order_id,
                        date: order.date,
                        status: order.status,
                        price: device.price,
                        photos: device.photos,
                        service_name: service.service_name
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

        fetchFilteredOrders(userID).then(r => () => {console.log("done")})
        // Place your one-time initialization logic or any other code here
        console.log('Component mounted');

    }, []);








    return (
        <div>
            <div>
                <CustomerNavbar/>
            </div>
            <h1 className="text-2xl font-bold mb-4 p-4" style={{textAlign: "center"}}>Order Details</h1>
            <div className="divider"></div>


            <div className="flex items-center justify-center h-full">

                {/* Container to center align the div */}
                <div className="p-4 flex flex-row items-center justify-between">
                    <div id="sort" className="mr-2 pr-10 justify-start">
                        <select  value={sortChoice} onChange={(e) => setSortChoice(e.target.value)} className="select select-bordered max-w-xs">
                            <option disabled selected>Sort By</option>
                            <option value="Date Added">Date Added</option>
                            <option value= "Price Ascending">Price (Ascending)</option>
                            <option value =  "Price Descending">Price (Descending)</option>
                        </select>
                    </div>
                    <div id="type" className="mr-2 pr-10 ">
                        <select value={deviceTypeChoice} onChange={(e) => setDeviceTypeChoice(e.target.value)} className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Device Type</option>
                            <option value = "tablet">Tablet</option>
                            <option value = "laptop">Laptop</option>
                            <option value = "smartphone">Smartphone</option>
                            <option value = "smartwatch">Smartwatch</option>
                        </select>
                    </div>
                    <div id="category" className="mr-60 pr-100">
                        <select value={categoryChoice} onChange={(e) => setCategoryChoice(e.target.value)} className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Category</option>
                            <option value = "current">Current</option>
                            <option value = "rare">Rare</option>
                            <option value ="recyclable" >Recyclable</option>
                            <option value = "unknown">Unknown</option>
                        </select>
                    </div>
                    <div id="button">
                        <button className="btn btn-outline btn-primary"
                                onClick={() => navigate("/customer/placeorder")}>Place Order
                        </button>
                    </div>
                </div>
            </div>


            <div className="divider"></div>
            <div>
                <div>
                    <OrderTable tableData={orders}
                                sortChoice = {sortChoice}
                                categoryChoice = {categoryChoice}
                                deviceTypeChoice = {deviceTypeChoice}
                                onClick={() => document.getElementById('my_modal_3').showModal()}
                                onClick1={() => {
                                    navigate("/customer/editorder")
                                }}/>
                </div>
            </div>
        </div>
    )
}
