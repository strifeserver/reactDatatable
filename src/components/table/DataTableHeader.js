import React from "react";

const DataTableHeader = ({ columns, order, orderBy, onSort }) => (
  <thead>
    <tr>
      {columns.map((column) => (
        <th key={column} onClick={() => onSort(column)}>
          {column.charAt(0).toUpperCase() + column.slice(1)}
          {orderBy === column ? (order === "asc" ? " 🔼" : " 🔽") : ""}
        </th>
      ))}
    </tr>
  </thead>
);

export default DataTableHeader;
