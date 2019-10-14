import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ColorTypo from '../../../components/ColorTypo';
import { IconButton, List } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import CustomListItem from './CustomListItem';

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
`;

const Header = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 10px;
  background-color: rgba(0, 0, 0, .1);
`;

const StyledList = styled(List)`
  padding: 8px 0;
`;

const __data = {
  tasks: {
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
      tasksId: ['task-1', 'task-2', 'task-3', 'task-4'],
    }
  },
  columnOrder: ['column-1'],
};

function ListPart() {

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
    <Container>
      <Header>
        <ColorTypo uppercase>Nhóm dự án</ColorTypo>
        <IconButton>
          <Icon path={mdiPlus} size={1} />
        </IconButton>
      </Header>
      <Banner>
        <ColorTypo bold>Tất cả</ColorTypo>
        &nbsp;
        &nbsp;
        <ColorTypo variant='caption'>(21 dự án)</ColorTypo>
      </Banner>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.tasksId.map(taskId => data.tasks[taskId]);
          return (
            <Droppable droppableId={column.id} key={index}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <CustomListItem key={task.id} task={task} index={index} />  
                  ))}
                  {provided.placeholder}
                </StyledList>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Container>
  )
}

export default ListPart;
