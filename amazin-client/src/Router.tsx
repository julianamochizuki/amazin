import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import Register from './pages/register';
import Sell from './pages/seller';
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
  const token = Cookies.get('token') || null;

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
      {token && (
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} total={total} />}
        />
      )}
      {token && (
        <Route
          path="/orders"
          element={
            <Orders
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
            />
          }
        />
      )}
      {token && (
        <Route
          path="/write-a-review"
          element={<NewReview currentProduct={currentProduct} />}
        />
      )}
      {token && <Route path="/add-a-review/thank-you" element={<ThankYou />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />

      {/* 
      
      
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/productlist" element={<ProductList />} /> */}
    </Routes>
  );
};

export default Router;
