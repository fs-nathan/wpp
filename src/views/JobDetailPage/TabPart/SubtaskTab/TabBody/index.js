import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCheck, mdiDragVertical, mdiDotsVertical, mdiSend } from '@mdi/js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemText, Avatar, IconButton, Menu, MenuItem, InputBase } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
// import avatar from '../../../../../assets/avatar.jpg';
import SubtaskModal from '../SubtaskModal'
import { Scrollbars } from 'react-custom-scrollbars'
import ModalDeleteConfirm from '../../ModalDeleteConfirm'
import { useSelector } from 'react-redux';
// import { WrapperContext } from '../../../index'  
const Container = styled.div`
  padding: 0 0 50px 0;
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
  padding: 0.79rem !important;
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
const StyledMenu = styled.div`
  opacity: 0;
  ${AllSubtaskListItemContainer}:hover & {
    opacity: 1;
  }
`


function AllSubtaskListItem(props) {
  // bien chinh sua cong viec con
  // const value = React.useContext(WrapperContext)
  // useEffect(() => 
  //   value.getSubTaskByTaskId(value.taskId)
  //   console.log("Bấm có load lúc ra khoongg?????")
  // ,[value.taskId])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
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
  // bien modal delete
  const [isOpenDelete, setOpenDelete] = React.useState(false);

  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    props.deleteSubTaskByTaskId({ subTaskId: props.task.id, taskId: props.taskId })
  }

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided) => (
        <AllSubtaskListItemContainer
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <StyledMenu {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} />
          </StyledMenu>
          {
            !isHover
              ? <Avatar src={props.task.user_create_avatar} alt='avatar' />
              :
              <ButtonIcon onClick={() => {
                props.completeSubTaskByTaskId({ subTaskId: props.task.id, taskId: props.taskId })
              }}>
                <Icon path={mdiCheck} size={1} color={colorPal['blue'][0]} />
              </ButtonIcon>
          }
          <ItemList>{props.task.name}</ItemList>
          <StyledMenu>
            <ButtonIcon style={{ marginRight: 16 }} onClick={handleClick} aria-haspopup="true">
              <Icon path={mdiDotsVertical} size={1} />
            </ButtonIcon>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClickOpen} >Chỉnh sửa</MenuItem>
              <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
            </Menu>
          </StyledMenu>
          <SubtaskModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} task={props.task.id} name={props.task.name} {...props} />
          <ModalDeleteConfirm
            confirmDelete={confirmDelete}
            isOpen={isOpenDelete}
            handleCloseModalDelete={handleCloseModalDelete}
            handleOpenModalDelete={handleOpenModalDelete}
            // task={props.task.id}
            {...props}
          />
        </AllSubtaskListItemContainer>
      )}
    </Draggable>
  )
}



function AllSubtaskList(props) {

  const uncompleteSubTasks = useSelector(state => state.taskDetail.subTask.uncompleteSubTasks)

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
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
  }
`
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const CustomMenu = styled(Menu)`
  & > .MuiPaper-root {
    box-shadow: none;
    border: 1px solid rgba(0,0,0,.1);
    & > ul {
      padding : 0;
      & > li {
        padding : 10px 20px;
      }
    }
  }
`
const StyledListItemComplete = styled.li`
  padding-left: 30px;
  display: flex;
  align-items: center;
`
const StyledMenuComplete = styled.div`
  & > *:first-child {
    margin-right: 8px;
  }
  display: none;
  ${StyledListItemComplete}:hover & {
    display: inline;
  }
`
const FinishedSubtaskList = (props) => {
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks)
  // bien modal delete
  const [isOpenDel, setOpenDel] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("")

  // const [data] = React.useState([1, 2, 3, 4]);
  // const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt, id) {
    setSelectedId(id)
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }


  const handleOpenModalDelete = () => {
    console.log(selectedId)
    setOpenDel(true)
    setAnchorEl(null)
  };
  const handleCloseModalDelete = () => {
    setOpenDel(false);
  };
  const confirmDelete = () => {
    // props.deleteSubTaskByTaskId(props.task)
    // console.log('taskId::::', props);
  }

  return (
    <ul style={{ padding: 0 }}>

      {completeSubTasks.map((item, index) => {
        return (
          <StyledListItemComplete key={index}>
            <Avatar style={{ marginRight: 13 }} src={item.user_complete_avatar} alt='avatar' />
            <ItemList
              primary={`${item.name}`}
              secondary={
                <FinishedSubtaskListItemTextSecondary>
                  <Badge component='small' color='bluelight' badge size='small' label={'Hoàn thành'} />
                  lúc {item.time_complete}
                </FinishedSubtaskListItemTextSecondary>
              }
            />
            <StyledMenuComplete>

              <ButtonIcon onClick={e => handleClick(e, item.id)} aria-haspopup="true">
                <Icon path={mdiDotsVertical} size={1} />
              </ButtonIcon>

            </StyledMenuComplete>

          </StyledListItemComplete>
        );
      })}

      <CustomMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -10,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
      </CustomMenu>

      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDel}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        {...props}
      />
    </ul>
  );
}

const NewWork = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  border-top: 1px solid rgba(0, 0, 0, .1);
  align-item: center;
  margin-bottom: 12px;

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
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;

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
  const searchSubTaskTabPart = (e) => {
    props.searchSubTask(e.target.value)
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
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
              style={{ paddingBottom: 9, marginRight: 14 }}
              onClick={() => {
                createSubTask(props.taskId, name)
              }}>
              <Icon path={mdiSend} size={1} color={'gray'} />
            </ButtonIcon>
          </NewWork>
          :
          <Div>
            <Search
              placeholder={'Nhập từ khóa'}
              onChange={e => searchSubTaskTabPart(e)}
            />
          </Div>
        }
        <AllSubtaskList {...props} />
        <TextTitle uppercase bold style={{ paddingLeft: 30 }}>Hoàn thành</TextTitle>
        <FinishedSubtaskList {...props} />
      </Container>
    </Body>
  )
}

export default TabBody;
