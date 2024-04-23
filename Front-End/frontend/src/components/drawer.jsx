import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "../screens/admindashboard/admindashboard";
import Navbar from "./navbar";

export const Drawer = () => {
  const navigate = useNavigate();
  const [toggled, setToggle] = useState(false);


  const updateToggle = ()=>{
    setToggle(prev=>!prev)
  }
    return (
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          checked={toggled}
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <Navbar updateToggle={updateToggle}></Navbar>
          <AdminDashboard />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={updateToggle}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <button
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
                className="btn btn-ghost"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => {}} className="btn btn-ghost">
                Customers
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/admin/staff");
                }}
                className="btn btn-ghost"
              >
                Staff
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/admin/orders");
                }}
                className="btn btn-ghost"
              >
                Orders
              </button>
            </li>
            <li>
            <button
              onClick={() => {
                navigate("/admin/finance");
              }}
              className="btn btn-ghost"
            >
              Finances
            </button>
            </li>
          </ul>
        </div>
      </div>
    );
  
};
