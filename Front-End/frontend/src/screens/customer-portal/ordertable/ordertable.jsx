import * as PropTypes from "prop-types";
import Navbar from "../../../components/navbar";
import CustomerNavbar from "../../../components/customerNavbar";
import {Link, useNavigate} from "react-router-dom";
import { useHistory } from 'react-router-dom';


function OrderModal(props) {
    const navigate = useNavigate()

    function redirectToWebuy(searchString) {
        // Encode the search string to make it URL-safe
        const encodedSearchString = encodeURIComponent(searchString);

        // Construct the final URL with the encoded search string as a query parameter
        const finalURL = `https://uk.webuy.com/search?stext=${encodedSearchString}`;

        // Redirect the user to the final URL
        window.open(finalURL, '_blank');
    }



    return <th>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-ghost" onClick={() => document.getElementById(`${props.orderItem.order_id}`).showModal()}>Details</button>
        <dialog id= {props.orderItem.order_id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                </form>
                <div className="bg-base-100 shadow-xl">
                    <figure>
                        <div>
                            <img
                                src={props.orderItem['photos'].length > 0 ? props.orderItem['photos'][0] : "https://placehold.co/600x400"}
                                alt=""></img>
                        </div>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.orderItem.device_name}
                            <div className="badge badge-warning">{props.orderItem.status}</div>
                        </h2>
                        <p>Device Type: {props.orderItem.device_type}</p>
                        <p>Category: {props.orderItem.classification}</p>
                        <p>Date of Order: {props.orderItem.date}</p>
                        <p>Price: {props.orderItem.price}</p>
                        <p>Additional Service: {props.orderItem.service_name}</p>

                        <div className="card-actions justify-end">
                            <button onClick={() => {
                                navigate('/customer/editorder', {state: props.orderItem});
                            }} className="btn btn-outline">Edit Device
                                Details
                            </button>
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={() => {
                                redirectToWebuy(props.orderItem.device_name)
                            }} className="btn btn-outline">3rd Party Listing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </th>;
}

OrderModal.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

function TableItem(props) {
    return <tr>
        <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img
                            src={props.order['photos'].length > 0 ? props.order['photos'][0] : "https://placehold.co/600x400"}
                            alt=""></img>
                    </div>
                </div>
                <div>
                    <div className="font-bold">{props.order.device_name}</div>
                    <div className="text-sm opacity-50">Device Type: {props.order.device_type}</div>
                    <div className="badge badge-ghost badge-sm">Category: {props.order.classification}</div>
                </div>
            </div>
        </td>
        <td>
            Order ID: {props.order.order_id}
            <br/>
            <span className="badge badge-ghost badge-sm">Date: {props.order.date}</span>
        </td>
        {/*<td>Pending</td>*/}
        {props.order.status === "Pending"
            ? <td className="badge badge-warning badge-outline">{props.order.status}</td>
            : <td className="badge badge-success badge-outline">{props.order.status}</td>}
        <td>
            <strong>£ {props.order.price}</strong>
            <br/>

        </td>
        <OrderModal orderItem={props.order} onClick={props.onClick} onClick1={props.onClick1}/>
    </tr>;

}

TableItem.propTypes = {
    stateTwo: PropTypes.string,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

export function OrderTable(props) {
    return <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Device Details</th>
                <th>Order Details</th>
                <th>Current Status</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {props.tableData
                .sort((a, b) => {
                    // Default sort by date added
                    if (props.sortChoice === 'Price Ascending') {
                        return a.price - b.price; // Sort by price ascending
                    } else if (props.sortChoice === 'Price Descending') {
                        return b.price - a.price; // Sort by price descending
                    } else {
                        // Sort by date added
                        return new Date(a.date) - new Date(b.date);
                    }
                })
                .map(order => (
                    <TableItem
                        sortChoice={props.sortChoice}
                        categoryChoice={props.categoryChoice}
                        deviceTypeChoice={props.deviceTypeChoice}
                        stateTwo={props.stateTwo}
                        order={order}
                        onClick={props.onClick}
                        onClick1={props.onClick1}
                    />
                ))
            }



            </tbody>


        </table>
    </div>;
}

OrderTable.propTypes = {
    stateTwo: PropTypes.string,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};