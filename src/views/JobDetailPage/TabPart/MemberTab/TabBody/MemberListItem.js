import { Avatar, IconButton, ListItem, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteMember } from 'actions/taskDetail/taskDetailActions';
import { detailUser } from 'actions/user/detailUser';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MemberModal from '../MemberModal';
import './styles.scss';

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
const StyledListItem = styled(ListItem)`
    padding : 7px 0;
    &:hover .styled-menu-member {
      opacity: 1;
    }
`

const MemberListItem = ({
  id, name, avatar,
  room, position, group_permission,
  handleClickPermission,
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  // modal members
  const [open, setOpen] = React.useState(false);

  const handleCloseMembers = () => {
    setOpen(false);
  };
  const handleDeleteMembers = () => {
    setOpen(false);
    dispatch(deleteMember({ task_id: taskId, member_id: id }))
  };
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClickDetail = () => {
    handleClickOpen();
    dispatch(detailUser({ userId: id }))
  };

  const onClickPermission = () => {
    setAnchorEl(null);
    handleClickPermission()
  };

  return (
    <React.Fragment>
      <StyledListItem className="memberItem">
        <Avatar className="memberItem--avatar" src={avatar} alt='avatar' />
        <div className="memberItem--textWrap">
          <div className="memberItem--name">
            {name}
          </div>
          <div className="memberItem--department">
            {group_permission && group_permission.name}
          </div>
          <div className="memberItem--role">
            {[room, position].join(' - ')}
          </div>
        </div>
        <ButtonIcon
          className="memberItem--menuButton"
          size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
          <Icon path={mdiDotsVertical} size={1} />
        </ButtonIcon>
      </StyledListItem>
      <MemberModal isOpen={open} handleCloseMembers={handleCloseMembers} handleOpen={handleClickOpen} />
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
        <MenuItem className="memberItem--menuItem" onClick={handleClickDetail}>Chi tiết</MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={onClickPermission}>Phân quyền</MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={handleDeleteMembers}>Xóa</MenuItem>
      </Menu>
    </React.Fragment >
  );
}

export default MemberListItem