import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboardAnalyticsPage = () => {
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out');
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
        <a href="#" className="flex items-center px-4 py-2 text-lg font-medium bg-white text-yellow-500 rounded-md">
          <i className="fas fa-chart-line mr-3"></i> Analytics
        </a>
        <a href="/admin-dashboard/settings" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
          <i className="fas fa-cogs mr-3"></i> Settings
        </a>
        <Link onClick={handleLogout} to="/login" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-white hover:text-yellow-500">
            <i className="fas fa-sign-out mr-3"></i> Logout
        </Link>
      </nav>
    </div>

    <div className="flex-1 flex flex-col">
      <header className="flex items-center justify-between h-20 bg-white shadow-md px-6">
        <div className="flex items-center">
          <button className="text-gray-600 focus:outline-none lg:hidden">
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 ml-4">Analytics</h1>
        </div>
        
      </header>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
        </div>
      </main>
    </div>
  </div>
);
};

export default AdminDashboardAnalyticsPage;
