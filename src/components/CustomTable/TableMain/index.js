import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../index';
import TableHeaderRow from './TableHeaderRow';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableBodyRow from './TableBodyGroupRow/TableBodyRow'; 
import { get } from 'lodash';
import './style.scss';

const Container = ({ className = '', ...rest }) => <Scrollbars className={`comp_CustomTable_TableMain___container ${className}`} {...rest} />;

function TableMain() {

  const { options, data } = React.useContext(CustomTableContext);

  return (
    <Container
      autoHide
      autoHideTimeout={500}
    >
      {get(options, 'loading.bool', false) && get(options, 'loading.component')()}
      {!get(options, 'loading.bool', false) && (
        <Table>
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
        </Table>
      )}
    </Container>
  )
}

export default TableMain;
