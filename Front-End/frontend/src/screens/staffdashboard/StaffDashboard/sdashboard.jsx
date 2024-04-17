import React, { useState } from 'react';
import './sdashboard.css';
import StaffNavbar from "../../../components/staffNavbar";

const Sdashboard = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="stats shadow w-full">
            <div className="row">
                <StaffNavbar/>

                <div className={`stat place-items-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <div className="stat-title"><a href="/sdashboard/staffinfo">Staff Members</a></div>
                </div>
                <br/>
                <div className={`stat place-items-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <div className="stat-title"><a href="/sdashboard/userinfo">User Management</a></div>
                </div>
                <br/>
                <div className={`stat place-items-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <div className="stat-title"><a href="#">Device Management</a></div>
                </div>
                <br/>
                <div className={`stat place-items-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <div className="stat-title"><a href="#">QR Code Management</a></div>
                </div>
                <br/>
                <div className={`stat place-items-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <div className="stat-title"><a href="#">Payment Management</a></div>
                </div>
            </div>
        </div>
    );
}

export default Sdashboard;
