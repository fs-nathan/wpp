import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import { CustomTableContext } from '../../../index';
import { includes } from 'lodash';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import { get } from 'lodash';
import './style.scss';

const StyledTableBodyRow = ({ className = '', innerRef, ...rest }) => <TableRow ref={innerRef} className={`comp_CustomTable_TableBodyRow___row ${className}`} {...rest} />;
const StyledTableBodyCell = ({ className = '', draggable, ...rest }) => 
  <TableCell 
    className={`${draggable
        ? 'comp_CustomTable_TableBodyRow___cell-draggable' 
        : 'comp_CustomTable_TableBodyRow___cell'
      } ${className}`} 
    {...rest} 
  />;


const DragBox = ({ className = '', ...props }) =>
  <div 
    className={`comp_CustomTable_TableBodyRow___drag-box ${className}`}
    {...props}
  />
 
function TableBodyRow({ index, row, group }) {
  const [hover, setHover] = React.useState(false);
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
            innerRef={provided.innerRef}
            {...provided.draggableProps} 
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
          >
            <StyledTableBodyCell
              align={'center'}
              onMouseEnter={()=>setHover(true)}
              draggable={true}
              className={get(options, 'grouped.draggable', false)&& get(options, 'draggable.bool', false) && 'group-icon-drag'}
            >
              <div className={get(options, 'actionlist.bool', false) && hover && 'icon-drag-hover' || get(options, 'actionlist.bool', false) && 'icon-drag-hide'} {...provided.dragHandleProps}>
                <Icon path={mdiDragVertical} size={1} color='#8d8d8d'/>
              </div>
            </StyledTableBodyCell>
            {columns.map((column, index) => (
              <StyledTableBodyCell 
                width={get(column, 'width')} 
                key={index}
                align={get(column, 'align', 'left')}
                draggable={true}
                className={hover && get(options, 'actionlist.bool') === true 
                ? 'comp__table-cell-hover':''}
              >
                {typeof(get(column, 'field')) === 'function' ? column.field(row) : get(row, get(column, 'field', ''), '')}
              </StyledTableBodyCell>
            ))}
            
          </StyledTableBodyRow>
        )}
      </Draggable>
    )
    : (
      <StyledTableBodyRow 
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}>
        {columns.map((column, index) => (
          <StyledTableBodyCell 
            key={index}
            align={get(column, 'align', 'left')}
            className={hover && get(options, 'actionlist.bool') === true 
                ? 'comp__table-cell-hover':''}
          >
            {typeof(get(column, 'field')) === 'function' ? column.field(row) : get(row, get(column, 'field', ''), '')}
          </StyledTableBodyCell>
        ))}
      </StyledTableBodyRow>
    ));
}

export default TableBodyRow;


