import { Table, TableBody, TableFooter, TableHead, TableRow } from '@material-ui/core';
import Scrollbars from 'components/Scrollbars';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CustomTableContext } from '../index';
import './style.scss';
import TableBodyGroupRow from './TableBodyGroupRow';
import TableBodyRow from './TableBodyGroupRow/TableBodyRow';
import TableHeaderRow from './TableHeaderRow';

const Container = ({ className = '', ...rest }) => <Scrollbars className={`comp_CustomTable_TableMain___container ${className}`} {...rest} />;

function TableMain() {

  const { options, data } = React.useContext(CustomTableContext);
  const [placeholderProps, setPlaceholderProps] = React.useState({});
console.log(options)
const handleDragEnd = (data) => {
  console.log(data)
}
  const onDragUpdate = update => {
    console.log(update, 'update')
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
      <Table 
        stickyHeader
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <TableHead>
          <TableHeaderRow />
        </TableHead>
        {/* get(options, 'draggable.onDragEnd', () => null) */}
        <DragDropContext onDragEnd={get(options, 'draggable.onDragEnd', () => null)} onDragUpdate={onDragUpdate}>
          {get(options, 'grouped.bool', false)
            ? (data.map((group, index) => (
                <TableBodyGroupRow group={group} key={index} index={index} placeholderProps={placeholderProps} />
              )))
            : (
              <Droppable
                droppableId={'custom-table-droppable-id'}
                direction={'vertical'}
              >
                {(provided, snapshot) => {
                  return (
                    <TableBody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
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
          <TableBody />
        </DragDropContext>
      </Table>
    </Container>
  )
}

export default TableMain;
