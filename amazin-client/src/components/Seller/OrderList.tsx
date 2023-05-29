import React from 'react';
import { Table } from 'react-bootstrap';
import { SellerOrdersType } from '../../types/types';
import OrderListItem from './OrderListItem';

type Props = {
  orders: SellerOrdersType;
};

export default function OrderList(props: Props) {
  const { orders } = props;

  const ordersList = orders?.map((order: any) => {
    return <OrderListItem key={order.id} order={order} />;
  });

  return (
    <Table striped bordered hover className='orders-table'>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Customer</th>
          <th>Shipping Address</th>
          <th>Payment Method</th>
          <th>Product SKU</th>
          <th>Product Name</th>
          <th>Product Price ($)</th>
          <th>Quantity</th>
          <th>Order Total ($)</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>{ordersList}</tbody>
    </Table>
  );
}
