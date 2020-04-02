import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteRemind, pinRemind, unPinRemind } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';


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

const MemberMenuLists = ({ item, className, idx, handleClickOpen }) => {
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
    dispatch(deleteRemind({ remind_id: item.id, taskId: taskId }))
  }

  function onClickPin() {
    const action = item.is_ghim ? unPinRemind : pinRemind;
    dispatch(action({ remind_id: item.id, taskId: taskId }))
    handleClose();
  }

  return (
    <div className={clsx(className, "styled-menu")} >
      <ButtonIcon
        onClick={handleClick}
        aria-controls={"simple-menu" + idx} aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </ButtonIcon>
      <Menu
        id={"simple-menu" + idx}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={onClickPin}>
          {item.is_ghim ? 'Bỏ ghim' : 'Ghim nhắc hẹn'}
        </MenuItem>
        <MenuItem onClick={() => {
          handleClickOpen(idx);
          handleClose();
        }}>Sửa nhắc hẹn</MenuItem>
        <MenuItem onClick={handleOpenModalDelete}>Xóa nhắc hẹn</MenuItem>
      </Menu>
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
      />
    </div>
  )
}

export default MemberMenuLists