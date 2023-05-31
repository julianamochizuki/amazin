import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import InventoryList from './InventoryList';
import OrderList from './OrderList';
import { OrderType } from '../../types/types';
import { Col, Nav } from 'react-bootstrap';
import AddProduct from './AddProduct';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentView } from '../../app/sellerDashboardViewReducer';
import { useDispatch } from 'react-redux';

export default function SellerDashboard() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryUpdated, setInventoryUpdated] = useState(false);
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const sellerId = decodedToken?.id || null;
  const mode = useSelector(
    (state: RootState) => state.sellerDashboardView.currentView
  );
  const dispatch = useDispatch();

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
  }, [inventoryUpdated === true, sellerId]);

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
    <Col className="m-3">
      <Nav variant="tabs" defaultActiveKey="Inventory">
        <Nav.Item>
          <Nav.Link
            eventKey="Inventory"
            onClick={() => dispatch(setCurrentView('Inventory'))}
          >
            Inventory
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Orders"
            onClick={() => dispatch(setCurrentView('Orders'))}
          >
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="AddProduct"
            onClick={() => dispatch(setCurrentView('NewProduct'))}
          >
            Add Product
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Col>
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
      </Col>
    </Col>
  );
}
