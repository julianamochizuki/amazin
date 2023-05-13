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

  const value = { ...state };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
