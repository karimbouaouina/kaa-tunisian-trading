import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product', err);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get('/api/products?limit=4'); 
        setRelatedProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === product._id);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
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
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img src={`/uploads/products/${product.image}`} alt={product.name} className="w-full h-96 object-cover md:w-96" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category?.name || 'Category'}</div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{product.name}</h2>
              <p className="mt-2 text-gray-500">{product.description}</p>
              <div className="mt-4 mb-6">
                <span className="text-yellow-600 font-semibold text-xl">TND {product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center mb-4">
                <button
                  className="bg-gray-200 text-gray-700 rounded-l py-2 px-4 hover:bg-gray-300 transition-colors duration-200"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-t border-b border-gray-300 py-2"
                />
                <button
                  className="bg-gray-200 text-gray-700 rounded-r py-2 px-4 hover:bg-gray-300 transition-colors duration-200"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                className="bg-yellow-500 text-white rounded py-2 px-4 hover:bg-yellow-600 transition-colors duration-200"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-10 mb-4">Other Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <img src={`/uploads/products/${relatedProduct.image}`} alt={relatedProduct.name} className="mb-3" />
              <h5 className="text-lg font-semibold mb-2">{relatedProduct.name}</h5>
              <span className="text-yellow-600 font-semibold">TND {relatedProduct.price.toFixed(2)}</span>
              <button
                className="mt-4 bg-yellow-500 text-white rounded py-2 px-4 hover:bg-yellow-600 transition-colors duration-200"
                onClick={() => navigate(`/browse/${relatedProduct._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;