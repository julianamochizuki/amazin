import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Product from './pages/product';
import Products from './pages/products';
import { CategoryType, ProductType } from './types/types';

type Props = {
  currentCategory: CategoryType;
  currentProduct: ProductType;
  setCurrentProduct: any;
};

const Router = (props: Props) => {
  const { currentCategory, currentProduct, setCurrentProduct } = props;

  return (
    <Routes>
      <Route path="*" element={<Navigate to={'/'} />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/products"
        element={
          <Products
            {...props}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            currentCategory={currentCategory}
          />
        }
      />
      <Route
        path="/products/:cardId"
        element={
          <Product
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* <Route path="/orders" element={<Orders />} />


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/productlist" element={<ProductList />} /> */}
    </Routes>
  );
};

export default Router;
