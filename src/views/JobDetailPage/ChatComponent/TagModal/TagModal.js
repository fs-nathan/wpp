import { Avatar, ClickAwayListener, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './styles.scss';

const TagModal = ({
  isOpen,
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

  return isOpen ? (
    <ClickAwayListener onClickAway={handleClose}>
      <div
        className={clsx("TagModal", { "TagModal__open": isOpen })}
      >
        {!isEmpty(members) &&
          members.map((el, index) => (
            <MenuItem key={el.id} className="TagModal--menuItem" onClick={handleClickMember(index)}>
              <Avatar className="TagModal--avatar" src={el.avatar} />
              &nbsp;&nbsp;&nbsp;
              <span>{el.name}</span>
            </MenuItem>
          ))}
      </div>
    </ClickAwayListener>
  ) : null;
};

export default TagModal;
