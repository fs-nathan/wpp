import React from 'react';
import { Table, TableHead, TableBody } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TableBodyRow from './TableBodyRow';
import TableHeaderRow from './TableHeaderRow';
// import _ from 'lodash'

const __data = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 20,
      name: "Dự án thiết kế website Phúc An",
      type: "folder",
      location: "Văn Thư",
      size: "10.3",
      date: "02/02/2019"
    },
    'task-2': {
      id: 'task-2',
      content: 40,
      name: "Ảnh mẫu gửi khách hàng.jpg",
      type: "jpg",
      location: "Marketing",
      size: "30",
      date: "01/03/2019"
    },
    'task-3': {
      id: 'task-3',
      content: 60,
      name: "Ảnh mẫu gửi khách hàng 2.jpg",
      type: "jpg",
      location: "Văn Thư",
      size: "20.5",
      date: "05/02/2019"
    },
    'task-4': {
      id: 'task-4',
      content: 80,
      name: "Ảnh mẫu gửi khách hàng 3.jpg",
      type: "jpg",
      location: "Thiết kế",
      size: "5",
      date: "28/12/2018"
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

// function filterTaskByProperty (propertyName) {
//   __data.tasks = _.sortBy(__data.tasks, [propertyName])
// }

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
