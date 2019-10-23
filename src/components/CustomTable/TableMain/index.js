import React from 'react';
import styled from 'styled-components';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../index';
import TableHeaderRow from './TableHeaderRow';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableBodyRow from './TableBodyGroupRow/TableBodyRow'; 

const Container = styled.div`
  overflow-y: auto;
`;

function TableMain() {

  const { options, data } = React.useContext(CustomTableContext);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <DragDropContext onDragEnd={options.draggable.onDragEnd}>
          {options.grouped.bool 
            ? (
            data.map((group, index) => (
              <TableBodyGroupRow group={group} key={index} />
            )))
            : (
              <Droppable
                droppableId={'custom-table-droppable-id'}
              >
                {(provided, snapshot) => (
                  <TableBody
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {data.map((row, index) => (
                      <TableBodyRow key={index} index={index} row={row} group={null} />
                    ))}
                    {provided.placeholder}  
                  </TableBody>
                )}
              </Droppable>
            )}
        </DragDropContext>
      </Table>
    </Container>
  )
}

export default TableMain;
