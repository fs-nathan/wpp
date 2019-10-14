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

const StyledTableBodyRow = styled(({ show, ...rest }) => <TableRow {...rest} />)`
  background-color: ${props => props.show ? 'rgba(0, 0, 0, .1)' : '#fff'};
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 0;
`;

const CustomButton = styled(Button)`
  justify-content: flex-start;
  border-radius: 0;
`;

function TableBodyRowGroup({ column }) {

  const [show, setShow] = React.useState(true);

  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <TableBody
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          <StyledTableBodyRow show={show || snapshot.isDraggingOver}>
            <StyledTableBodyCell colSpan={10}>
              <CustomButton 
                fullWidth 
                onClick={() => setShow(!show)}
                startIcon={
                  (show || snapshot.isDraggingOver)
                  ? <Icon path={mdiChevronDown} size={1} />
                  : <Icon path={mdiChevronUp} size={1} />
                }  
              >
                {column.title}
              </CustomButton>
            </StyledTableBodyCell>
          </StyledTableBodyRow>
          {(show || snapshot.isDraggingOver) && column.tasks.map((task, index) => (
            <TableBodyRow key={task.id} task={task} index={index} />  
          ))}
          {provided.placeholder}  
        </TableBody>
      )}
    </Droppable>
  )
}

export default TableBodyRowGroup;
