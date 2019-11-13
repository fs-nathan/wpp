import React, { userState } from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCheck, mdiDragVertical, mdiDotsVertical, mdiSend } from '@mdi/js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Menu, MenuItem, InputBase } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
import avatar from '../../../../../assets/avatar.jpg';
import SubtaskModal from '../SubtaskModal'
const Container = styled.div`
  padding: 0;
`;

const StyledList = styled(List)`
  padding: 8px 0;
`;
const TextTitle = styled(ColorTypo)`
  font-size: 16px;
  color: ${colorPal['gray'][0]};
  margin-left: 30pxreact-beautiful-dnd
`
const Search = styled(SearchInput)`

  
`

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

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`



function AllSubtaskListItem({ task, index }) {
  // bien chinh sua cong viec con
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  // end
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
            <Icon path={mdiDragVertical} size={1} />
          </div>
          {
            !isHover
              ? <Avatar style={{ width: 43.5, height: 43.5, }} src={avatar} alt='avatar' />
              : <ButtonIcon>
                <Icon path={mdiCheck} size={1} color={colorPal['blue'][0]} />
              </ButtonIcon>
          }
          <ItemList>{task.name}</ItemList>
          <ButtonIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsVertical} size={1} />
          </ButtonIcon>
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
            <MenuItem onClick={handleClickClose, handleClickOpen}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={handleClose}>Xóa</MenuItem>
          </Menu>
          <SubtaskModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} />
        </AllSubtaskListItemContainer>
      )}
    </Draggable>
  )
}



function AllSubtaskList(props) {


  // const [data, setData] = React.useState(__data);
  const [data, setData] = React.useState(
    props.subTasks.length
      ? convertResponseDataToMotionData(props.subTasks)
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
    setData(convertResponseDataToMotionData(props.subTasks))
  },[props.subTasks])

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

const FinishedSubtaskListItemTextSecondary = styled.span`
  display: flex;
  align-items: baseline;
  & > *:first-child {
    margin-right: 10px;
  }
`;
const ItemList = styled(ListItemText)`
  & > span {
    font-size: 16px;
  }
`
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const FinishedSubtaskList = (props) => {
  const [data] = React.useState([1, 2, 3, 4]);
  // const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <List>
      {data.map((elem, index) => {
        return (
          <ListItem key={index} style={{ paddingLeft: 30 }}>
            <ListItemAvatar>
              <Avatar src={avatar} alt='avatar' />
            </ListItemAvatar>
            <ItemList
              primary={`Xong việc ${elem}`}
              secondary={
                <FinishedSubtaskListItemTextSecondary>
                  <Badge component='small' color='bluelight' badge size='small' label={'Hoàn thành'} />
                  lúc 19:00 - 09/09/2019
                </FinishedSubtaskListItemTextSecondary>
              }
            />
            <ButtonIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
              <Icon path={mdiDotsVertical} size={1} />
            </ButtonIcon>
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
              <MenuItem onClick={handleClose}>Xóa</MenuItem>
            </Menu>
          </ListItem>
        );
      })}
    </List>
  );
}

const NewWork = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  align-item: center;

`
const InputText = styled(InputBase)`
  padding-left: 30px;
  font-size: 16px;
  align-item: center;
  width: 100%;
`
const Div = styled.div`
  margin: 10px 20px;
`

function TabBody(props) {
  // const [data, setData] = React.useState({ name: "" })
  const [name, setName] = React.useState("")

  const setStateSubTask = (e) => {
    // let newData = JSON.parse(JSON.stringify(data))
    // newData.name = e.target.value/
    // setData(newData)
    setName(e.target.value)
  }

  const createSubTask = (taskId, name) => {
    props.postSubTaskByTaskId(taskId, name)
    setName("")
  }

  return (
    <Container>
      {props.isClicked ?
        <NewWork>
          <InputText
            inputProps={{ 'aria-label': 'naked' }}
            placeholder={'Nhập tên công việc...'}
            onChange={setStateSubTask}
            value={name}
          />
          <ButtonIcon
            style={{ paddingBottom: 9 }}
            onClick={() => {
              createSubTask("5da183cfc46d8515e03fa9e8", name)
            }}>
            <Icon path={mdiSend} size={1} color={'gray'} />
          </ButtonIcon>
        </NewWork>
        :
        <Div>
          <Search placeholder={'Nhập từ khóa'} />
        </Div>
      }
      <AllSubtaskList {...props} />
      <TextTitle uppercase bold>Hoàn thành</TextTitle>
      <FinishedSubtaskList />
    </Container>
  )
}

export default TabBody;
