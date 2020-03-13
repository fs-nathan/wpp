import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import {
  ListItem, ListItemText, Avatar, IconButton, Menu, MenuItem
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiCheck, mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSubTask, completeSubTask } from '../../../../../actions/taskDetail/taskDetailActions';
import colorPal from '../../../../../helpers/colorPalette';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import SubtaskModal from '../SubtaskModal';

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

const StyledMenu = styled.div`
  opacity: 0;
  ${AllSubtaskListItemContainer}:hover & {
    opacity: 1;
  }
`

export const ButtonIcon = styled(IconButton)`
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

export const ItemList = styled(ListItemText)`
  & > span {
    font-size: 16px;
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
  }
`

function AllSubtaskListItem(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

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
    dispatch(
      deleteSubTask({
        sub_task_id: props.task.id,
        task_id: taskId
      })
    )
  }

  function onClickCompleteTask() {
    console.log('onClickCompleteTask', taskId)
    dispatch(
      completeSubTask({
        sub_task_id: props.task.id,
        taskId
      })
    )
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
            <abbr title="Kéo thả sắp xếp">
              <Icon color="#ccc" path={mdiDragVertical} size={1} />
            </abbr>
          </StyledMenu>
          {
            !isHover
              ?
              <abbr title="Đánh dấu hoàn thành">
                <Avatar src={props.task.user_create_avatar} alt='avatar' />
              </abbr>
              :
              <ButtonIcon onClick={onClickCompleteTask}>
                <abbr title="Đánh dấu hoàn thành">
                  <Icon path={mdiCheck} size={1} color={colorPal['blue'][0]} />
                </abbr>
              </ButtonIcon>
          }
          <ItemList>{props.task.name}
            <div className="subTaskItem--createdAt">Tạo lúc {props.task.name}</div>
          </ItemList>
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
          <SubtaskModal isOpen={open}
            handleClickClose={handleClickClose}
            handleClickOpen={handleClickOpen}
            task={props.task.id}
            name={props.task.name}
            {...props}
          />
          <ModalDeleteConfirm
            confirmDelete={confirmDelete}
            isOpen={isOpenDelete}
            handleCloseModalDelete={handleCloseModalDelete}
            handleOpenModalDelete={handleOpenModalDelete}
            // task={task.id}
            {...props}
          />
        </AllSubtaskListItemContainer>
      )}
    </Draggable>
  )
}

export default AllSubtaskListItem