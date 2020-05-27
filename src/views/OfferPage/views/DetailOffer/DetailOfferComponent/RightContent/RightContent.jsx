import { Avatar, Button, IconButton, TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { bgColorSelector } from '../../../../../../reducers/setting/selectors';
import { SEND_MODE } from './constants';
import {
  getDiscussionDateTimePosted, getHeaderTitle, getPopoverRemoveOption,
  getPopoverUpdateOption,
  getTextBoxBtnTitle,
  getTextBoxPlaceholder,
} from './i18nSelectors';
import './styles.scss';

function RightContent(props) {
  const { t } = useTranslation();
  const bgColor = useSelector(state => bgColorSelector(state));
  const [text, setText] = useState('');
  const [sendMode, setSendMode] = useState(SEND_MODE.CREATE);
  const [anchorEl, setAnchorEl] = useState(false);

  function renderHeaderTitle(title) {
    return <p className="offerDetail-discussion-headerTitle">{title}</p>;
  }

  function renderTextField() {
    const onTextChange = (e) => {
      const text = e.target.value;
      // Set Text Field value
      setText(text)
      // Switch back to Create Mode on text cleared
      if (text.length === 0 && sendMode === SEND_MODE.UPDATE) {
        setSendMode(SEND_MODE.CREATE);
      }
    }
    return (
      <TextField
        className="offerDetail-discussion-textInputSection-textBox"
        placeholder={getTextBoxPlaceholder(t)}
        InputProps={{ disableUnderline: true }}
        fullWidth
        multiline
        value={text}
        onChange={onTextChange}
      />
    );
  }

  function renderSendButton(bgColor, contentToSubmit) {
    const onClick = () => {
      switch (sendMode) {
        case SEND_MODE.CREATE:
          break;
        case SEND_MODE.UPDATE:
          break;
      }
    }
    return (
      <Button
        className={clsx(
          'offerDetail-discussion-textInputSection-sendBtn',
          !contentToSubmit && 'offerDetail-discussion-textInputSection-sendBtn-disabled'
        )}
        variant="contained"
        style={{backgroundColor: bgColor}}
        onClick={onClick}
        disabled={!contentToSubmit}
      >
        {getTextBoxBtnTitle(t)}
      </Button>
    );
  }

  function renderComment(username, avatarUrl, userPosition, time, date, content) {
    return (
      <div className="offerDetail-comment-container">
        <Avatar className="offerDetail-comment-avatar" src={avatarUrl} />
        <div className="offerDetail-comment-detail-container">
          <div className="offerDetail-comment-title-container">
            <p className="offerDetail-comment-title-username">{username}</p>
            <p className="offerDetail-comment-title-userPosition">{userPosition}</p>
          </div>
          <p className="offerDetail-comment-dateTimePosted">{getDiscussionDateTimePosted(t, time, date)}</p>
          <p className="offerDetail-comment-content">{content}</p>
        </div>
        <IconButton className="offerDetail-comment-moreBtn" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {renderPopoverOption(getPopoverUpdateOption(t), () => {
            // Hide popup menu
            setAnchorEl(null);
            // Switch send button to Update Mode
            setSendMode(SEND_MODE.UPDATE);
            // Fill text on Text Field for updating
            setText(content);
          })}
          {renderPopoverOption(getPopoverRemoveOption(t), () => {
            // Hide popup menu
            setAnchorEl(null);
            // Remove comment
          })}
        </Popover>
      </div>
    );
  }

  function renderPopoverOption(title, onClickHandler) {
    return (
      <Typography
        className="offerDetail-comment-popoverOption"
        onClick={onClickHandler}
      >
        {title}
      </Typography>
    );
  }

  return (
    <div className="offerDetail-rightContent-container">
      {renderHeaderTitle(getHeaderTitle(t))}
      <div className="offerDetail-horizontalLine" />
      <div className="offerDetail-discussion-textInputSection-container">
        {renderTextField()}
        {renderSendButton(bgColor.color, text)}
      </div>
      <div className="offerDetail-horizontalLine" />
    </div>
  );
}

export default RightContent;
