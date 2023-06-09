import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { OrderType } from '../../types/types';
import OrderListItem from './OrderListItem';
import '../../styles/orders.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = currentUser.id;

  useEffect(() => {
    axios
      .get(`/api/users/${userId}/orders`, {
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
      <h4 className="orders-page-heading">Your Orders</h4>
      {orders.length === 0 ? (
        <div className="no-orders">
          <h5>No orders found</h5>
          <p>
            Start shopping by <Link to="/">exploring our products</Link>.
          </p>
        </div>
      ) : (
        <>{orderList}</>
      )}
    </>
  );
}
