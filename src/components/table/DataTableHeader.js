import React from 'react';
import PropTypes from 'prop-types';

const DataTableHeader = ({ columns, order, orderBy, onSort }) => (
  <thead>
    <tr>
      {columns.map((column) => (
        <th key={column} onClick={() => onSort(column)}>
          {column.charAt(0).toUpperCase() + column.slice(1)}
          {orderBy === column ? (order === 'asc' ? ' 🔼' : ' 🔽') : ''}
        </th>
      ))}
    </tr>
  </thead>
);

DataTableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default DataTableHeader;
