import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import debounce from "lodash.debounce";

const FilterInput = ({ filters, onFilterChange }) => {
  const [inputValues, setInputValues] = useState(filters);

  const handleInputChange = (field, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    debouncedFilterChange(field, value);
  };

  const debouncedFilterChange = debounce((field, value) => {
    onFilterChange(field, value);
  }, 1500);

  return (
    <Col className="mb-3">
      <Form.Control
        type="text"
        placeholder="Filter by name"
        value={inputValues.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by region"
        value={inputValues.region}
        onChange={(e) => handleInputChange('region', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by coat of arms"
        value={inputValues.coatOfArms}
        onChange={(e) => handleInputChange('coatOfArms', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by words"
        value={inputValues.words}
        onChange={(e) => handleInputChange('words', e.target.value)}
      />
    </Col>
  );
};

export default FilterInput;
