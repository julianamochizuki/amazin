import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ProductType } from '../../types/types';
import jwt_decode from 'jwt-decode';

type Props = {
  product: ProductType;
  inventoryUpdated: boolean;
  setInventoryUpdated: any;
};

export default function InventoryListItem(props: Props) {
  const { product, inventoryUpdated, setInventoryUpdated } = props;
  const [selectedOption, setSelectedOption] = useState('Select');
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const sellerId = decodedToken?.id || null;
  const [form, setForm] = useState({
    quantity: product.quantity,
    image: product.image,
    name: product.name,
    price_cents: product.price_cents,
  });

  const handleOptionSelect = (eventKey: any) => {
    setSelectedOption(eventKey);
  };

  useEffect(() => {
    if (inventoryUpdated) {
      if (selectedOption === 'Edit') {
        axios
          .patch(
            `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory/${product.id}`,
            {
              quantity: form.quantity,
              image: form.image,
              name: form.name,
              price_cents: form.price_cents,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((e) => console.log(`error updating product ${product.id}`, e));
      }
      if (
        selectedOption === 'Mark as inactive' ||
        selectedOption === 'Mark as active'
      ) {
        axios
          .patch(
            `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory/${product.id}`,
            {
              isActive: selectedOption === 'Mark as inactive' ? false : true,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((e) =>
            console.log(`error setting product inactive ${product.id}`, e)
          );
      }
      setInventoryUpdated(false);
      setSelectedOption('Select');
    }
  }, [inventoryUpdated === true]);

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        {product.isActive
          ? product.quantity
            ? 'In Stock'
            : 'Out of Stock'
          : 'Inactive'}
      </td>
      <td>
        {selectedOption === 'Edit' ? (
          <textarea
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        ) : (
          <img src={product.image} alt="product" className="product-image" />
        )}
      </td>
      <td>{product.id}</td>
      <td>
        {selectedOption === 'Edit' ? (
          <textarea
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        ) : (
          product.name
        )}
      </td>
      <td>{product.createdAt}</td>
      <td>
        {selectedOption === 'Edit' ? (
          <input
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
          />
        ) : (
          product.quantity
        )}
      </td>
      <td>
        {selectedOption === 'Edit' ? (
          <input
            type="number"
            step="0.01"
            value={form.price_cents / 100}
            onChange={(e) =>
              setForm({
                ...form,
                price_cents: parseFloat(e.target.value) * 100 || 0,
              })
            }
          />
        ) : (
          product.price_cents / 100
        )}
      </td>
      <td>
        <DropdownButton title={selectedOption} onSelect={handleOptionSelect}>
          <Dropdown.Item eventKey="Select">Select</Dropdown.Item>
          <Dropdown.Item eventKey="Edit">Edit</Dropdown.Item>
          <Dropdown.Item
            eventKey={product.isActive ? 'Mark as inactive' : 'Mark as active'}
          >
            {product.isActive ? 'Mark as inactive' : 'Mark as active'}
          </Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
}
