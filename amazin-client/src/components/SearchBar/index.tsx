import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetCurrentProductFilter,
  setCurrentProductSearch,
} from '../../app/productFilterReducer';
import '../../styles/navbar.css';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (searchValue.trim() !== '') {
      dispatch(resetCurrentProductFilter());
      dispatch(setCurrentProductSearch(searchValue));
      setSearchValue('');
      navigate(`/products/search/${searchValue}`);
    }
  };

  return (
    <Form className="d-flex flex-grow-1" onSubmit={handleClick}>
      <FormControl
        type="search"
        placeholder="Search Amazin"
        className="mr-2 search-input"
        aria-label="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button variant="warning" type="submit" className='search-button'>
        <Search />
      </Button>
    </Form>
  );
}
