import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { ProductType } from '../../types/types';
import jwt_decode from 'jwt-decode';
import { ErrorResponse } from '@remix-run/router';

type Props = {
  product: ProductType;
  inventoryUpdated: boolean;
  setInventoryUpdated: any;
};

type ErrorType = {
  [key: string]: boolean;
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
    description: product.description,
    price_cents: product.price_cents / 100,
    discountPercent: product.discountPercent ? product.discountPercent : '',
    saleStartDate:
      product.saleStartDate! >= today ? product.saleStartDate : today,
    saleEndDate: product.saleEndDate! >= today ? product.saleEndDate : today,
    isActive: product.isActive,
  };
  const [form, setForm] = useState(initialForm);

  const initialErrorState: ErrorType = {
    image: false,
    name: false,
    description: false,
    discountPercent: false,
    price_cents: false,
  };
  const [error, setError] = useState<ErrorType>(initialErrorState);

  const handleOptionSelect = (eventKey: any) => {
    if (eventKey === 'Cancel') {
      setForm({
        quantity: product.quantity,
        image: product.image,
        name: product.name,
        description: product.description,
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
      setError({ ...error, price_cents: false });
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
      setError((prev) => ({
        ...prev,
        image: form.image.length < 1 ? true : false,
        name: form.name.length < 1 ? true : false,
        description: form.description.length < 1 ? true : false,
        discountPercent: form.discountPercent! > 99 ? true : false,
        price_cents: form.price_cents < 0.01 ? true : false,
      }));

      const isValidForm =
        form.image.length < 1 ||
        form.name.length < 1 ||
        form.description.length < 1 ||
        form.discountPercent! > 99 ||
        form.price_cents < 0.01
          ? false
          : true;

      const formattedSaleStartDate = form.saleStartDate
        ? new Date(form.saleStartDate!).toISOString()
        : null;
      const formattedSaleEndDate = form.saleEndDate
        ? new Date(form.saleEndDate!).toISOString()
        : null;

      const isValidSale =
        form.discountPercent! > 0 &&
        form.discountPercent! < 100 &&
        form.saleStartDate! >= today;

      if (selectedOption === 'Edit' && !isValidForm) {
        return;
      }

      if (selectedOption === 'Edit' && isValidForm) {
        axios
          .patch(
            `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory/${product.id}`,
            {
              quantity: form.quantity,
              image: form.image,
              name: form.name,
              description: form.description,
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
              description: res.data.description,
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
      <td className="table-row-id">{product.id}</td>
      <td className="table-row-date">{product.createdAt.substring(0, 10)}</td>
      <td className="table-row">
        {selectedOption === 'Edit' ? (
          <>
            <Form.Control
              size="sm"
              required
              type="text"
              minLength={1}
              maxLength={255}
              value={form.image}
              onChange={(e) => {
                setForm({ ...form, image: e.target.value });
                setError({ ...error, image: false });
              }}
              isInvalid={error.image}
            />
            {error.image && (
              <Form.Text className="text-danger">
                Please add a product image URL
              </Form.Text>
            )}
          </>
        ) : (
          <img
            src={product.image}
            alt="product"
            className="inventory-product-image"
          />
        )}
      </td>
      <td className="table-row-name">
        {selectedOption === 'Edit' ? (
          <>
            <Form.Control
              size="sm"
              required
              type="text"
              minLength={1}
              maxLength={255}
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setError({ ...error, name: false });
              }}
              isInvalid={error.name}
            />
            {error.name && (
              <Form.Text className="text-danger">
                Please add a product name
              </Form.Text>
            )}
          </>
        ) : (
          product.name
        )}
      </td>
      <td className="table-row-description">
        {selectedOption === 'Edit' ? (
          <>
            <Form.Control
              size="sm"
              required
              type="text"
              minLength={1}
              maxLength={255}
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                setError({ ...error, description: false });
              }}
              isInvalid={error.description}
            />
            {error.description && (
              <Form.Text className="text-danger">
                Please add a product description
              </Form.Text>
            )}
          </>
        ) : (
          product.description
        )}
      </td>
      <td className="table-row-quantity">
        {selectedOption === 'Edit' ? (
          <Form.Control
            size="sm"
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
          <>
            <Form.Control
              size="sm"
              name="price_cents"
              type="number"
              step=".01"
              min="0.01"
              value={form.price_cents}
              onChange={handleChanges}
              required
              isInvalid={error.price_cents}
            />
            {error.price_cents && (
              <Form.Text className="text-danger">
                Please add a price greater than 0
              </Form.Text>
            )}
          </>
        ) : (
          product.price_cents / 100
        )}
      </td>
      <td className="table-row-discount">
        {selectedOption === 'Edit' ? (
          <>
            <Form.Control
              size="sm"
              name="discountPercent"
              type="number"
              step="1"
              min="0"
              max="99"
              value={form.discountPercent}
              onChange={handleChanges}
              isInvalid={error.discountPercent}
            />
            {error.discountPercent && (
              <Form.Text className="text-danger">
                Please add a discount between 0 and 99
              </Form.Text>
            )}
          </>
        ) : product.isOnSale ? (
          product.discountPercent
        ) : (
          0
        )}
      </td>
      <td className="table-row-date">
        {selectedOption === 'Edit' ? (
          <Form.Control
            size="sm"
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
          <Form.Control
            size="sm"
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
        </DropdownButton>
      </td>
    </tr>
  );
}
