import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
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
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const sellerId = currentUser.id;
  const mode = useSelector(
    (state: RootState) => state.sellerDashboardView.currentView
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/seller/${sellerId}/inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInventory(res.data);
      })
      .catch((e) => console.log('error fetching seller products', e));
  }, [inventoryUpdated === true, sellerId]);

  useEffect(() => {
    axios
      .get(`/api/seller/${sellerId}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            className='tab-link'
          >
            Inventory
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Orders"
            onClick={() => dispatch(setCurrentView('Orders'))}
            className='tab-link'
          >
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="AddProduct"
            onClick={() => dispatch(setCurrentView('NewProduct'))}
            className='tab-link'
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
