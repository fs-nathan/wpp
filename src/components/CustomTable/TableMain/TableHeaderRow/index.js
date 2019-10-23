import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
} from '@mdi/js';
import { CustomTableContext } from '../../index';

const StyledTableHeadRow = styled(TableRow)`
  background-color: #f4f4f4;
`;

const StyledTableHeadCell = styled(TableCell)`
  font-weight: bold;
  color: rgb(102, 102, 102);
  padding: 8px;
`;

function TableHeaderRow() {

  const { columns, options } = React.useContext(CustomTableContext);

  return (
    <StyledTableHeadRow>
      {options.draggable.bool && (
        <StyledTableHeadCell>
          <Icon path={mdiDragVertical} size={1} color='#8d8d8d'/>
        </StyledTableHeadCell>
      )}
      {columns.map((column, index) => (
        <StyledTableHeadCell key={index}>
          {typeof(column.label) === 'function' ? column.label() : column.label}
        </StyledTableHeadCell>
      ))}
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
