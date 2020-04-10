import { Table, TableBody, TableFooter, TableHead, TableRow } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { CustomTableContext } from '../index';
import './style.scss';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableBodyRow from './TableBodyGroupRow/TableBodyRow';
import TableHeaderRow from './TableHeaderRow';

const Container = ({ className = '', ...rest }) => <Scrollbars className={`comp_CustomTable_TableMain___container ${className}`} {...rest} />;
const PlaceholderRow = ({ className = '', ...rest }) =>
  <TableRow
    className={`comp_CustomTable_TableMain___placeholder ${className}`}
    {...rest}
  />

const getBodyStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
});

function TableMain() {

  const { options, data } = React.useContext(CustomTableContext);
  const [placeholderProps, setPlaceholderProps] = React.useState({});

  const onDragUpdate = update => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[data-react-beautiful-dnd-draggable='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
    });
  };

  return (
    <Container
      autoHide
      autoHideTimeout={500}
    >
      <Table stickyHeader>
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        <DragDropContext onDragEnd={get(options, 'draggable.onDragEnd', () => null)} onDragUpdate={onDragUpdate}>
          {get(options, 'grouped.bool', false)
            ? (
              data.map((group, index) => (
                <TableBodyGroupRow group={group} key={index} placeholderProps={placeholderProps} />
              )))
            : (
              <Droppable
                droppableId={'custom-table-droppable-id'}
              >
                {(provided, snapshot) => {
                  console.log(provided.placeholder);
                  return (
                    <TableBody
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                      style={getBodyStyle(snapshot.isDraggingOver)}
                    >
                      {data.map((row, index) => (

                        <TableBodyRow key={index} index={index} row={row} group={null} />
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  )
                }}
              </Droppable>
            )}
        </DragDropContext>
        <TableFooter>
          <PlaceholderRow />
        </TableFooter>
      </Table>
    </Container>
  )
}

export default TableMain;
