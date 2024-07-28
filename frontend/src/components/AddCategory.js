import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [image, setImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      errors.name = 'Category name is required';
      formIsValid = false;
    }
    if (!image) {
      errors.image = 'Category image is required';
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
    data.append('image', image);

    try {
      await axios.post('/api/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Category added successfully');
      setFormData({
        name: '',
      });
      setImage(null);
    } catch (err) {
      alert('Error adding category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add a Category
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Category Name"
              name="name"
              value={formData.name}
              handleChange={handleChange}
              errorMessage={errorMessages.name}
            />
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Category Image
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
                {isSubmitting ? 'Submitting...' : 'Add Category'}
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

export default AddCategory;
