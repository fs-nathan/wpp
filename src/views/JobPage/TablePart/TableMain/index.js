import React from 'react';
import { Table, TableHead } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import TableBodyGroupRow from './TableBodyGroupRow';
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
      title: 'Nhóm 1',
      tasksId: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Nhóm 2',
      tasksId: ['task-3', 'task-4'],
    }
  },
  columnOrder: ['column-1', 'column-2'],
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
    if (destination.droppableId === source.droppableId) {
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
    } else {
      const sourceColumn = data.columns[source.droppableId];
      const sourceNewTasksId = Array.from(sourceColumn.tasksId);
      sourceNewTasksId.splice(source.index, 1);
      const sourceNewColumn = {
        ...sourceColumn,
        tasksId: sourceNewTasksId,
      }
      const destinationColumn = data.columns[destination.droppableId];
      const destinationNewTasksId = Array.from(destinationColumn.tasksId);
      destinationNewTasksId.splice(destination.index, 0, draggableId);
      const destinationNewColumn = {
        ...destinationColumn,
        tasksId: destinationNewTasksId,
      }
      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceNewColumn.id]: sourceNewColumn,
          [destinationColumn.id]: destinationNewColumn,
        }
      });
    }
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
            <TableBodyGroupRow column={{ ...column, tasks }} key={index} />
          );
        })}
      </DragDropContext>
    </Table>
  )
}

export default TableMain;
