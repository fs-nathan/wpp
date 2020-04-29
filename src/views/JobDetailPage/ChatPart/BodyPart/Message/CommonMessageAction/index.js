import { useTranslation } from 'react-i18next';
import { Menu, MenuItem } from '@material-ui/core';
import { mdiCommentQuoteOutline, mdiDotsVertical, mdiShare, mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';
import { chatEmotion, deleteChat } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

const StyledButton = styled.button`
  &:hover svg {
    fill: ${props => props.colorHover};
  }
`

const CommonMessageAction = ({ chatId, handleReplyChat, handleForwardChat, isSelf }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const emotionsList = useSelector(state => state.chat.emotionsList);
  const groupActiveColor = useSelector(currentColorSelector)
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
      <StyledButton className="CommonMessageAction--button" onClick={handleReplyChat} colorHover={groupActiveColor}>
        <abbr title={t('LABEL_CHAT_TASK_TRA_LOI')}>
          <Icon className="CommonMessageAction--icon" path={mdiCommentQuoteOutline} />
        </abbr>
      </StyledButton>
      <StyledButton className="CommonMessageAction--button" onClick={handleForwardChat} colorHover={groupActiveColor}>
        <abbr title={t('LABEL_CHAT_TASK_CHUYEN_TIEP')}>
          <Icon className="CommonMessageAction--icon" path={mdiShare} />
        </abbr>
      </StyledButton>
      <StyledButton className="CommonMessageAction--button" onClick={handleClickEmotion} colorHover={groupActiveColor}>
        <abbr title={t('LABEL_CHAT_TASK_BIEU_CAM')}>
          <Icon className="CommonMessageAction--icon" path={mdiThumbUp} />
        </abbr>
      </StyledButton>
      <StyledButton className="CommonMessageAction--button" onClick={handleClick} colorHover={groupActiveColor}>
        <abbr title={t('LABEL_CHAT_TASK_THEM')}>
          <Icon className="CommonMessageAction--icon" path={mdiDotsVertical} />
        </abbr>
      </StyledButton>
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
        <MenuItem className="memberItem--menuItem" onClick={handleClickCopy}>{t('LABEL_CHAT_TASK_COPY')}</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={onClickMarkSubTask}>{t('LABEL_CHAT_TASK_DANH_DAU_CONG_VIEC_CON')}</MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={onClickMarkDemand}>{t('LABEL_CHAT_TASK_DANH_DAU_LA_CHI_DAO')}</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem className="memberItem--menuItem" onClick={handleDeleteChat}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
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
