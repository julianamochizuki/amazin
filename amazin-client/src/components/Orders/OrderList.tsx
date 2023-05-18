import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { OrderType, ProductType } from '../../types/types';
import OrderListItem from './OrderListItem';

type Props = {
  currentProduct: ProductType;
  setCurrentProduct: any;
};

export default function OrderList(props: Props) {
  const [orders, setOrders] = useState([]);
  const { setCurrentProduct } = props;
  const url = process.env.REACT_APP_API_SERVER_URL;
  const userId = Cookies.get('userId');

  useEffect(() => {
    axios.get(`${url}/api/users/${userId}/orders`).then((res) => {
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
