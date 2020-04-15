import { Avatar, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import './ChatComponent.scss';

const TagModal = ({
  anchorEl,
  handleClose,
  handleClickMention,
}) => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const tagMembers = useSelector(state => state.chat.tagMembers);

  function handleClickMember(index) {
    return () => {
      handleClose()
      handleClickMention(members[index])
    }
  }

  return (
    <Menu
      id="tag-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {!isEmpty(members) &&
        members.map((el, index) => (
          <MenuItem key={el.id} className="tag--menuItem" onClick={handleClickMember(index)}>
            <Avatar className="header-chat-avatar" src={el.avatar} />
              &nbsp;&nbsp;&nbsp;
            <span>{el.name}</span>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default TagModal;
