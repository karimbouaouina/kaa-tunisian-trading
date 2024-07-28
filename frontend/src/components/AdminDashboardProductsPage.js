import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import './ConfirmDeleteDialogBox.module.css'; // Import custom CSS

const AdminDashboardProductsPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?page=${currentPage}&limit=10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching products', err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product', err);
      toast.error('Failed to delete product');
    }
  };

  const confirmDelete = (productId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg p-6 text-center shadow-md w-full max-w-xs mx-auto">
            <h1 className="text-xl font-bold mb-4">Confirm to delete</h1>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  handleDelete(productId);
                  onClose();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        );
      }
    });
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
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium bg-white text-yellow-500 rounded-md">
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
        <ToastContainer />
        <header className="flex items-center justify-between h-20 bg-white shadow-md px-6">
          <div className="flex items-center">
            <button className="text-gray-600 focus:outline-none lg:hidden">
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 ml-4">Manage Products</h1>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Products List</h2>
            <div className="flex space-x-4">
              <a href="/admin-dashboard/add-product">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75">
                  <i className="fas fa-plus mr-2"></i> Add New Product
                </button>
              </a>
              <a href="/admin-dashboard/add-category">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:opacity-75">
                  <i className="fas fa-plus mr-2"></i> Add New Category
                </button>
              </a>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Product ID</th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                  <th className="px-8 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">{product._id}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">{product.category?.name || 'N/A'}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">TND {product.price.toFixed(2)}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">{product.stock}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-800">
                        <a href={`/admin-dashboard/edit-product/${product._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <i className="fas fa-edit"></i> Edit
                          </button>
                        </a>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => confirmDelete(product._id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-6 text-center text-sm text-gray-800">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mx-1 hover:bg-gray-400"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md mx-1 ${
                  index + 1 === currentPage ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mx-1 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardProductsPage;
