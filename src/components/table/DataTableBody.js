import React from "react";

const DataTableBody = ({ data }) => (
  <tbody>
    {data.map((row) => {
      return (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.region}</td>
          <td>{row.coatOfArms}</td>
          <td>{row.words}</td>
        </tr>
      );
    })}
  </tbody>
);

export default DataTableBody;
