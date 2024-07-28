import React from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-400">TechParts is a leading provider of high-quality electronic and mechanical parts. We are committed to delivering the best products and services to our customers.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-500">Home</a></li>
                <li><a href="#" className="hover:text-yellow-500">Shop</a></li>
                <li><a href="#" className="hover:text-yellow-500">About</a></li>
                <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">123 Tech Street, Tech City, TX 12345</p>
              <p className="text-gray-400 mb-2">Email: support@techparts.com</p>
              <p className="text-gray-400 mb-2">Phone: +1 234 567 890</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-gray-400">&copy; 2023 TechParts. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
    </footer>
      );
    };
    
export default Footer;