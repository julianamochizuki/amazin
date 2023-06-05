import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { OrderType } from '../../types/types';
import OrderListItem from './OrderListItem';
import '../../styles/orders.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER_URL}/api/users/${userId}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, [userId, token]);

  const orderList = orders.map((o: OrderType) => {
    return <OrderListItem key={o.id} order={o} />;
  });

  return (
    <>
      <h4 className='orders-page-heading'>Your Orders</h4>
      {orderList}
    </>
  );
}
