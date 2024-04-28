import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import StaffNavbar from "../../../components/staffNavbar";
import {useStoreLogin} from "../../../stores/store-login";
import axios from "axios";

const ManageDevice = () => {
    let baseUrl = "http://127.0.0.1:5000/api";
    const { loggedUser, updateLoggedUser } = useStoreLogin();
    let userID = loggedUser.user_id;
    let navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDeviceDetails() {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/devices`);
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchDeviceDetails();
    }, []);

    return (
        <div className="overflow-x-auto">
            <div className="row">
                <StaffNavbar />
            </div>
            <div className="divider"></div>
            <h1 className="text-2xl font-bold mb-4 p-4" style={{ textAlign: "center" }}>Device Details</h1>
            <div className="divider"></div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Staff_id</th>
                        <th>Device_id</th>
                        <th>User_id</th>
                        <th>Device Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.device_id}>
                            <td>{order.staff_id}</td>
                            <td>{order.device_id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.device_type}</td>
                            <td>{order.category}</td>
                            <td>{order.date}</td>
                            <td>{order.price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default ManageDevice;