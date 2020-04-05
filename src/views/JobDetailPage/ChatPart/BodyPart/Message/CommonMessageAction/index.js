import { Menu, MenuItem } from '@material-ui/core';
import { mdiCommentQuoteOutline, mdiDotsVertical, mdiShare, mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';
import { deleteChat } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const CommonMessageAction = ({ chatId, handleReplyChat, handleForwardChat }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function handleClickCopy() {
    setAnchorEl(null);

  }

  function onClickMarkSubTask() {
    setAnchorEl(null);
    dispatch(showTab(2))
  }

  function onClickMarkDemand() {
    setAnchorEl(null);
    dispatch(showTab(3))
  }

  function handleDeleteChat() {
    dispatch(deleteChat(taskId, chatId))
    setAnchorEl(null);
  }

  function handleLikeChat() {

  }

  return (
    <div className="CommonMessageAction"  >
      <button className="CommonMessageAction--button" onClick={handleReplyChat} >
        <Icon className="CommonMessageAction--icon" path={mdiCommentQuoteOutline} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleForwardChat} >
        <Icon className="CommonMessageAction--icon" path={mdiShare} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleLikeChat} >
        <Icon className="CommonMessageAction--icon" path={mdiThumbUp} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleClick} >
        <Icon className="CommonMessageAction--icon" path={mdiDotsVertical} />
      </button>
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
        <MenuItem className="memberItem--menuItem" onClick={handleClickCopy}>Copy</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={onClickMarkSubTask}>Đánh dấu công việc con</MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={onClickMarkDemand}>Đánh dấu là chỉ đạo</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={handleDeleteChat}>Xóa</MenuItem>
      </Menu>
    </div>
  );
}

CommonMessageAction.propTypes = {

};

export default CommonMessageAction;
