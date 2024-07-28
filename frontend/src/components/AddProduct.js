import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessages((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
      formIsValid = false;
    }
    if (!formData.description.trim()) {
      errors.description = 'Product description is required';
      formIsValid = false;
    }
    if (!formData.price || isNaN(formData.price)) {
      errors.price = 'Valid price is required';
      formIsValid = false;
    }
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
      formIsValid = false;
    }
    if (!formData.stock || isNaN(formData.stock)) {
      errors.stock = 'Valid stock quantity is required';
      formIsValid = false;
    }
    if (!image) {
      errors.image = 'Product image is required';
      formIsValid = false;
    }

    setErrorMessages(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      await axios.post('/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Product added successfully');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
      });
      setImage(null);
    } catch (err) {
      alert('Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add a Product
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Product Name"
              name="name"
              value={formData.name}
              handleChange={handleChange}
              errorMessage={errorMessages.name}
            />
            <InputField
              label="Product Description"
              name="description"
              value={formData.description}
              handleChange={handleChange}
              errorMessage={errorMessages.description}
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              handleChange={handleChange}
              errorMessage={errorMessages.price}
            />
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errorMessages.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errorMessages.category && (
                  <p className="mt-2 text-sm text-red-600">{errorMessages.category}</p>
                )}
              </div>
            </div>
            <InputField
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              handleChange={handleChange}
              errorMessage={errorMessages.stock}
            />
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`appearance-none block w-full px-3 py-2 border ${errorMessages.image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errorMessages.image && (
                  <p className="mt-2 text-sm text-red-600">{errorMessages.image}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Submitting...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = 'text', placeholder, value, handleChange, errorMessage }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        type={type}
        className={`appearance-none block w-full px-3 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder={placeholder || label}
        value={value}
        onChange={handleChange}
      />
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  </div>
);

export default AddProduct;
