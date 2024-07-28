import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminDashboardProductsPage from './components/AdminDashboardProductsPage';
import AdminDashboardOrdersPage from './components/AdminDashboardOrdersPage';
import AdminDashboardCustomersPage from './components/AdminDashboardCustomersPage';
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import EditProduct from './components/EditProduct';
import AdminDashboardAnalyticsPage from './components/AdminDashboardAnalyticsPage';
import AdminDashboardSettingsPage from './components/AdminDashboardSettingsPage';
import BrowseProductsPage from './components/BrowseProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import CartPage from './components/CartPage';
import ConfirmOrderPage from './components/ConfirmOrderPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-dashboard/products" element={<AdminDashboardProductsPage />} />
        <Route path="/admin-dashboard/orders" element={<AdminDashboardOrdersPage />} />
        <Route path="/admin-dashboard/customers" element={<AdminDashboardCustomersPage />} />
        <Route path="/admin-dashboard/analytics" element={<AdminDashboardAnalyticsPage />} />
        <Route path="/admin-dashboard/settings" element={<AdminDashboardSettingsPage />} />
        <Route path="/admin-dashboard/add-product" element={<AddProduct />} />
        <Route path="/admin-dashboard/add-category" element={<AddCategory />} />
        <Route path="/admin-dashboard/edit-product/:productId" element={<EditProduct />} />
        <Route path="/browse" element={<BrowseProductsPage />} />
        <Route path="/browse/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/confirm-order" element={<ConfirmOrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
