import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { CategoryType, DepartmentType } from '../../types/types';
import axios from 'axios';
import Cookies from 'js-cookie';

type Props = {
  inventoryUpdated: boolean;
  setInventoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

type ErrorType = {
  [key: string]: boolean;
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

  const initialErrorState: ErrorType = {
    name: false,
    description: false,
    price_cents: false,
    image: false,
    category: false,
    quantity: false,
  };

  const [error, setError] = useState<ErrorType>(initialErrorState);

  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const token = Cookies.get('token') || null;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const sellerId = currentUser.id;
  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter product name',
      errorMessage: 'Please add a product name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter product description',
      errorMessage: 'Please add a product description',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'text',
      placeholder: 'Enter product image URL',
      errorMessage: 'Please add a product image URL',
    },
  ];

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === 'category') {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: {
          connect: { id: Number(value) },
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));
    }

    setError((prevError) => ({
      ...prevError,
      [field]: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError((prevError) => ({
      ...prevError,
      name: !form.name ? true : false,
      description: !form.description ? true : false,
      image: !form.image ? true : false,
      category: !form.category.connect.id ? true : false,
      quantity: !form.quantity ? true : false,
      price_cents: !form.price_cents ? true : false,
    }));

    if (
      !form.name ||
      !form.description ||
      !form.image ||
      !form.category ||
      !form.quantity ||
      !form.price_cents
    ) {
      return;
    }

    const formEvent = e.currentTarget;
    const product = {
      name: formEvent.productName.value,
      description: formEvent.productDescription.value,
      price_cents: Number(formEvent.productPrice.value) * 100,
      image: formEvent.productImage.value,
      category: {
        connect: { id: Number(formEvent.productCategory.value) },
      },
      quantity: Number(formEvent.productQuantity.value),
      User: {
        connect: { id: sellerId },
      },
    };

    axios
      .post(
        `/api/seller/${sellerId}/inventory`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setInventoryUpdated(true);
        setError(initialErrorState);
        formEvent.reset();
      });
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
            controlId="productCategory"
            className="add-product-form-group"
          >
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              isInvalid={error.category}
              as="select"
              placeholder="Select product category"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChanges(e, 'category')
              }
            >
              <option value="0" disabled selected>
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
            {error.category && (
              <Form.Text className="text-danger">
                Please select a category
              </Form.Text>
            )}
          </Form.Group>
          {formFields.map((field) => (
            <Form.Group
              controlId={`product${field.label}`}
              className="add-product-form-group"
            >
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                isInvalid={error[field.name]}
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChanges(e, field.name)
                }
              />
              {error[field.name] && (
                <Form.Text className="text-danger">
                  {field.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
          ))}

          <Form.Group
            as={Col}
            controlId="productPrice"
            className="add-product-form-group"
          >
            <Form.Label>Price</Form.Label>
            <Form.Control
              isInvalid={error.price_cents}
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter product price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChanges(e, 'price_cents')
              }
            />
            {error.price_cents && (
              <Form.Text className="text-danger">Please add a price</Form.Text>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="productQuantity"
            className="add-product-form-group"
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              isInvalid={error.quantity}
              type="number"
              min="1"
              step="1"
              placeholder="Enter product quantity"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChanges(e, 'quantity')
              }
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }}
            />
            {error.quantity && (
              <Form.Text className="text-danger">
                Please add a quantity
              </Form.Text>
            )}
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
