import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link} from "react-router-dom";


export const CustomerDashboard = () => {
    var state = "pending"
    var stateTwo = "completed"

    return (
        <div>
            <CustomerNavbar/>
            <div>

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
                        <Link className="btn btn-outline btn-primary" to="./placeorder">Place Order</Link>

                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Device Details</th>
                            <th>Order Details</th>
                            <th>Current Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png"
                                                 alt="Avatar Tailwind CSS Component"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Samsung Galaxy s22</div>
                                        <div className="text-sm opacity-50">Device Type: Smartphone</div>
                                        <div className="badge badge-ghost badge-sm">Category: Current</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Order ID: 03214589
                                <br/>
                                <span className="badge badge-ghost badge-sm">Date: 3/03/2024</span>
                            </td>
                            {/*<td>Pending</td>*/}
                            {stateTwo === "pending"
                                ? <td className="badge badge-warning badge-outline">{stateTwo}</td>
                                : <td className="badge badge-success badge-outline">{stateTwo}</td>}
                            <th>
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn btn-ghost" onClick={()=>document.getElementById('my_modal_3').showModal()}>Details</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button
                                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                                            </button>
                                        </form>
                                        <div className="bg-base-100 shadow-xl">
                                            <figure><img
                                                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                                alt="Shoes"/></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    Samsung Galaxy S22
                                                    <div className="badge badge-warning">pending</div>
                                                </h2>
                                                <p>Device Type: Android</p>
                                                <p>Category: Current</p>
                                                <p>Date of Order: 4/3/2024</p>
                                                <p>Price: £1000</p>
                                                <div className="card-actions justify-end">
                                                    <div className="badge badge-outline">Edit Device Details</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </dialog>
                            </th>
                        </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}
