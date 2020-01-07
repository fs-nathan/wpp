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
const StyledTableHeadCell = ({ center, className = '', ...rest }) => 
  <TableCell 
    className={`${center 
      ? 'comp_CustomTable_TableHeaderRow___cell'
      : 'comp_CustomTable_TableHeaderRow___cell-center'} ${className}`} 
    {...rest} 
  />;

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
        <StyledTableHeadCell key={index} center={get(column, 'center', false)}>
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
