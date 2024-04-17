import React from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const StaffTable = ({ staffList }) => {
    const navigate = useNavigate();
    const curriedHandleSelectChange = (staff) => {
        const handleSelectChange = (event) => {
            const newVal = event.target.value
            const newStaff = {...staff, "role":newVal}
            changeRole(newStaff)
        }
        return handleSelectChange
    }

    const changeRole = async (staff) => {
        try{
            const response = await axios.put(`http://127.0.0.1:5000/api/users/staff`, staff)
            const result = await response.data
            console.log('Data updated successfully:', result)
        } catch (error){
            throw error
        }
    }


    return (
        <div className="overflow-x-auto">
            <div className="row">
                <h1 className="label">Staff</h1>
                {/*<div className="label">Staff</div>*/}
                <button className="add-button" onClick={() => {
                    navigate("/staff/addstaff")
                }}> + Add Staff</button>
            </div>
            <br/>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
                <input type="text" placeholder="Search" style={{margin: '5px', alignItems: 'center'}}/>
                <button className="search-button" style={{marginBottom: '2px'}}>Search</button>
            </div>
            <br/>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>staff_id</th>
                    <th>User_id</th>
                </tr>
                </thead>
                <tbody>
                {staffList.map(staff => (
                    <tr key={staff.staff_id}>
                        <td>{staff.name}</td>
                        <td>{staff.email}</td>
                        <td>{staff.contact}</td>
                        <td>{staff._id}</td>
                        <td>{staff.user_id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffTable;
