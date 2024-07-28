import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';

const BrowseProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?page=${currentPage}&limit=8`);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchProducts();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRedirect = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header id="site-header" className="site-header">
        <div className="bg-yellow-500 text-white">
          <div className="container mx-auto flex justify-between items-center p-2">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt"></i>
                <span>Sousse, TN</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone-alt"></i>
                <span>+216 24661317</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope"></i>
                <span>support@Kaa.com</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center py-4 px-8">
            <a href="/" className="text-3xl font-bold text-blue-600">Kaa</a>
            <a href="#" onClick={handleRedirect} className="bg-yellow-500 text-white px-6 py-2 rounded-full border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 transition duration-300">
            {isAuthenticated ? 'Logout' : 'Login'}
            </a>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 ease-in-out">
                <img src={`/uploads/products/${product.image}`} alt={product.name} className="mb-3" />
                <h5 className="text-lg font-semibold mb-2">{product.name}</h5>
                <p className="text-gray-500 mb-4">{product.description}</p>
                <span className="text-yellow-600 font-semibold">TND {product.price.toFixed(2)}</span>
                <a href={`/browse/${product._id}`}><button className="mt-4 bg-yellow-500 text-white rounded py-2 px-4 hover:bg-yellow-600 transition-colors duration-200">View Details</button></a>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <div className="flex justify-center items-center space-x-1 mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${index + 1 === currentPage ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'} hover:bg-yellow-600 transition-colors duration-200`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseProductsPage;
