import { TiThMenu } from "react-icons/ti";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import StaffInfo from "../screens/staffdashboard/StaffInfoPage/staffinfo";



export const StaffDrawer = () => {
    return (


        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                {/* Page content here */}
                <TiThMenu/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a href='/sdashboard/staffinfo'>Staff Members</a></li>
                    <li><a href='/sdashboard/userinfo'>User Information</a></li>
                    <li><a href=''>Device Management</a></li>
                    <li><a href=''>QR Code Management</a></li>
                    <li><a href=''>Payment Management</a></li>

                </ul>
            </div>
        </div>
    )

}
