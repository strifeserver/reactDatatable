import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import debounce from 'lodash.debounce';
import FilterInput from './table/FilterInput';
import DataTableHeader from './table/DataTableHeader';
import DataTableBody from './table/DataTableBody';
import PaginationControls from './table/PaginationControls';

const DataTable = ({ fetchUrl }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl);
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = debounce((value) => setFilter(value), 300);


  const filteredData = useMemo(() => 
    (data.length > 0 ? data : originalData).filter(row =>
      row.title.toLowerCase().includes(filter.toLowerCase())
    ),
    [data, originalData, filter]
  );

  const sortedData = useMemo(() => {
    if (orderBy) {
      const isAsc = order === 'asc';
      return [...filteredData].sort((a, b) =>
        (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1)
      );
    }
    return filteredData;
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => 
    sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <FilterInput filter={filter} onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Table striped bordered hover>
        <DataTableHeader
          columns={['title', 'completed']}
          order={order}
          orderBy={orderBy}
          onSort={handleSort}
        />
        <DataTableBody data={paginatedData}/>
      </Table>
      <PaginationControls
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        pageCount={pageCount}
        page={page}
        onPageChange={handleChangePage}
      />
    </Container>
  );
};

export default DataTable;
