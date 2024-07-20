import React from 'react';
import DataTable from './components/DataTable';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const fetchUrl = 'https://jsonplaceholder.typicode.com/todos'; // Replace with your actual data API endpoint

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h4>Advanced Data Table</h4>
        </Col>
      </Row>
      <DataTable fetchUrl={fetchUrl} />
    </Container>
  );
};

export default App;
