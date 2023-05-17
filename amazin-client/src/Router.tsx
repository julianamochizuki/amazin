import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartReview from './components/Cart';
import Orders from './components/Orders';
import Checkout from './pages/checkout';
import Home from './pages/home';
import NewReview from './pages/new-review';
import Product from './pages/product';
import Products from './pages/products';
import { CartType, CategoryType, ProductType } from './types/types';

type Props = {
  currentCategory: CategoryType;
  currentProduct: ProductType;
  setCurrentProduct: any;
  cart: CartType;
  setCart: any;
  total: number;
};

const Router = (props: Props) => {
  const {
    currentCategory,
    currentProduct,
    setCurrentProduct,
    cart,
    setCart,
    total,
  } = props;

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
        path="/products/:productId"
        element={
          <Product
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        }
      />
      <Route
        path="/cart"
        element={<CartReview cart={cart} setCart={setCart} total={total} />}
      />
      <Route
        path="/checkout"
        element={<Checkout cart={cart} setCart={setCart} total={total} />}
      />
      <Route
        path="/orders"
        element={
          <Orders
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
        }
      />
      <Route
        path="/write-a-review"
        element={<NewReview currentProduct={currentProduct} />}
      />

      {/* 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/productlist" element={<ProductList />} /> */}
    </Routes>
  );
};

export default Router;
