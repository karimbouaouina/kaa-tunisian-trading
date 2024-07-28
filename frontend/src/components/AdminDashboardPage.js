import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/5 bg-yellow-500 text-white flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-white">
          <a href="/">
          <i className="fas fa-arrow-left mr-5"></i>
          </a>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium bg-white text-yellow-500 rounded-md">
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
            <h1 className="text-3xl font-bold text-gray-900 ml-4">Dashboard</h1>
          </div>
          
        </header>

        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-box fa-3x text-yellow-500"></i>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-800">Products</h2>
                  <p className="text-gray-600 text-lg">150</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-shopping-cart fa-3x text-yellow-500"></i>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-800">Orders</h2>
                  <p className="text-gray-600 text-lg">45</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-users fa-3x text-yellow-500"></i>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-800">Customers</h2>
                  <p className="text-gray-600 text-lg">120</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-dollar-sign fa-3x text-yellow-500"></i>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-800">Revenue</h2>
                  <p className="text-gray-600 text-lg">$3,200</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Total</th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">#1001</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">John Doe</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">$120.00</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Pending</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">2023-10-01</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">#1002</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Jane Smith</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">$80.00</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Shipped</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">2023-10-02</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">#1003</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Alice Johnson</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">$150.00</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Delivered</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">2023-10-03</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">#1004</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Bob Brown</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">$200.00</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">Cancelled</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">2023-10-04</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
