import React from 'react';
import { OrderType } from '../../types/types';

type Props = {
  order: OrderType;
};

export default function OrderListItem(props: Props) {
  const { order } = props;
  const today = new Date();
  // considering 3 days for delivery
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const orderDate = new Date(order.createdAt);
  const formattedOrderDate = orderDate.toISOString().slice(0, 10);

  return (
    <>
      {order.orderItems.map((item) => (
        <tr className="orders-table" key={order.id}>
          <td>{order.id}</td>
          <td className="table-row-date">{formattedOrderDate}</td>
          <td>{order.user?.name}</td>
          <td>{order.user?.address}</td>
          <td>Card</td>
          <td>{item.product?.id}</td>
          <td>{item.product?.name}</td>
          <td>{item.product?.price_cents / 100}</td>
          <td>{item.quantity}</td>
          <td>{(item.product?.price_cents * item.quantity) / 100}</td>
          <td>{today > deliveryDate ? 'Delivered' : 'Pending'}</td>
        </tr>
      ))}
    </>
  );
}
