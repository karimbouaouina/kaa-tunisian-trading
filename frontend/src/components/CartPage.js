import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(7.0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    calculateSubtotal(cartItems);
  }, []);

  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        item.quantity = Math.max(1, item.quantity + amount);
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:space-x-6">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-5">Shopping Cart</h2>
          {cart.map(item => (
            <div key={item._id} className="bg-white shadow rounded-lg mb-6 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={`/uploads/products/${item.image}`} alt={item.name} className="h-16 w-16 rounded mr-4" />
                <div>
                  <h5 className="text-lg font-medium">{item.name}</h5>
                  <p className="text-sm text-gray-700">TND {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item._id, -1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <i className="fas fa-minus"></i>
                </button>
                <span className="text-gray-700 mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div>
                <span className="text-gray-900 font-medium">TND {(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button onClick={() => removeItem(item._id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="md:w-1/3 bg-white shadow rounded-lg p-6 sticky top-8">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">TND {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">TND {shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-900 font-medium">Total</span>
              <span className="text-gray-900 font-medium">TND {(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>
          <button onClick={proceedToCheckout} className="mt-6 bg-yellow-500 text-white w-full py-2 rounded hover:bg-yellow-600 transition-colors duration-200">Proceed to Checkout</button>
        </div>
      </div>
    </div>
    </div>

  );
};

export default CartPage;