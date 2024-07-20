import React from "react";
import { Form, Col } from "react-bootstrap";
import debounce from "lodash.debounce";

const FilterInput = ({ onFilterChange }) => {
  const handleFilterChange = debounce((field, value) => {
    onFilterChange(field, value);
  }, 300);

  return (
    <Col className="mb-3">
      <Form.Control
        type="text"
        placeholder="Filter by name"
        onChange={(e) => handleFilterChange('name', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by region"
        onChange={(e) => handleFilterChange('region', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by coat of arms"
        onChange={(e) => handleFilterChange('coatOfArms', e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder="Filter by words"
        onChange={(e) => handleFilterChange('words', e.target.value)}
      />
    </Col>
  );
};

export default FilterInput;
