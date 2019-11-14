import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow, IconButton, } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiSwapVertical,
} from '@mdi/js';
import { CustomTableContext } from '../../index';
import { get } from 'lodash';

const StyledTableHeadRow = styled(TableRow)`
  background-color: #f4f4f4;
  height: 42px;
`;

const StyledTableHeadCell = styled(TableCell)`
  padding: 8px;
  & > div {
    width: 100%;
    height: 100%;
    font-weight: bold;
    color: rgb(102, 102, 102);
    font-size: 14px;
    display: flex;
    align-items: center;
    & > *:last-child {
      margin-left: 5px;
    }
  }
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
          <div>
            {typeof(column.label) === 'function' ? column.label() : get(column, 'label', '')}
            {get(column, 'sort') 
              ? <IconButton size='small' onClick={get(column, 'sort', () => null)}><Icon path={mdiSwapVertical} size={1} color='#8d8d8d'/></IconButton> 
              : null}
          </div>
        </StyledTableHeadCell>
      ))}
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;