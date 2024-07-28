import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmOrderPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.post('/api/orders');
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, []);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Confirm Your Order</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Shipping Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600"><span className="font-semibold">Name:</span> {order.user.name}</p>
              <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.user.address}</p>
              <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.user.phone}</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600"><span className="font-semibold">Card:</span> **** **** **** 1234</p>
              <p className="text-gray-600"><span className="font-semibold">Expiration:</span> 12/24</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">$20.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${(order.totalAmount * 0.09).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="text-gray-800 font-bold">Total</span>
                <span className="text-gray-800 font-bold">${(order.totalAmount + 20 + order.totalAmount * 0.09).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-yellow-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out text-lg">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;