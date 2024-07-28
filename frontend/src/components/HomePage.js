import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
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
    <div className="bg-gray-200 text-gray-900">
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
            <a href="#" className="text-3xl font-bold text-blue-600">Kaa</a>
            <div className="flex items-center space-x-8 font-space-grotesk">
              <a href="#" className="hover:text-yellow-500">Partners</a>
              <a href="#" className="hover:text-yellow-500">Customers</a>
              <a href="#" className="hover:text-yellow-500">About us</a>
            </div>
            <a href="#" onClick={handleRedirect} className="bg-yellow-500 text-white px-6 py-2 rounded-full border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 transition duration-300">
            {isAuthenticated ? 'Logout' : 'Login'}
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-white text-gray-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Kaa Trading</h1>
          <p className="text-lg mb-8">Your trusted partner for tunisian goodies</p>
          <a href="/browse" className="bg-yellow-500 text-white px-6 py-4 rounded-full border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 transition duration-300">Shop Now</a>
        </div>
      </section>

      <section className="py-16 bg-customGrayBlue">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="categories/patisserie-tunisienne.jpg" alt="Electronic Components" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Tunisian Pastries</h3>
                <p className="text-gray-600">From handmade sweets to crunchy cookies and delightful pastries, the Tunisian sweet scene is a testament to the country's culinary diversity and creativity.</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="categories/epices-tunisiennes.jpg" alt="Mechanical Parts" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Tunisian Spices</h3>
                <p className="text-gray-600">It is a perfect opportunity to fill up your spice cupboard: there is plenty of spices to choose from and prices are very reasonable.</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="categories/huiles.png" alt="Tools & Accessories" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Oil</h3>
                <p className="text-gray-600">Tunisian olive oil is something we are passionate about and we think the rest of the world should have the opportunity to taste the native varieties</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="categories/fruit-de-mer.jpg" alt="Kits & Modules" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Seafood </h3>
                <p className="text-gray-600">The Tunisian waters host about 350 marine and inland fish species</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-customGrayBlue py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="featured-products/mignardise-noisette.webp" alt="Featured Product 1" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Mignardise Noisette 500g</h3>
                <p className="text-gray-600">TND 73.00</p>
                <a href="/browse/667eeb549141a8d90196d4b8" className="text-yellow-500 font-semibold">View Details</a>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="featured-products/piment-rouge.jpg" alt="Featured Product 2" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Red Pepper 1kg</h3>
                <p className="text-gray-600">TND 19.50</p>
                <a href="/browse/667eedca9141a8d90196d51b" className="text-yellow-500 font-semibold">View Details</a>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="featured-products/harissa.webp" alt="Featured Product 3" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Harissa Paste</h3>
                <p className="text-gray-600">TND 6.90</p>
                <a href="#" className="text-yellow-500 font-semibold">View Details</a>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="featured-products/smile.png" alt="Featured Product 4" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">SMILE (chocolate&milk)</h3>
                <p className="text-gray-600">TND 2.90</p>
                <a href="#" className="text-yellow-500 font-semibold">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-customGrayBlue py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="overflow-hidden">
            <div className="scrolling-logos">
              <img src="partners/spipa.png" alt="Partner 1" className="mx-4" />
              <img src="partners/nejma.png" alt="Partner 2" className="mx-4" />
              <img src="partners/vitalia.png" alt="Partner 3" className="mx-4" />
              <img src="partners/saida.png" alt="Partner 4" className="mx-4" />
              <img src="partners/jouda.png" alt="Partner 6" className="mx-4" />
              <img src="partners/vitalia.png" alt="Partner 8" className="mx-4" />
              <img src="partners/nejma.png" alt="Partner 9" className="mx-4" />
              <img src="partners/saida.png" alt="Partner 10" className="mx-4" />
              <img src="partners/spipa.png" alt="Partner 11" className="mx-4" />
              <img src="partners/jouda.png" alt="Partner 12" className="mx-4" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-customGrayBlue">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <p className="text-gray-600 mb-4">"Great selection of products and fast delivery. Highly recommend!"</p>
              <div className="flex items-center">
                <img src="customers-reviews/kb-pfp.jpg" alt="Customer 1" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h4 className="text-lg font-semibold">Karim Bouaouina</h4>
                  <p className="text-gray-500">Sousse</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <p className="text-gray-600 mb-4">"Excellent customer service and quality products. Will shop again."</p>
              <div className="flex items-center">
                <img src="customers-reviews/mm-pfp.jpg" alt="Customer 2" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h4 className="text-lg font-semibold">Meriam Mghaieth</h4>
                  <p className="text-gray-500">Gabes</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <p className="text-gray-600 mb-4">"High-quality and fresh products. Very satisfied with my purchase."</p>
              <div className="flex items-center">
                <img src="customers-reviews/myb-pfp.jpg" alt="Customer 3" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h4 className="text-lg font-semibold">Mohamed Yassine Baananou</h4>
                  <p className="text-gray-500">Ariana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-yellow-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-gray-600 text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-600">Empowering Tunisia's economy through global trade and cultural exchange.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-gray-600">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-white">Shop</a></li>
                <li><a href="#" className="text-gray-600 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-gray-600">Contact Us</h4>
              <p className="text-gray-600 mb-2">Sousse, TN</p>
              <p className="text-gray-600 mb-2">Email: support@Kaa.com</p>
              <p className="text-gray-600 mb-2">Phone: +216 24661317</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-gray-600">&copy; 2024 Kaa. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-600 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-600 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-600 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        .scrolling-logos {
          display: flex;
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
