import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow } from '@material-ui/core';
import { CustomTableContext } from '../../../index';
import { includes } from 'lodash';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import { get } from 'lodash';
import './style.scss';

const StyledTableBodyRow = ({ className = '', ...rest }) => <TableRow className={`comp_CustomTable_TableBodyRow___row ${className}`} {...rest} />;
const StyledTableBodyCell = ({ className = '', ...rest }) => <TableCell className={`comp_CustomTable_TableBodyRow___cell ${className}`} {...rest} />;

function TableBodyRow({ index, row, group }) {

  const { options, columns } = React.useContext(CustomTableContext);
  let inSearch = false;  

  if (get(options, 'search'))
    for (const key in row) {
      if (
        row.hasOwnProperty(key) &&
        get(row, key, '') &&
        includes(get(row, key, '').toString().toLowerCase(), get(options, 'search.patern', '').toLowerCase())
      ) inSearch = true;
    }

  if (!inSearch) return null;
  else return (
    get(options, 'draggable.bool', false)
    ? (
      <Draggable 
        draggableId={row[get(options, 'row.id')]}
        index={index}  
      >
        {(provided) => (
          <StyledTableBodyRow
            onClick={evt => get(options, 'row.onClick', () => null)(row, group)}
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
                {typeof(get(column, 'field')) === 'function' ? column.field(row) : get(row, get(column, 'field', ''), '')}
              </StyledTableBodyCell>
            ))}
          </StyledTableBodyRow>
        )}
      </Draggable>
    )
    : (
      <StyledTableBodyRow
        onClick={evt => get(options, 'row.onClick', () => null)(row, group)}
      >
        {columns.map((column, index) => (
          <StyledTableBodyCell key={index}>
            {typeof(get(column, 'field')) === 'function' ? column.field(row) : get(row, get(column, 'field', ''), '')}
          </StyledTableBodyCell>
        ))}
      </StyledTableBodyRow>
    ));
}

export default TableBodyRow;
