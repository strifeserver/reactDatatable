import React, { useState, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import debounce from 'lodash.debounce';

const FilterInput = ({ filter, onFilterChange }) => {
  const [inputValue, setInputValue] = useState(filter);

  const debouncedFilterChange = useCallback(
    debounce((value) => {
      onFilterChange(value);
    }, 300),
    [onFilterChange]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFilterChange(value);
  };

  return (
    <Form.Control
      type="text"
      placeholder="Filter by Title"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default FilterInput;
