import { IconButton, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiCheckCircle, mdiCircleOutline, mdiDotsVertical, mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { completeSubTask, deleteSubTask } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import SubtaskModal from '../SubtaskModal';

const AllSubtaskListItemContainer = styled(ListItem)`
  display: flex;
  align-content: center;
  background-color: #fff;
  cursor: pointer;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  & > *:last-child {
    margin-left: auto;
  }
  padding: 8px 0;
  &:hover {
    background-color: #f2f5fa;
  }
`;

const StyledMenu = styled.div`
  opacity: 0;
  ${AllSubtaskListItemContainer}:hover & {
    opacity: 1;
  }
`

export const ButtonIcon = styled(IconButton)`
  padding: 0rem !important;
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function AllSubtaskListItem(props) {
  const { t } = useTranslation();
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
        taskId
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
  const onClickTitle = () => {
    props.setSelectedItem(props.task)
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

        >
          <StyledMenu {...provided.dragHandleProps}>
            <abbr title={t('LABEL_CHAT_TASK_KEO_THA_SAP_XEP')}>
              <Icon color="#ccc" path={mdiDragVertical} size={1} />
            </abbr>
          </StyledMenu>
          {
            !isHover
              ?
              <abbr title={t('LABEL_CHAT_TASK_DANH_DAU_HOAN_THANH')}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {/* <Avatar src={props.task.user_create_avatar} alt='avatar' /> */}
                <Icon path={mdiCircleOutline} size={1} color="#757575" />
              </abbr>
              :
              <ButtonIcon onClick={onClickCompleteTask}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <abbr title={t('LABEL_CHAT_TASK_DANH_DAU_HOAN_THANH')}>
                  <Icon path={mdiCheckCircle} size={1} color="rgb(2,218,137)" />
                </abbr>
              </ButtonIcon>
          }
          <ListItemText>
            <div className="subTaskItem--content"
              onClick={onClickTitle}
            >{props.task.name}</div>
            {/* <div className="subTaskItem--createdAt">Tạo lúc {props.task.created_at}</div> */}
          </ListItemText>
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
              <MenuItem onClick={handleClickOpen} >{t('LABEL_CHAT_TASK_CHINH_SUA')}</MenuItem>
              <MenuItem onClick={handleOpenModalDelete}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
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