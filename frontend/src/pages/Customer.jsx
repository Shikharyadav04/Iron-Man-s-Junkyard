import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customer = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwttoken')}`, // Updated to use jwttoken
                    },
                });

                // Check if the response is successful
                if (response.data.success) {
                    setUserData(response.data.data); // Adjust based on your response structure
                } else {
                    throw new Error(response.data.message || 'Failed to fetch user data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('http://localhost:8000/api/v1/user/update-account', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwttoken')}`, // Updated to use jwttoken
                },
            });
            alert('Profile updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Customer Dashboard</h2>
                </div>
                <ul className="mt-4">
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Profile</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Requests</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Welcome, Customer!</h1>

                {/* Profile Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Request Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Your Requests</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p>No requests have been made yet.</p>
                        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Request Pickup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
