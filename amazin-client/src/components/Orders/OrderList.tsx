import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { OrderType, ProductType } from '../../types/types';
import OrderListItem from './OrderListItem';
import jwt_decode from 'jwt-decode';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

export default function OrderList(props: Props) {
  const [orders, setOrders] = useState([]);
  const { setCurrentProduct } = props;
  const url = process.env.REACT_APP_API_SERVER_URL;
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const userId = decodedToken?.id || null;

  useEffect(() => {
    axios
      .get(`${url}/api/users/${userId}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const orderList = orders.map((o: OrderType) => {
    return (
      <OrderListItem
        key={o.id}
        order={o}
        setCurrentProduct={setCurrentProduct}
      />
    );
  });

  return <> {orderList} </>;
}