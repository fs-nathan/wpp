import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  IconButton, Menu, MenuItem
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';

import ModalDeleteConfirm from '../../ModalDeleteConfirm'
import { deleteRemind } from '../../../../../actions/taskDetail/taskDetailActions';

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

const MemberMenuLists = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    dispatch(deleteRemind({ remind_id: props.item.id, taskId: taskId }))
  }

  return (
    <div className={clsx(props.className, "styled-menu")} >
      <ButtonIcon onClick={e => handleClick(e)} aria-controls={"simple-menu" + props.idx} aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </ButtonIcon>
      <Menu
        id={"simple-menu" + props.idx}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          props.handleClickOpen(props.idx);
          handleClose();
        }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
      </Menu>
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        // task={props.task.id} 
        {...props} />
    </div>
  )
}

export default MemberMenuLists