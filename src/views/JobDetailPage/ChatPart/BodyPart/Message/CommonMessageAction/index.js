import { Menu, MenuItem } from '@material-ui/core';
import { mdiCardsHeart, mdiCommentQuoteOutline, mdiDotsVertical, mdiShare } from '@mdi/js';
import Icon from '@mdi/react';
import { chatEmotion, deleteChat } from 'actions/chat/chat';
import { createCommand, postSubTask } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import ReactEmotionPopup from '../ReactEmotionPopup';
import './styles.scss';
import AlertModal from 'components/AlertModal';

const StyledButton = styled.button`
  &:hover svg {
    fill: ${props => props.colorHover};
  }
`

const CommonMessageAction = ({
  chatId, handleReplyChat,
  handleForwardChat,
  content,
  can_delete,
  isSelf, isShortMessage }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const emotionsList = useSelector(state => state.chat.emotionsList);
  const groupActiveColor = useSelector(currentColorSelector)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alert, setAlert] = useState(false);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function handleClickCopy() {
    setAnchorEl(null);
    if (content) {
      window.navigator.clipboard.writeText(content);
      enqueueSnackbar(`${t('IDS_WP_ALREADY_COPY')} ${content}`, { variant: 'success' });
    }
  }

  function onClickMarkSubTask() {
    setAnchorEl(null);
    if (content) {
      dispatch(postSubTask({ task_id: taskId, name: content }))
    }
    // dispatch(showTab(2))
  }

  function onClickMarkDemand() {
    setAnchorEl(null);
    if (content) {
      dispatch(createCommand({ task_id: taskId, content, type: 0 }))
    }
    // dispatch(showTab(7))
  }

  function handleDeleteChat() {
    if (!can_delete) return;
    setAlert(true)
  }

  function confirmDeleteChat() {
    dispatch(deleteChat(taskId, chatId))
    setAnchorEl(null);
  }

  function handleClickEmotion() {
    dispatch(chatEmotion(taskId, chatId, emotionsList[0].value))
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
      <StyledButton
        className={clsx("CommonMessageAction--button", "CommonMessageAction--buttonEmo", {
          "CommonMessageAction--buttonEmo__short": isShortMessage
        })}
        onClick={handleClickEmotion}
        colorHover={groupActiveColor}>
        <abbr title={t('LABEL_CHAT_TASK_BIEU_CAM')}>
          <Icon className="CommonMessageAction--icon" path={mdiCardsHeart} />
        </abbr>
        <ReactEmotionPopup chatId={chatId} />
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
        <MenuItem
          className={clsx("memberItem--menuItem", { 'memberItem--menuItem__disabled': !content })}
          onClick={handleClickCopy}>{t('LABEL_CHAT_TASK_COPY')}</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem
          className={clsx("memberItem--menuItem", { 'memberItem--menuItem__disabled': !content })}
          onClick={onClickMarkSubTask}>{t('LABEL_CHAT_TASK_DANH_DAU_CONG_VIEC_CON')}</MenuItem>
        <MenuItem
          className={clsx("memberItem--menuItem", { 'memberItem--menuItem__disabled': !content })}
          onClick={onClickMarkDemand}>{t('LABEL_CHAT_TASK_DANH_DAU_LA_CHI_DAO')}</MenuItem>
        <MenuItem divider></MenuItem>
        <MenuItem
          className={clsx("memberItem--menuItem", { 'memberItem--menuItem__disabled': !can_delete })}
          onClick={handleDeleteChat}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDeleteChat}
      />
    </div>
  );
}

CommonMessageAction.propTypes = {

};

export default CommonMessageAction;
