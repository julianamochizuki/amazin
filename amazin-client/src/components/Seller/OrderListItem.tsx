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

  return (
    <>
      {order.orderItems.map((item) => (
        <tr>
          <td>{order.id}</td>
          <td>{order.createdAt}</td>
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
