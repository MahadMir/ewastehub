import React, { useState } from 'react';
import axios from 'axios';
import StaffNavbar from "../../../../components/staffNavbar";


const AddStaff = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/staff', {
                name,
                email,
                contact
            });

            console.log('Staff member added successfully:', response.data);

            // Clear form fields after successful submission
            setName('');
            setEmail('');
            setContact('');
        } catch (error) {
            console.error('Error adding staff member:', error);
        }
    };

    return (
        <div>
            <StaffNavbar/>
            <br/>
            <div className="max-w-md mx-auto p-8 border rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add Staff Member</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block mb-1">Contact:</label>
                        <input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="form-input w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Staff</button>
                </form>
            </div>
        </div>
    );
};

export default AddStaff;
