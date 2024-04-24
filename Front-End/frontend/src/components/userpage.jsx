import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const UserTable = ({ staffList }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([]);
    const [constUserDetails, setConstUserDetails] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    const filterFunction = (e) => {
        setSearchVal(e.target.value);
    };

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
            const response = await axios.put(`http://127.0.0.1:5000/api/users/customers`, staff)
            const result = await response.data
            console.log('Data updated successfully:', result)
        } catch (error){
            throw error
        }
    }


    return (
        <div className="overflow-x-auto">
            <div className="row">
                <h1 className="label">User Information</h1>
                {/*<div className="label">Staff</div>*/}
                <button className="add-button" onClick={() => {
                    navigate("/user/adduser")
                }}> + Add User</button>
            </div>
            <br/>
            <div>
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
                    {/*<input type="text" placeholder="Search" style={{margin: '5px', alignItems: 'center'}}/>
                <button className="search-button" style={{marginBottom: '2px'}}>Search</button>*/}
            </div>
            <br/>
            <table className="table">
            {/* head */}
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;