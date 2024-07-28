import React from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  return (
    <header id="site-header" className="site-header">
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center p-2">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt"></i>
              <span>Capitol Trail Suite A492 Newark DE</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone-alt"></i>
              <span>+1 929 999 5791</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-envelope"></i>
              <span>welcome@codemotion.us</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a href="#" className="text-3xl font-bold text-blue-600">codemotion</a>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-700">Services</a>
            <a href="#" className="hover:text-gray-700">Results</a>
            <a href="#" className="hover:text-gray-700">Case Studies</a>
            <a href="#" className="hover:text-gray-700">Testimonials</a>
            <a href="#" className="hover:text-gray-700">Team</a>
          </div>
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
