import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { OrderType } from '../../types/types';
import OrderListItem from './OrderListItem';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const url = process.env.REACT_APP_API_SERVER_URL;

  //TODO: get userId from auth
  const userId = 1;

  useEffect(() => {
    axios.get(`${url}/api/users/${userId}/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const orderList = orders.map((o: OrderType) => {
    return <OrderListItem key={o.id} order={o} />;
  });

  return <> {orderList} </>;
}
