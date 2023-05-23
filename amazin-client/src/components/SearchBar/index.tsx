import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <Form className="d-flex flex-grow-1" onSubmit={handleClick}>
      <FormControl
        type="search"
        placeholder="Search Amazin"
        className="mr-2"
        aria-label="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="warning" type='submit' >
        <Search />
      </Button>
    </Form>
  );
}
