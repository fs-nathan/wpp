import React from 'react';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableBodyRow from './TableBodyRow';
import TableHeaderRow from './TableHeaderRow';
// import _ from 'lodash'

// function filterTaskByProperty (propertyName) {
//   __data.tasks = _.sortBy(__data.tasks, [propertyName])
// }

function TableMain(props) {
  const { data, setData } = props

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    const column = data.columns[source.droppableId];
    const newTasksId = Array.from(column.tasksId);
    newTasksId.splice(source.index, 1);
    newTasksId.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      tasksId: newTasksId,
    };
    setData({
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    });
  }

  return (
    <Table>
      <TableHead>
        <TableHeaderRow {...props}/>
      </TableHead>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const docs = column.tasksId.map(taskId => data.docs[taskId]);
          return (
            <Droppable droppableId={column.id} key={index}>
              {provided => (
                <TableBody
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  
                >
                  {docs.map((doc, index) => (
                    <TableBodyRow 
                      key={doc.id} 
                      doc={doc} 
                      index={index} 
                      {...props}
                    />  
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Table>
  )
}

export default TableMain;