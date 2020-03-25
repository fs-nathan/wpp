import { Avatar, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteSubTask } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import { ButtonIcon } from './AllSubtaskListItem';
import './styles.scss';

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
  padding-left: 16px;
  display: flex;
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

const FinishedSubtaskListItemTextSecondary = styled.span`
  display: flex;
  align-items: baseline;
  & > *:first-child {
    margin-right: 10px;
  }
`;

const FinishedSubtaskList = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks);
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
    dispatch(deleteSubTask({ taskId, sub_task_id: selectedId }))
    // console.log('taskId::::', props);
  }

  return (
    <ul style={{ padding: 0 }}>
      {completeSubTasks.map((item, index) => {
        return (
          <StyledListItemComplete key={index}>
            <Avatar className="finishedSubTask--avatar" src={item.user_create_avatar} alt='avatar' />
            <ListItemText
              primary={`${item.name}`}
              secondary={
                <FinishedSubtaskListItemTextSecondary>
                  <abbr title={item.user_complete_name}>
                    <Avatar src={item.user_complete_avatar} style={{ width: 12, height: 12 }} />
                  </abbr>
                  Hoàn thành lúc {item.time_complete}
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

export default FinishedSubtaskList