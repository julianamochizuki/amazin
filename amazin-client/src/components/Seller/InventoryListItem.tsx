import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
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
  const today = new Date().toISOString().slice(0, 10);
  const initialForm = {
    quantity: product.quantity,
    image: product.image,
    name: product.name,
    price_cents: product.price_cents / 100,
    discountPercent: product.discountPercent ? product.discountPercent : '',
    saleStartDate:
      product.saleStartDate! >= today ? product.saleStartDate : today,
    saleEndDate: product.saleEndDate! >= today ? product.saleEndDate : today,
    isActive: product.isActive,
  };
  const [form, setForm] = useState(initialForm);

  const handleOptionSelect = (eventKey: any) => {
    if (eventKey === 'Cancel') {
      setForm({
        quantity: product.quantity,
        image: product.image,
        name: product.name,
        price_cents: product.price_cents / 100,
        discountPercent: product.discountPercent ? product.discountPercent : 0,
        saleStartDate: product.saleStartDate,
        saleEndDate: product.saleEndDate,
        isActive: product.isActive,
      });
      setSelectedOption('Select');
    } else {
      setSelectedOption(eventKey);
    }
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'price_cents') {
      setForm({
        ...form,
        price_cents: parseFloat(parseFloat(e.target.value).toFixed(2)),
      });
    }
    if (e.target.name === 'discountPercent') {
      const inputValue = e.target.value;
      const isValidInput = /^[0-9\b]+$/.test(inputValue);
      if (!isValidInput) {
        return;
      } else {
        setForm({
          ...form,
          discountPercent: Math.round(Number(e.target.value)),
        });
      }
    }
  };

  useEffect(() => {
    if (inventoryUpdated) {
      const formattedSaleStartDate = new Date(
        form.saleStartDate!
      ).toISOString();
      const formattedSaleEndDate = new Date(form.saleEndDate!).toISOString();

      const isValidSale =
        form.discountPercent! > 0 &&
        form.discountPercent! < 100 &&
        form.saleStartDate! >= today;

      if (selectedOption === 'Edit') {
        axios
          .patch(
            `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory/${product.id}`,
            {
              quantity: form.quantity,
              image: form.image,
              name: form.name,
              price_cents: Math.round(form.price_cents * 100),
              discountPercent: isValidSale ? form.discountPercent : 0,
              saleStartDate: isValidSale ? formattedSaleStartDate : null,
              saleEndDate: isValidSale ? formattedSaleEndDate : null,
              isOnSale:
                form.saleStartDate?.split('T')[0] === today && isValidSale
                  ? true
                  : false,
              isActive: form.quantity > 0 ? true : false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setInventoryUpdated(true);
            setForm({
              quantity: res.data.quantity,
              image: res.data.image,
              name: res.data.name,
              price_cents: res.data.price_cents / 100,
              discountPercent: res.data.discountPercent,
              saleStartDate: res.data.saleStartDate,
              saleEndDate: res.data.saleEndDate,
              isActive: res.data.isActive,
            });
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
        <Form.Group controlId="productImage">
          {selectedOption === 'Edit' ? (
            <Form.Control
              required
              type='text'
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              onInput={(e: any) => {
                e.target.value = e.target.value.slice(0, 255);
              }}
            />
          ) : (
            <img
              src={product.image}
              alt="product"
              className="inventory-product-image"
            />
          )}
        </Form.Group>
      </td>
      <td className="table-row">{product.id}</td>
      <td className="table-row-name">
        {selectedOption === 'Edit' ? (
          <textarea
          required
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
            min="0"
            step="1"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Math.round(Number(e.target.value)) })
            }
          />
        ) : (
          product.quantity
        )}
      </td>
      <td className="table-row">
        {selectedOption === 'Edit' ? (
          <input
            name="price_cents"
            type="number"
            step=".01"
            min="0"
            value={form.price_cents}
            onChange={handleChanges}
            required
          />
        ) : (
          product.price_cents / 100
        )}
      </td>
      <td className="table-row-discount">
        {selectedOption === 'Edit' ? (
          <input
            name="discountPercent"
            type="number"
            step="1"
            min="0"
            max="99"
            value={form.discountPercent}
            onChange={handleChanges}
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
