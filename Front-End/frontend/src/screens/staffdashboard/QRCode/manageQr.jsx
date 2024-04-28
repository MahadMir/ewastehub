import { useEffect, useState } from "react";
import axios from "axios";
import StaffNavbar from "../../../components/staffNavbar";
import { useStoreLogin } from "../../../stores/store-login";

const ManageQR = () => {
    let baseUrl = "http://127.0.0.1:5000/api";
    const { loggedUser, updateLoggedUser } = useStoreLogin();
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
            <h1 className="text-2xl font-bold mb-4 p-4" style={{ textAlign: "center" }}>QR Code Details</h1>
            <div className="divider"></div>
        </div>
    );
};

export default ManageQR;
