import { Avatar, ClickAwayListener, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../../../helpers/utils/isEmpty';
import './styles.scss';
import { filterMembersByKey } from 'helpers/jobDetail/arrayHelper';
import Scrollbars from 'react-custom-scrollbars';

const TagModal = ({
  isOpen,
  handleClose,
  handleClickMention,
  selectedId,
  members,
}) => {
  // const dispatch = useDispatch();
  // const members = useSelector(state => state.taskDetail.taskMember.member);
  // const tagMembers = useSelector(state => state.chat.tagMembers);
  // const filteredMembers = filterMembersByKey(members, keyFilter.current)
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
        <Scrollbars
          autoHeight
          autoHeightMin={42}
          autoHeightMax={350}
        >
          {!isEmpty(members) &&
            members.map((el, index) => (
              <MenuItem key={el.id}
                className={clsx("TagModal--menuItem", { "TagModal--menuItem__selected": selectedId === index })}
                onClick={handleClickMember(index)}>
                <Avatar className="TagModal--avatar" src={el.avatar} />
              &nbsp;&nbsp;&nbsp;
                <span>{el.name}</span>
              </MenuItem>
            ))}
        </Scrollbars>
      </div>
    </ClickAwayListener>
  ) : null;
};

export default TagModal;
