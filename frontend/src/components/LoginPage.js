import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrorMessages(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!form.email) {
      setErrorMessages(prev => ({ ...prev, email: 'Email is required' }));
      setIsSubmitting(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMessages(prev => ({ ...prev, email: 'Email is invalid' }));
      setIsSubmitting(false);
      return;
    }

    if (!form.password) {
      setErrorMessages(prev => ({ ...prev, password: 'Password is required' }));
      setIsSubmitting(false);
      return;
    }

    axios.post('/api/auth/login', form)
      .then(res => {
        const { token, isAdmin } = res.data;
        localStorage.setItem('token', token);
        navigate(isAdmin ? '/admin-dashboard' : '/browse');
      })
      .catch(err => {
        setErrorMessages({ email: 'Invalid email or password', password: 'Invalid email or password' });
        setIsSubmitting(false);
      });
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          or <a href="/register" className="font-medium text-yellow-500 hover:opacity-75">Create an account</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errorMessages.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                  onChange={handleChange}
                />
                {errorMessages.email && <p className="mt-2 text-sm text-red-600">{errorMessages.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errorMessages.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Your password"
                  onChange={handleChange}
                />
                {errorMessages.password && <p className="mt-2 text-sm text-red-600">{errorMessages.password}</p>}
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign in with Facebook</span>
                  <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 text-yellow-500 mr-2" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign in with Google</span>
                  <FontAwesomeIcon icon={faGoogle} className="h-6 w-6 text-yellow-500 mr-2" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign in with Twitter</span>
                  <FontAwesomeIcon icon={faTwitter} className="h-6 w-6 text-yellow-500 mr-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
