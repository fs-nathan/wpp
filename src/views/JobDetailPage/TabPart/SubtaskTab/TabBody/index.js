import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 0;
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

const AllSubtaskListItemContainer = styled(ListItem)`
  display: flex;
  align-content: center;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  & > *:last-child {
    margin-left: auto;
  }
  padding: 8px 0;
`;

function AllSubtaskListItem({ task, index }) {

  const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Draggable 
      draggableId={task.id}
      index={index}  
    >
      {(provided) => (
        <AllSubtaskListItemContainer 
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          {
          !isHover 
            ? <Avatar style={{ width: 43.5, height: 43.5, }} src={avatar} alt='avatar' />
            : <IconButton>
              <Icon path={mdiCheckCircleOutline} size={1} color={colorPal['blue'][0]} />
            </IconButton>
          }
          <ColorTypo>Thiết kế {task.content}</ColorTypo>
          <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={handleClose}>Xóa</MenuItem>
          </Menu>
        </AllSubtaskListItemContainer>
      )}
    </Draggable>
  )
}

function AllSubtaskList() {

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
                  <AllSubtaskListItem key={task.id} task={task} index={index} />  
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

const FinishedSubtaskListItemTextSecondary = styled.span`
  display: flex;
  align-items: baseline;
  & > *:first-child {
    margin-right: 10px;
  }
`;

const FinishedSubtaskList = () => {
  const [data] = React.useState([1, 2, 3, 4]);

  return (
    <List>
      {data.map((elem, index) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={avatar} alt='avatar' />
            </ListItemAvatar>
            <ListItemText
              primary={`Xong việc ${elem}`}
              secondary={
                <FinishedSubtaskListItemTextSecondary>
                  <ColorChip component='small' color='blue' badge size='small' label={'Hoàn thành'} />
                  lúc 19:00 - 09/09/2019
                </FinishedSubtaskListItemTextSecondary>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

function TabBody() {
  return (
    <Container>
      <SearchInput placeholder={'Nhập từ khóa'} fullWidth/>
      <AllSubtaskList />
      <ColorTypo>Hoàn thành</ColorTypo>
      <FinishedSubtaskList />
    </Container>
  )
}

export default TabBody;
