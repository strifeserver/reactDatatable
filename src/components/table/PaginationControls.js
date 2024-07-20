import React from 'react';
import { Pagination, Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PaginationControls = ({ rowsPerPage, onRowsPerPageChange, pageCount, page, onPageChange }) => (
  <Row className="align-items-center">
    <Col>
      <Form.Control
        as="select"
        value={rowsPerPage}
        onChange={onRowsPerPageChange}
      >
        {[10, 25].map(option => (
          <option key={option} value={option}>
            {option} rows
          </option>
        ))}
      </Form.Control>
    </Col>
    <Col className="d-flex justify-content-end">
      <Pagination>
        <Pagination.First onClick={() => onPageChange(0)} />
        <Pagination.Prev onClick={() => onPageChange(Math.max(0, page - 1))} />
        {Array.from({ length: pageCount }, (_, i) => (
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => onPageChange(Math.min(pageCount - 1, page + 1))} />
        <Pagination.Last onClick={() => onPageChange(pageCount - 1)} />
      </Pagination>
    </Col>
  </Row>
);

PaginationControls.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationControls;
