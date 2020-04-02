import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import React from 'react';
import FileMessage from './FileMessage';
import ImageMessage from './ImageMessage';
import RemindMessage from './RemindMessage';
import TextMessage from './TextMessage';

const Message = props => {
  if (props.type === undefined) return null;
  switch (props.type) {
    case CHAT_TYPE.TEXT:
      return <TextMessage {...props} />;
    case CHAT_TYPE.FILE:
      return <FileMessage {...props} />;
    case CHAT_TYPE.IMAGE:
      return <ImageMessage {...props} />;
    case CHAT_TYPE.UPDATE_TASK_NAME:
      return <TextMessage {...props} />;
    case CHAT_TYPE.UPDATE_DURATION:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CREATE_NEW_SUB_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.DELETE_SUB_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CREATE_REMIND:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.DELETE_REMIND:
      return <TextMessage {...props} />;
    case CHAT_TYPE.SHARE_LOCATION:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CREATE_OFFER:
      return <TextMessage {...props} />;
    case CHAT_TYPE.DELETE_OFFER:
      return <TextMessage {...props} />;
    case CHAT_TYPE.HANDLE_OFFER:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CREATE_COMMAND_DECIDED:
      return <TextMessage {...props} />;
    case CHAT_TYPE.DELETE_COMMAND_DECIDED:
      return <TextMessage {...props} />;
    case CHAT_TYPE.ADD_NEW_MEMBER:
      return <TextMessage {...props} />;
    case CHAT_TYPE.REMOVE_MEMBER:
      return <TextMessage {...props} />;
    case CHAT_TYPE.HANDLE_REMIND:
      return <TextMessage {...props} />;
    case CHAT_TYPE.SHARE_FILE:
      return <TextMessage {...props} />;
    case CHAT_TYPE.EDIT_PRIORITY:
      return <TextMessage {...props} />;
    case CHAT_TYPE.EXTEND_TIME:
      return <TextMessage {...props} />;
    case CHAT_TYPE.UPDATE_COMPLETE:
      return <TextMessage {...props} />;
    case CHAT_TYPE.COMPLETE_SUBTASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.DELETE_FILE:
      return <TextMessage {...props} />;
    case CHAT_TYPE.PIN_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CANCEL_PIN_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.STOP_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.CANCEL_STOP_TASK:
      return <TextMessage {...props} />;
    case CHAT_TYPE.PIN_REMIND:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.CANCEL_PIN_REMIND:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.CHAT_STICKER:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.CHAT_FORWARD_FILE:
      return <RemindMessage {...props} />;
    default:
      return <div>Tin nhắn này bị lỗi hiển thị</div>;
  }
};

export default Message