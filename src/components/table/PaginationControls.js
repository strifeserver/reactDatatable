import React from 'react';
import { Pagination, Form, Row, Col } from 'react-bootstrap';

const PaginationControls = ({ rowsPerPage, onRowsPerPageChange, pageCount, page, onPageChange }) => (
  <Row className="align-items-center">
    <Col>
      <Form.Control
        as="select"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
      >
        {[5, 10, 25].map(option => (
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

export default PaginationControls;
