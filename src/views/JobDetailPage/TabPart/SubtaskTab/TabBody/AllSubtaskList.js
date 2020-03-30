import { List } from '@material-ui/core';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AllSubtaskListItem from './AllSubtaskListItem';

function convertResponseDataToMotionData(responseData) {
  let motionData = {
    data: {},
    columns: { 'column-1': { id: 'column-1' } },
    columnOrder: ['column-1'],
  }
  for (const item of responseData) {
    motionData.data[item.id] = item
  }
  motionData.columns['column-1'].dataIdArr = responseData.map(item => item.id)
  return motionData
}

const __data = {
  data: {
    'task-1': {
      id: 'task-1',
      content: 1,
    },
    'task-2': {
      id: 'task-2',
      content: 2,
    },
    'task-3': {
      id: 'task-3',
      content: 3,
    },
    'task-4': {
      id: 'task-4',
      content: 4,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      dataIdArr: ['task-1', 'task-2', 'task-3', 'task-4'],
    }
  },
  columnOrder: ['column-1'],
};

const StyledList = styled(List)`
  padding: 8px 0;
`;

function AllSubtaskList(props) {

  const uncompleteSubTasks = useSelector(state => state.taskDetail.subTask.uncompleteSubTasks);

  const [data, setData] = React.useState(
    uncompleteSubTasks.length
      ? convertResponseDataToMotionData(uncompleteSubTasks)
      : __data
  )

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    const column = data.columns[source.droppableId];
    const newTasksId = Array.from(column.dataIdArr);
    newTasksId.splice(source.index, 1);
    newTasksId.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      dataIdArr: newTasksId,
    };
    setData({
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    });
  }

  React.useEffect(() => {
    // Reset sub task when changing props
    setData(convertResponseDataToMotionData(uncompleteSubTasks))
  }, [uncompleteSubTasks])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId, index) => {
        const column = data.columns[columnId];
        const tasks = column.dataIdArr.map(taskId => data.data[taskId]);
        return (
          <Droppable droppableId={column.id} key={index}>
            {provided => (
              <StyledList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <AllSubtaskListItem key={task.id} task={task} index={index} {...props} />
                ))}
                {provided.placeholder}
              </StyledList>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  )
}

export default AllSubtaskList;