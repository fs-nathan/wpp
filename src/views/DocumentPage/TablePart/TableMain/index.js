import React from 'react';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableBodyRow from './TableBodyRow';
import TableHeaderRow from './TableHeaderRow';

const __data = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 20,
    },
    'task-2': {
      id: 'task-2',
      content: 40,
    },
    'task-3': {
      id: 'task-3',
      content: 60,
    },
    'task-4': {
      id: 'task-4',
      content: 80,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      tasksId: ['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  columnOrder: ['column-1'],
};

function TableMain() {

  const [data, setData] = React.useState(__data);

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
        <TableHeaderRow />
      </TableHead>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.tasksId.map(taskId => data.tasks[taskId]);
          return (
            <Droppable droppableId={column.id} key={index}>
              {provided => (
                <TableBody
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <TableBodyRow key={task.id} task={task} index={index} />  
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
