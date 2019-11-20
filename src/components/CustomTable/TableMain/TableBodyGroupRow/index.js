import React from 'react';
import styled from 'styled-components';
import { TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Icon from '@mdi/react';
import {
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';
import TableBodyRow from './TableBodyRow';
import { CustomTableContext } from '../../index';
import { get } from 'lodash';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #f2f2f263;
  color: rgb(68, 72, 94);
  font-weight: 600;
  border-bottom: 1px solid rgb(241, 241, 241);
  padding: 8px;
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 0;
  font-size: 12px;
`;

const CustomButton = styled(Button)`
  justify-content: flex-start;
  border-radius: 0;
  padding: 8px 16px;
  & > span {
    font-weight: bold;
    color: rgb(68, 72, 94);
    & > span {
      margin-left: auto;
    }
    &:last-child {
      display: none;
    }
  }
`;

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
          <StyledTableBodyRow>
            <StyledTableBodyCell colSpan={get(columns, 'length', 0) + 1}>
              <CustomButton 
                fullWidth 
                size='small'
                onClick={() => setOpen(open => !open)}
                endIcon={
                  (open || snapshot.isDraggingOver) 
                  ? <Icon path={mdiChevronDown} size={1} color='#8d8d8d' /> 
                  : <Icon path={mdiChevronUp} size={1} color='#8d8d8d' />
                }  
              >
                {typeof(get(options, 'grouped.label')) === 'function' ? options.grouped.label(group) : group[get(options, 'grouped.label')]}
              </CustomButton>
            </StyledTableBodyCell>
          </StyledTableBodyRow>
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
