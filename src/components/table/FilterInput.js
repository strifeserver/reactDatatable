import React from "react";
import { Form, Col } from "react-bootstrap";
import debounce from "lodash.debounce";

const FilterInput = ({ onFilterChange }) => {
  const handleFilterChange = debounce((value) => {
    onFilterChange(value);
  }, 300);

  return (
    <Col className="mb-3">
      <Form.Control
        type="text"
        placeholder="Filter"
        onChange={(e) => handleFilterChange(e.target.value)}
      />
    </Col>
  );
};

export default FilterInput;
