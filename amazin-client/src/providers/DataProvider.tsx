import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

type State = {
  loading: boolean;
  departments: any[];
  products: any[];
  product: any;
  reviews: any[];
  averageRating: number;
  orders: any[];
  cart: {};
  lineItems: any[];
};

type Props = {
  children: React.ReactNode;
};

export const DataContext = createContext({} as State);

const DataProvider = (props: Props) => {
  const [state, setState] = useState({
    loading: true,
    departments: [],
    products: [],
    product: {},
    reviews: [],
    averageRating: 0,
    orders: [],
    cart: {},
    lineItems: [],
  });

  useEffect(() => {
    axios.get(`/api/departments`).then((res) => {
      setState((prev) => ({
        ...prev,
        loading: false,
        departments: res.data,
      }));
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `/api/departments/${department_id}/categories/${category_id}/products`
  //     )
  //     .then((res) => {
  //       setState((prev) => ({
  //         ...prev,
  //         loading: false,
  //         products: res.data,
  //       }));
  //     });
  // }, [category_id]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `/api/departments/${department_id}/categories/${category_id}.products/${product_id}`
  //     )
  //     .then((res) => {
  //       setState((prev) => ({
  //         ...prev,
  //         loading: false,
  //         product: res.data,
  //         reviews: res.data.reviews,
  //         averageRating: (() => {
  //           const sum = res.data.reviews.reduce(
  //             (acc: number, { rating }: { rating: number }) => acc + rating,
  //             0
  //           );
  //           return sum / res.data.reviews.length;
  //         })(),
  //       }));
  //     });
  // }, [product_id]);

  // useEffect(() => {
  //   axios.get(`/api/users/${user_id}/orders}`).then((res) => {
  //     setState((prev) => ({
  //       ...prev,
  //       loading: false,
  //       orders: res.data,
  //     }));
  //   });
  // }, [user_id]);

  // useEffect(() => {
  //   axios.get(`/api/users/${user_id}/cart`).then((res) => {
  //     setState((prev) => ({
  //       ...prev,
  //       loading: false,
  //       cart: res.data,
  //       lineItems: res.data.line_items,
  //     }));
  //   });
  // }, [user_id]);

  const value = { ...state };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
