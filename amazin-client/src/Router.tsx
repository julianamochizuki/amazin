import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';

type Props = {
  currentCategory: {
    id: number;
    name: string;
    products: any[];
  };
};

const Router = (props: Props) => {
  const { currentCategory } = props;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products"
        element={<Products {...props} currentCategory={currentCategory} />}
      />
      {/* <Route path="/orders" element={<Orders />} />
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
