import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Table, TableHead, TableBody, TableFooter, TableRow } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../index';
import TableHeaderRow from './TableHeaderRow';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableBodyRow from './TableBodyGroupRow/TableBodyRow'; 
import { get } from 'lodash';
import './style.scss';

const Container = ({ className = '', ...rest }) => <Scrollbars className={`comp_CustomTable_TableMain___container ${className}`} {...rest} />;
const PlaceholderRow = ({ className = '', ...rest }) => 
  <TableRow 
    className={`comp_CustomTable_TableMain___placeholder ${className}`}
    {...rest}
  />

function TableMain() {

  const { options, data } = React.useContext(CustomTableContext);

  return (
    <Container
      autoHide
      autoHideTimeout={500}
    >
      <Table stickyHeader>
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <DragDropContext onDragEnd={get(options, 'draggable.onDragEnd', () => null)}>
          {get(options, 'grouped.bool', false)
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
        <TableFooter>
          <PlaceholderRow 
            placeholder={data.length === 0}
          />
        </TableFooter>
      </Table>
    </Container>
  )
}

export default TableMain;
