import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import InventoryList from './InventoryList';
import OrderList from './OrderList';
import { OrderType } from '../../types/types';
import { Nav } from 'react-bootstrap';
import AddProduct from './AddProduct';

export default function SellerDashboard() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryUpdated, setInventoryUpdated] = useState(false);
  const [mode, setMode] = useState('inventory');
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
      .catch((e) => console.log('error fetching seller products', e));
  }, [inventoryUpdated === true]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log('error fetching seller orders', e));
  }, []);

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="Inventory">
        <Nav.Item>
          <Nav.Link eventKey="Inventory" onClick={() => setMode('Inventory')}>
            Inventory
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders" onClick={() => setMode('Orders')}>
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="AddProduct" onClick={() => setMode('NewProduct')}>
            Add Product
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {mode === 'Inventory' && (
        <InventoryList
          inventory={inventory}
          inventoryUpdated={inventoryUpdated}
          setInventoryUpdated={setInventoryUpdated}
        />
      )}
      {mode === 'Orders' && <OrderList orders={orders} />}
      {mode === 'NewProduct' && (
        <AddProduct
          inventoryUpdated={inventoryUpdated}
          setInventoryUpdated={setInventoryUpdated}
        />
      )}
    </>
  );
}
