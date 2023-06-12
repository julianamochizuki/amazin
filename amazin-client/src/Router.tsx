import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from './app/store';
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
import jwt_decode from 'jwt-decode';
import { resetCurrentUser, setCurrentUser } from './app/userReducer';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';

type Props = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
  total: number;
  tokenChanged: boolean;
  setTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const Router = (props: Props) => {
  const { cart, setCart, total, tokenChanged, setTokenChanged } = props;
  const cookieToken = Cookies.get('token') || null;
  const [token, setToken] = useState(cookieToken);
  const dispatch = useDispatch();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;

  const isValidUser =
    currentProduct.orderItems?.some(
      (orderItem) => orderItem.Order.userId === userId
    ) || currentProduct;

  useEffect(() => {
    const cookieToken = Cookies.get('token') || null;
    setToken(cookieToken);
    if (cookieToken) {
      const decodedToken: {
        name?: string;
        address?: string;
        email?: string;
        isSeller?: boolean;
        id?: number;
      } | null = cookieToken ? jwt_decode(cookieToken) : null;
      const user = {
        name: CryptoJS.AES.encrypt(
          decodedToken?.name!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString(),
        address: CryptoJS.AES.encrypt(
          decodedToken?.address!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString(),
        email: CryptoJS.AES.encrypt(
          decodedToken?.email!,
          process.env.REACT_APP_SECRET_KEY!
        ).toString(),
        isSeller: decodedToken?.isSeller,
        id: decodedToken?.id,
      };
      dispatch(setCurrentUser(user));
    } else {
      dispatch(resetCurrentUser());
    }
  }, [tokenChanged, dispatch]);

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
      {currentProduct.isActive && <Route path="/products/:productId" element={<Product />} />}
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
      {token && isValidUser && (
        <Route
          path="/products/:productId/write-a-review"
          element={<NewReview />}
        />
      )}
      {!token && (
        <Route
          path="/login"
          element={<Login setTokenChanged={setTokenChanged} />}
        />
      )}
      <Route
        path="/seller/login"
        element={<Login setTokenChanged={setTokenChanged} />}
      />
      {!token && (
        <Route
          path="/register"
          element={<Register setTokenChanged={setTokenChanged} />}
        />
      )}
      <Route
        path="/seller/register"
        element={<Register setTokenChanged={setTokenChanged} />}
      />
      <Route path="/sell" element={<Sell />} />
      {token && (
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      )}
      {token && (
        <Route
          path="/profile"
          element={<Profile setTokenChanged={setTokenChanged} />}
        />
      )}
    </Routes>
  );
};

export default Router;
