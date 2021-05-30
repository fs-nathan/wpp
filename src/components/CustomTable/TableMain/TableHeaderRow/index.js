import React from 'react';
import { TableCell, TableRow, IconButton, } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiSwapVertical,
} from '@mdi/js';
import { CustomTableContext } from '../../index';
import { get } from 'lodash';
import './style.scss';

const StyledTableHeadRow = ({ className = '', ...rest }) => <TableRow className={`comp_CustomTable_TableHeaderRow___row ${className}`} {...rest} />;
const StyledTableHeadCell = ({ draggable, className = '', ...rest }) => 
  <TableCell 
    className={`${draggable
      ? 'comp_CustomTable_TableHeaderRow___cell-draggable' 
      : 'comp_CustomTable_TableHeaderRow___cell'} ${className}`} 
    {...rest} 
  />;

function TableHeaderRow() {

  const { columns, options } = React.useContext(CustomTableContext);

  return (
    <StyledTableHeadRow>
      {options.draggable.bool && (
        <StyledTableHeadCell
          align={'left'}
          draggable={get(options, 'draggable.bool', false)}
          className={get(options, 'grouped.draggable', false)&& get(options, 'draggable.bool', false) && 'group-icon-drag'}

        >
          <div style={{paddingLeft: '6px'}}>
            <Icon path={mdiDragVertical} size={1} color='#8d8d8d'/>
          </div>
        </StyledTableHeadCell>
      )}
      {columns.map((column, index) => (
        <StyledTableHeadCell 
          width={get(column, 'width')} 
          key={index} 
          align={get(column, 'align', 'left')}
          draggable={get(options, 'draggable.bool', false)}
        >
          <div>
            {typeof(get(column, 'label')) === 'function' ? column.label() : get(column, 'label', '')}
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
