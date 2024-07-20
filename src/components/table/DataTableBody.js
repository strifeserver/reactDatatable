import React from 'react';
import PropTypes from 'prop-types';

const DataTableBody = ({ data }) => (
  <tbody>
    {data.map((row) => (
      <tr key={row.id} >
        <td>{row.title}</td>
        <td>{row.completed ? 'Yes' : 'No'}</td>
      </tr>
    ))}
  </tbody>
);

DataTableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default DataTableBody;
