import AdminStaffTable from "../../components/adminstafftable";
import Navbar from "../../components/navbar";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const AdminStaffPage = () => {

    const [staffData, setStaffData] = useState([])

    useEffect(() => {
        const fetchStaffData = async ()=>{
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/users');
                const result = await response.data; // Return the response data
                setStaffData(result)
            } catch (error) {
                throw error; // Throw the error for handling in the component
            }
        }

        fetchStaffData()

    }, [])

    return (
        <div>
            <Navbar />
            <AdminStaffTable staffList={staffData}/>
        </div>
    );
};

export default AdminStaffPage;
