import { Menu, MenuItem } from '@material-ui/core';
import { mdiCommentQuoteOutline, mdiDotsVertical, mdiShare, mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';
import { chatEmotion, deleteChat } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const CommonMessageAction = ({ chatId, handleReplyChat, handleForwardChat, isSelf }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const emotionsList = useSelector(state => state.chat.emotionsList);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElEmotion, setAnchorElEmotion] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleClickEmotion = (evt) => {
    setAnchorElEmotion(evt.currentTarget);
  }

  const handleCloseEmotion = () => {
    setAnchorElEmotion(null);
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
    dispatch(showTab(7))
  }

  function handleDeleteChat() {
    dispatch(deleteChat(taskId, chatId))
    setAnchorEl(null);
  }

  function handleClickEmo(emo) {
    return () => {
      dispatch(chatEmotion(taskId, chatId, emo))
      setAnchorElEmotion(null);
    }
  }

  return (
    <div className={clsx("CommonMessageAction", { 'CommonMessageAction__self': isSelf })} >
      <button className="CommonMessageAction--button" onClick={handleReplyChat} >
        <Icon className="CommonMessageAction--icon" path={mdiCommentQuoteOutline} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleForwardChat} >
        <Icon className="CommonMessageAction--icon" path={mdiShare} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleClickEmotion} >
        <Icon className="CommonMessageAction--icon" path={mdiThumbUp} />
      </button>
      <button className="CommonMessageAction--button" onClick={handleClick} >
        <Icon className="CommonMessageAction--icon" path={mdiDotsVertical} />
      </button>
      <Menu
        id="CommonMessageAction-menu"
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
      <Menu
        id="CommonMessageAction-emo"
        anchorEl={anchorElEmotion}
        keepMounted
        open={Boolean(anchorElEmotion)}
        onClose={handleCloseEmotion}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{
          paper: "emoMenu",
          list: "emoMenu--list"
        }}
      >
        {emotionsList.map(emo =>
          <MenuItem key={emo.value} className="emoMenu--menuItem" onClick={handleClickEmo(emo.value)}>
            <img className="emoMenu--image" src={emo.icon} alt="emo"></img>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

CommonMessageAction.propTypes = {

};

export default CommonMessageAction;