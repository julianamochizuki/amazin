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
    discountPercent: product.discountPercent,
    saleStartDate: product.saleStartDate,
    saleEndDate: product.saleEndDate,
  });

  const today = new Date().toISOString().slice(0, 10);

  const handleOptionSelect = (eventKey: any) => {
    if (eventKey === 'Cancel') {
      setForm({
        quantity: product.quantity,
        image: product.image,
        name: product.name,
        price_cents: product.price_cents,
        discountPercent: product.discountPercent,
        saleStartDate: product.saleStartDate,
        saleEndDate: product.saleEndDate,
      });
      setSelectedOption('Select');
    } else {
      setSelectedOption(eventKey);
    }
  };

  useEffect(() => {
    if (inventoryUpdated) {
      const formattedSaleStartDate = new Date(
        form.saleStartDate!
      ).toISOString();

      const formattedSaleEndDate = new Date(form.saleEndDate!).toISOString();

      if (selectedOption === 'Edit') {
        axios
          .patch(
            `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory/${product.id}`,
            {
              quantity: form.quantity,
              image: form.image,
              name: form.name,
              price_cents: form.price_cents,
              discountPercent: form.discountPercent,
              saleStartDate: formattedSaleStartDate,
              saleEndDate: formattedSaleEndDate,
              isOnSale:
                form.saleStartDate?.split('T')[0] === today ? true : false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setInventoryUpdated(true);
          })
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
    <tr className="inventory-table">
      <td className="table-row">
        {product.isActive
          ? product.quantity
            ? 'In Stock'
            : 'Out of Stock'
          : 'Inactive'}
      </td>
      <td className="table-row">
        {selectedOption === 'Edit' ? (
          <textarea
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        ) : (
          <img
            src={product.image}
            alt="product"
            className="inventory-product-image"
          />
        )}
      </td>
      <td className="table-row">{product.id}</td>
      <td className="table-row-name">
        {selectedOption === 'Edit' ? (
          <textarea
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        ) : (
          product.name
        )}
      </td>
      <td className="table-row-date">{product.createdAt.substring(0, 10)}</td>
      <td className="table-row">
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
      <td className="table-row">
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
      <td className="table-row-discount">
        {selectedOption === 'Edit' ? (
          <input
            type="number"
            value={form.discountPercent}
            onChange={(e) =>
              setForm({
                ...form,
                discountPercent: parseFloat(e.target.value) || 0,
              })
            }
          />
        ) : product.isOnSale ? (
          product.discountPercent
        ) : (
          0
        )}
      </td>
      <td className="table-row-date">
        {selectedOption === 'Edit' ? (
          <input
            type="date"
            value={form.saleStartDate?.substring(0, 10)}
            min={today}
            onChange={(e) =>
              setForm({ ...form, saleStartDate: e.target.value })
            }
          />
        ) : product.isOnSale ? (
          product.saleStartDate?.substring(0, 10)
        ) : (
          'N/A'
        )}
      </td>
      <td className="table-row-date">
        {selectedOption === 'Edit' ? (
          <input
            type="date"
            min={form.saleStartDate?.substring(0, 10)}
            value={form.saleEndDate?.substring(0, 10)}
            onChange={(e) => setForm({ ...form, saleEndDate: e.target.value })}
          />
        ) : product.isOnSale ? (
          product.saleEndDate?.substring(0, 10)
        ) : (
          'N/A'
        )}
      </td>
      <td className="inventory-dropdown-container">
        <DropdownButton
          title={selectedOption}
          size="sm"
          onSelect={handleOptionSelect}
          variant="light"
          className="inventory-dropdown"
        >
          <Dropdown.Item eventKey="Select">Select</Dropdown.Item>
          <Dropdown.Item eventKey="Edit">Edit</Dropdown.Item>
          <Dropdown.Item
            eventKey={product.isActive ? 'Mark as inactive' : 'Mark as active'}
          >
            {product.isActive ? 'Mark as inactive' : 'Mark as active'}
          </Dropdown.Item>
          {selectedOption !== 'Select' && (
            <Dropdown.Item eventKey="Cancel">Cancel</Dropdown.Item>
          )}
        </DropdownButton>
      </td>
    </tr>
  );
}
