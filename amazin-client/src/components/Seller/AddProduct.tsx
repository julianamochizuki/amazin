import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
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
      <Form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter product description" />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter product price" />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" placeholder="Enter product image" />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Select Category</Form.Label>
          <Form.Control as="select" placeholder="Enter product category">
            {departments.map((department: DepartmentType) => (
              <optgroup label={department.name}>
                {department.categories.map((category: CategoryType) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </optgroup>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="productQuantity">
          <Form.Label>quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product count in stock"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {inventoryUpdated && (
        <Alert style={{ width: '30%', margin: 'auto' }}
         variant="success">Product added to your inventory.</Alert>
      )}
    </>
  );
}
