import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import _ from 'lodash';

import FilterInput from "./table/FilterInput";
import DataTableHeader from "./table/DataTableHeader";
import DataTableBody from "./table/DataTableBody";
import PaginationControls from "./table/PaginationControls";

const DataTable = ({ fetchUrl }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ name: "", region: "", coatOfArms: "", words: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (filters) => {
    setLoading(true);
    try {
      const response = await axios.get(fetchUrl, { params: filters });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]);

  const debouncedFetchData = useMemo(() => _.debounce(fetchData, 1500), [fetchData]);

  useEffect(() => {
    debouncedFetchData(filters);
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData, filters]);

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

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.keys(filters).every((key) =>
        row[key] ? row[key].toLowerCase().includes(filters[key].toLowerCase()) : true
      );
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (orderBy) {
      const isAsc = order === "asc";
      return filteredData.sort((a, b) => {
        return (a[orderBy] < b[orderBy] ? -1 : 1) * (isAsc ? 1 : -1);
      });
    }
    return filteredData;
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <FilterInput filters={filters} onFilterChange={handleFilterChange} />
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

DataTable.propTypes = {
  fetchUrl: PropTypes.string.isRequired,
};

export default DataTable;
