import React from 'react';
import { TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import {
  mdiMenuUp,
  mdiMenuDown,
} from '@mdi/js';
import TableBodyRow from './TableBodyRow';
import { CustomTableContext } from '../../index';
import { get } from 'lodash';
import './style.scss';

const StyledTableBodyRowGroup = ({ className = '', ...rest }) => <TableRow className={`comp_CustomTable_TableBodyGroup___row ${className}`} {...rest} />;
const StyledTableBodyCell = ({ className = '', ...rest }) => <TableCell className={`${className}`} {...rest} />;
const CustomButton = ({ className = '', ...rest }) => <Button className={`comp_CustomTable_TableBodyGroup___button ${className}`} {...rest} />;

function TableBodyGroupRow({ group }) {

  const { options, columns } = React.useContext(CustomTableContext);
  const [open, setOpen] = React.useState(true);

  return (
    <Droppable
      droppableId={group[get(options, 'grouped.id')]}
    >
      {(provided, snapshot) => (
        <TableBody
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          <StyledTableBodyRowGroup>
            <StyledTableBodyCell colSpan={get(columns, 'length', 0) + 1}>
              <CustomButton 
                fullWidth 
                size='small'
                onClick={() => setOpen(open => !open)}
              >
                {typeof(get(options, 'grouped.label')) === 'function' 
                  ? options.grouped.label(group) 
                  : group[get(options, 'grouped.label')]}
                {(open || snapshot.isDraggingOver) 
                  ? <Icon path={mdiMenuDown} size={1} color='#44485e' /> 
                  : <Icon path={mdiMenuUp} size={1} color='#44485e' />}
              </CustomButton>
            </StyledTableBodyCell>
          </StyledTableBodyRowGroup>
          {(open || snapshot.isDraggingOver) && group[get(options, 'grouped.item')].map((row, index) => (
            <TableBodyRow key={index} index={index} row={row} group={group} />
          ))}
          {provided.placeholder}  
        </TableBody>
      )}
    </Droppable>
  )
}

export default TableBodyGroupRow;
