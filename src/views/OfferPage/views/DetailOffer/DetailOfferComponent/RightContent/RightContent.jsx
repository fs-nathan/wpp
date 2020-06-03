import { Avatar, Button, IconButton, TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { bgColorSelector } from '../../../../../../reducers/setting/selectors';
import {
  getCommentListOfferDetail,
  postCommentOfferDetail,
  removeCommentOfferDetail,
  updateCommentOfferDetail,
} from '../../../../redux/actions';
import { SEND_MODE, USER_ROLE } from './constants';
import {
  getDiscussionDateTimePosted, getHeaderTitle, getPopoverRemoveOption,
  getPopoverUpdateOption,
  getTextBoxBtnTitle,
  getTextBoxPlaceholder,
} from './i18nSelectors';
import './styles.scss';
import { selectCommentListOfferDetail } from './selectors';

function RightContent(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bgColor = useSelector(state => bgColorSelector(state));
  const commentList = useSelector(state => selectCommentListOfferDetail(state));

  const { offerId } = props;
  useEffect(() => {
    dispatch(getCommentListOfferDetail({ offerId }))
  }, [offerId]);

  const [text, setText] = useState('');
  const [sendMode, setSendMode] = useState(SEND_MODE.CREATE);
  const [commentToUpdateId, setCommentToUpdateId] = useState('');

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
          dispatch(postCommentOfferDetail({ offerId, content: contentToSubmit }));
          break;
        case SEND_MODE.UPDATE:
          dispatch(updateCommentOfferDetail({ commentId: commentToUpdateId, content: contentToSubmit }))
          break;
      }
      // Clear text box after creating or updating comments
      setText('');
    }
    return (
      <Button
        className={clsx(
          'offerDetail-discussion-textInputSection-sendBtn',
          !contentToSubmit && 'offerDetail-discussion-textInputSection-sendBtn-disabled'
        )}
        variant="contained"
        // style={{backgroundColor: bgColor}}
        onClick={onClick}
        disabled={!contentToSubmit}
      >
        {getTextBoxBtnTitle(t)}
      </Button>
    );
  }

  function Comment({ id, username, avatarUrl, userType, time, date, content }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const userRole = USER_ROLE(t).find(item => item.type === userType);
    return (
      <div className="offerDetail-comment-container">
        <Avatar className="offerDetail-comment-avatar" src={avatarUrl} />
        <div className="offerDetail-comment-detail-container">
          <div className="offerDetail-comment-title-container">
            <p className="offerDetail-comment-title-username">{username}</p>
            <p className="offerDetail-comment-title-userRole">{userRole.label}</p>
          </div>
          <p className="offerDetail-comment-dateTimePosted">
            {getDiscussionDateTimePosted(t, time, date)}
          </p>
          <p className="offerDetail-comment-content">{content}</p>
        </div>
        <IconButton
          className="offerDetail-comment-moreBtn"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
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
            // Set comment id to update
            setCommentToUpdateId(id);
            // Fill text on Text Field for updating
            setText(content);
          })}
          {renderPopoverOption(getPopoverRemoveOption(t), () => {
            // Hide popup menu
            setAnchorEl(null);
            // Remove comment
            dispatch(removeCommentOfferDetail({ commentId: id }));
          })}
        </Popover>
      </div>
    );
  }

  function renderPopoverOption(title, onClick) {
    return (
      <Typography
        className="offerDetail-comment-popoverOption"
        onClick={onClick}
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
      {commentList.map(cmt => (
        <Comment
          key={cmt.id}
          id={cmt.id}
          username={cmt.user_create.name}
          avatarUrl={cmt.user_create.avatar}
          userType={cmt.user_create.type}
          time={cmt.time_create}
          date={cmt.date_create}
          content={cmt.content}
        />
      ))}
    </div>
  );
}

export default RightContent;
