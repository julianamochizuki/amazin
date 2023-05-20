import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import InventoryList from './InventoryList';

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryUpdated, setInventoryUpdated] = useState(false);
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const sellerId = decodedToken?.id || null;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => console.log(err));
  }, [inventoryUpdated === true]);

  return (
    <>
      <div>Inventory Orders</div>
      <div>Inventory List</div>
      <InventoryList
        inventory={inventory}
        inventoryUpdated={inventoryUpdated}
        setInventoryUpdated={setInventoryUpdated}
      />
    </>
  );
}
