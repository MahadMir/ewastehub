import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTable = ({ staffList }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([]);
    const [constUserDetails, setConstUserDetails] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    const filterFunction = (e) => {
        setSearchVal(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const filteredList = constUserDetails.filter(user => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseEmail = user.email.toLowerCase();
            const lowerCaseContact = user.contact.toLowerCase();

            return (
                lowerCaseName.includes(searchVal) ||
                lowerCaseEmail.includes(searchVal) ||
                lowerCaseContact.includes(searchVal)
            );
        });

        setUserDetails(filteredList);
    }, [searchVal, constUserDetails]);

    const changeRole = async (staffId, newRole) => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/api/users/${staffId}`, { role: newRole });
            console.log('Role updated successfully:', response.data);
            // Update local state after successful role update if needed
        } catch (error) {
            console.error('Error updating role:', error);
            // Handle error as needed
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="row">
                <h1 className="text-2xl font-bold mb-4 p-4" style={{ textAlign: "center" }}>User Information</h1>
                <button className="add-button" onClick={() => navigate("/user/adduser")}> + Add User</button>
            </div>

            <div className="divider"></div>

            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searchVal}
                    onChange={filterFunction}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            <br/>

            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Staff_id</th>
                    <th>User_id</th>
                    <th>Expected Value</th>
                    <th>Current Status</th>
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
                        <td>{staff.value}</td>
                        <td>{staff.status}</td>
                        {/*<td>
                            <button className="btn" onClick={() => changeRole(user._id, 'newRole')}>
                                Change Role
                            </button>
                        </td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
