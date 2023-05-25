import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setCurrentProductFilter,
  setCurrentProductSearch,
} from '../../app/productFilterReducer';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setCurrentProductFilter({
        rating: 0,
        minPrice: 0,
        maxPrice: 10000000,
      })
    );
    dispatch(setCurrentProductSearch(searchValue));
    navigate(`/products/search/${searchValue}`);
  };

  return (
    <Form className="d-flex flex-grow-1" onSubmit={handleClick}>
      <FormControl
        type="search"
        placeholder="Search Amazin"
        className="mr-2"
        aria-label="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button variant="warning" type="submit">
        <Search />
      </Button>
    </Form>
  );
}
