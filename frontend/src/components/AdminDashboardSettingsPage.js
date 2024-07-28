import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const AdminDashboardSettingsPage = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Logged out');
      };
    
    const [user, setUser] = useState({
        fullname: '',
        phonenumber: '',
        email: '',
        address: ''
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
        try {
            const res = await axios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            setUser(res.data);
        } catch (err) {
            console.error('Error fetching user details', err);
        }
        };

        fetchUserDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
        ...user,
        [name]: value
        });
    };

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        try {
        await axios.put('/api/auth/update-details', user, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        toast.success('User details updated successfully!');
        } catch (err) {
        console.error('Error updating user details', err);
        toast.error('Failed to update user details');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
        await axios.put('/api/auth/update-password', {
            currentPassword,
            newPassword
        }, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        toast.success('Password updated successfully!');
        } catch (err) {
        console.error('Error updating password', err);
        toast.error('Failed to update password');
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
        <div className="w-full lg:w-1/5 bg-yellow-500 text-white flex flex-col">
            <div className="flex items-center justify-center h-20 border-b border-white">
            <a href="/"><i className="fas fa-arrow-left mr-5"></i></a>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-4">
            <a href="/admin-dashboard" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
            </a>
            <a href="/admin-dashboard/products" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-box mr-3"></i> Products
            </a>
            <a href="/admin-dashboard/orders" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-shopping-cart mr-3"></i> Orders
            </a>
            <a href="/admin-dashboard/customers" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-users mr-3"></i> Customers
            </a>
            <a href="/admin-dashboard/analytics" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-chart-line mr-3"></i> Analytics
            </a>
            <a href="/admin-dashboard/settings" className="flex items-center px-4 py-2 text-lg font-medium bg-white text-yellow-500 rounded-md">
                <i className="fas fa-cogs mr-3"></i> Settings
            </a>
            <Link onClick={handleLogout} to="/login" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
                <i className="fas fa-sign-out mr-3"></i> Logout
            </Link>
            </nav>
        </div>

        <div className="flex-1 flex flex-col">
            <ToastContainer />
            <header className="flex items-center justify-between h-20 bg-white shadow-md px-6">
            <div className="flex items-center">
                <button className="text-gray-600 focus:outline-none lg:hidden">
                <i className="fas fa-bars"></i>
                </button>
                <h1 className="text-3xl font-bold text-gray-900 ml-4">Settings</h1>
            </div>
            </header>

            <main className="flex-1 p-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update User Details</h2>
                <form onSubmit={handleUpdateDetails} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                    type="text"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                    type="text"
                    name="phonenumber"
                    value={user.phonenumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                >
                    Update Details
                </button>
                </form>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Password</h2>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                >
                    Update Password
                </button>
                </form>
            </div>
            </main>
        </div>
        </div>
  );
};

export default AdminDashboardSettingsPage;
