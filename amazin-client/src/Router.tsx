import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';


const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/productlist" element={<ProductList />} />
      <Route path="*" element={<Navigate to={"/"} />} /> */}
    </Routes>
  );
};

export default Router;