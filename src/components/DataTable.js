import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import FilterInput from "./table/FilterInput";
import DataTableHeader from "./table/DataTableHeader";
import DataTableBody from "./table/DataTableBody";
import PaginationControls from "./table/PaginationControls";
import { Table } from "react-bootstrap";

const DataTable = ({ fetchUrl }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl, { params: filters });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchUrl, filters]); // Fetch data whenever fetchUrl or filters change

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    return Object.keys(filters).every((key) =>
      row[key] ? row[key].toLowerCase().includes(filters[key].toLowerCase()) : true
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy) {
      const isAsc = order === "asc";
      return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return filteredData;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <Container>
      <FilterInput onFilterChange={handleFilterChange} />
      <Table striped bordered hover>
        <DataTableHeader
          columns={["name", "region", "coatOfArms", "words"]}
          order={order}
          orderBy={orderBy}
          onSort={handleSort}
        />
        <DataTableBody data={paginatedData} />
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
