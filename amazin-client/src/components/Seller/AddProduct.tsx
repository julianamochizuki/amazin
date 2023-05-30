import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { CategoryType, DepartmentType } from '../../types/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

type Props = {
  inventoryUpdated: boolean;
  setInventoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddProduct(props: Props) {
  const { inventoryUpdated, setInventoryUpdated } = props;
  const [form, setForm] = useState({
    name: '',
    description: '',
    price_cents: 0,
    image: '',
    category: {
      connect: { id: 0 },
    },
    quantity: 0,
    User: {
      connect: { id: 0 },
    },
  });

  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const token = Cookies.get('token') || null;
  const decodedToken: { id?: Number } | null = token ? jwt_decode(token) : null;
  const sellerId = decodedToken?.id || null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const product = {
      name: form.productName.value,
      description: form.productDescription.value,
      price_cents: Number(form.productPrice.value) * 100,
      image: form.productImage.value,
      category: {
        connect: { id: Number(form.productCategory.value) },
      },
      quantity: Number(form.productQuantity.value),
      User: {
        connect: { id: sellerId },
      },
    };
    axios.post(
      `${process.env.REACT_APP_API_SERVER_URL}/api/seller/${sellerId}/inventory`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInventoryUpdated(true);
    form.reset();
  };

  return (
    <>
      <Form
        style={{ width: '30%', margin: 'auto' }}
        onSubmit={handleSubmit}
        className="add-product-form mt-3"
      >
        <h4>New Product</h4>
        <Row>
          <Form.Group
            controlId="productName"
            className="add-product-form-group"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="productDescription"
            className="add-product-form-group"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description"
              required
            />
          </Form.Group>

          <Form.Group
            controlId="productImage"
            className="add-product-form-group"
          >
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product image URL"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="productCategory"
            className="add-product-form-group"
          >
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select product category"
              required
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {departments.map((department: DepartmentType) => (
                <optgroup label={department.name}>
                  {department.categories.map((category: CategoryType) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </optgroup>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="productPrice"
            className="add-product-form-group"
          >
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter product price"
              required
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="productQuantity"
            className="add-product-form-group"
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="1"
              placeholder="Enter product quantity"
              required
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }}
            />
          </Form.Group>
        </Row>
        <Button variant="warning" type="submit" size="sm">
          Submit
        </Button>
      </Form>
      {inventoryUpdated && (
        <Alert
          className="product-add-confirmation mt-3"
          style={{ width: '30%', margin: 'auto' }}
          variant="success"
        >
          Product added to your inventory.
        </Alert>
      )}
    </>
  );
}
