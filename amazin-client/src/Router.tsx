import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ThankYou from './components/NewReview/ThankYou';
import SellerDashboard from './components/Seller/SellerDashboard';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Login from './pages/login';
import NewReview from './pages/new-review';
import Orders from './pages/orders';
import Product from './pages/product';
import Products from './pages/products';
import Profile from './pages/profile';
import Register from './pages/register';
import Sell from './pages/seller';
import { CartType } from './types/types';

type Props = {
  cart: CartType;
  setCart: any;
  total: number;
};

const Router = (props: Props) => {
  const { cart, setCart, total } = props;
  const token = Cookies.get('token') || null;

  return (
    <Routes>
      <Route path="*" element={<Navigate to={'/'} />} />
      <Route path="/" element={<Home />} />
      <Route path="/products/search/:searchTerm" element={<Products />} />
      <Route
        path="/departments/:departmentId/products"
        element={<Products />}
      />
      <Route path="/categories/:categoryId/products" element={<Products />} />
      <Route path="/deals" element={<Products />} />
      <Route path="/bestsellers" element={<Products />} />
      <Route path="/products/:productId" element={<Product />} />
      <Route
        path="/cart"
        element={<Cart cart={cart} setCart={setCart} total={total} />}
      />
      {token && (
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} total={total} />}
        />
      )}
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
    </Routes>
  );
};

export default Router;
