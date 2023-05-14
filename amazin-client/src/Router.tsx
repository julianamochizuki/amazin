import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Product from './pages/product';
import Products from './pages/products';

type Props = {
  currentCategory: {
    id: number;
    name: string;
    products: any[];
  };
  currentProduct: {
    id: number;
    name: string;
    image: string;
    price_cents: number;
    reviews: any[];
  };
  setCurrentProduct: any;
};

const Router = (props: Props) => {
  const { currentCategory, currentProduct, setCurrentProduct } = props;

  return (
    <Routes>
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
        path={`/products/${currentProduct.id}`}
        element={<Product currentProduct={currentProduct} />}
      />
      {/* <Route path="/orders" element={<Orders />} />

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
