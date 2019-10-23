import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow } from '@material-ui/core';
import { CustomTableContext } from '../../../index';
import { includes } from 'lodash';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
  border-bottom: 1px solid rgb(239, 239, 239);
  text-decoration: none;
  &:hover {
    cursor: pointer;
    background-color: #f2f5fa;
  }
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 8px;
  font-size: 12px;
`;

function TableBodyRow({ index, row, group }) {

  const { options, columns } = React.useContext(CustomTableContext);
  let inSearch = false;  

  for (const key in row) {
    if (
      row.hasOwnProperty(key) &&
      includes(row[key].toString().toLowerCase(), options.search.patern.toLowerCase())
    ) inSearch = true;
  }


  if (!inSearch) return null;
  else return (
    options.draggable.bool
    ? (
      <Draggable 
        draggableId={row[options.row.id]}
        index={index}  
      >
        {(provided) => (
          <StyledTableBodyRow
            onClick={evt => options.row.onClick(row, group)}
            innerRef={provided.innerRef}
            {...provided.draggableProps} 
          >
            <StyledTableBodyCell>
              <div {...provided.dragHandleProps}>
                <Icon path={mdiDragVertical} size={1} color='#8d8d8d'/>
              </div>
            </StyledTableBodyCell>
            {columns.map((column, index) => (
              <StyledTableBodyCell key={index}>
                {typeof(column.field) === 'function' ? column.field(row) : row[column.field]}
              </StyledTableBodyCell>
            ))}
          </StyledTableBodyRow>
        )}
      </Draggable>
    )
    : (
      <StyledTableBodyRow
        onClick={evt => options.row.onClick(row, group)}
      >
        {columns.map((column, index) => (
          <StyledTableBodyCell key={index}>
            {column.renderField !== null ? column.renderField(row) : row[column.field]}
          </StyledTableBodyCell>
        ))}
      </StyledTableBodyRow>
    ));
}

export default TableBodyRow;
