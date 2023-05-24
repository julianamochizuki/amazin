import Cookies from 'js-cookie';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartReview from './components/Cart';
import ThankYou from './components/NewReview/ThankYou';
import Orders from './components/Orders';
import SellerDashboard from './components/Seller/SellerDashboard';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Login from './pages/login';
import NewReview from './pages/new-review';
import Product from './pages/product';
import Products from './pages/products';
import Profile from './pages/profile';
import Register from './pages/register';
import Sell from './pages/seller';

const Router = () => {
  const token = Cookies.get('token') || null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route
        path="/categories/:categoryId/products"
        element={<Products {...props} />}
      /> */}
      <Route
        path="/products/search/:searchTerm/:rating/:minPrice/:maxPrice"
        element={<Products />}
      />
      <Route
        path="/categories/:categoryId/products/:rating/:minPrice/:maxPrice"
        element={<Products />}
      />
      <Route path="/products/:productId" element={<Product />} />
      <Route path="/cart" element={<CartReview />} />
      {token && <Route path="/checkout" element={<Checkout />} />}
      {token && <Route path="/orders" element={<Orders />} />}
      {token && <Route path="/write-a-review" element={<NewReview />} />}
      {token && <Route path="/add-a-review/thank-you" element={<ThankYou />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sell" element={<Sell />} />
      {token && (
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      )}
      {token && <Route path="/profile" element={<Profile />} />}
      {/* <Route path="*" element={<Navigate to={'/'} />} /> */}
    </Routes>
  );
};

export default Router;
