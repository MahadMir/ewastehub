import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link, useNavigate} from "react-router-dom";
import * as PropTypes from "prop-types";
import {OrderTable} from "../ordertable/ordertable";

export const CustomerDashboard = () => {
    var state = "pending"
    var stateTwo = "completed"
    const navigate = useNavigate();

    return (
        <div className= "p-4">
            <CustomerNavbar/>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Stat Box 1 */}
                        <div className="p-4 border rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
                            <p className="text-gray-600">1000</p>
                        </div>

                        {/* Stat Box 2 */}
                        <div className="p-4 border rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
                            <p className="text-gray-600">500</p>
                        </div>

                        {/* Stat Box 3 */}
                        <div className="p-4 border rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                            <p className="text-gray-600">$10,000</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            <div>
                <div className="flex flex-row">
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs ">
                            <option disabled selected>Sort By</option>
                            <option>Date Added</option>
                            <option>Price (Ascending)</option>
                            <option>Price (Descending)</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Device Type</option>
                            <option>Tablet</option>
                            <option>Laptop</option>
                            <option>Smartphone</option>
                            <option>Smartwatch</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <select className="select select-bordered max-w-xs basis-1/3">
                            <option disabled selected>Category</option>
                            <option>Current</option>
                            <option>Rare</option>
                            <option>Recyclable</option>
                            <option>Unknown</option>
                        </select>
                    </div>
                    <div className="basis-1/3">
                        <button className="btn btn-outline btn-primary" onClick={() => {
                            navigate("/customer/placeorder")
                        }}>Place Order
                        </button>

                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div>
                <OrderTable stateTwo={stateTwo} onClick={() => document.getElementById('my_modal_3').showModal()}
                            onClick1={() => {
                                navigate("/customer/editorder")
                            }}/>
            </div>
        </div>
    )
}
