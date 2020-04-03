import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import React from 'react';
import AddNewMember from './AddNewMember';
import CancelStopTask from './CancelStopTask';
import ChatForwardFile from './ChatForwardFile';
import ChatSticker from './ChatSticker';
import CompleteSubtask from './CompleteSubtask';
import CreateCommandDecided from './CreateCommandDecided';
import CreateNewSubTask from './CreateNewSubTask';
import CreateOffer from './CreateOffer';
import DeleteCommandDecided from './DeleteCommandDecided';
import DeleteFile from './DeleteFile';
import DeleteOffer from './DeleteOffer';
import DeleteRemind from './DeleteRemind';
import DeleteSubTask from './DeleteSubTask';
import EditPriority from './EditPriority';
import ExtendTime from './ExtendTime';
import FileMessage from './FileMessage';
import HandleOffer from './HandleOffer';
import HandleRemind from './HandleRemind';
import ImageMessage from './ImageMessage';
import RemindMessage from './RemindMessage';
import RemoveMember from './RemoveMember';
import ShareFile from './ShareFile';
import ShareLocation from './ShareLocation';
import StopTask from './StopTask';
import TextMessage from './TextMessage';
import UpdateComplete from './UpdateComplete';
import UpdateDurationMessage from './UpdateDurationMessage';
import UpdateTaskNameMessage from './UpdateTaskNameMessage';

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
      return <UpdateTaskNameMessage {...props} />;
    case CHAT_TYPE.UPDATE_DURATION:
      return <UpdateDurationMessage {...props} />;
    case CHAT_TYPE.CREATE_NEW_SUB_TASK:
      return <CreateNewSubTask {...props} />;
    case CHAT_TYPE.DELETE_SUB_TASK:
      return <DeleteSubTask {...props} />;
    case CHAT_TYPE.CREATE_REMIND:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.DELETE_REMIND:
      return <DeleteRemind {...props} />;
    case CHAT_TYPE.SHARE_LOCATION:
      return <ShareLocation {...props} />;
    case CHAT_TYPE.CREATE_OFFER:
      return <CreateOffer {...props} />;
    case CHAT_TYPE.DELETE_OFFER:
      return <DeleteOffer {...props} />;
    case CHAT_TYPE.HANDLE_OFFER:
      return <HandleOffer {...props} />;
    case CHAT_TYPE.CREATE_COMMAND_DECIDED:
      return <CreateCommandDecided {...props} />;
    case CHAT_TYPE.DELETE_COMMAND_DECIDED:
      return <DeleteCommandDecided {...props} />;
    case CHAT_TYPE.ADD_NEW_MEMBER:
      return <AddNewMember {...props} />;
    case CHAT_TYPE.REMOVE_MEMBER:
      return <RemoveMember {...props} />;
    case CHAT_TYPE.HANDLE_REMIND:
      return <HandleRemind {...props} />;
    case CHAT_TYPE.SHARE_FILE:
      return <ShareFile {...props} />;
    case CHAT_TYPE.EDIT_PRIORITY:
      return <EditPriority {...props} />;
    case CHAT_TYPE.EXTEND_TIME:
      return <ExtendTime {...props} />;
    case CHAT_TYPE.UPDATE_COMPLETE:
      return <UpdateComplete {...props} />;
    case CHAT_TYPE.COMPLETE_SUBTASK:
      return <CompleteSubtask {...props} />;
    case CHAT_TYPE.DELETE_FILE:
      return <DeleteFile {...props} />;
    case CHAT_TYPE.PIN_TASK:
      return <UpdateTaskNameMessage {...props} new_task_name={props.content} title="Ghim công việc" />;
    case CHAT_TYPE.CANCEL_PIN_TASK:
      return <UpdateTaskNameMessage {...props} new_task_name={props.content} title="Đã bỏ Ghim công việc" />;
    case CHAT_TYPE.STOP_TASK:
      return <StopTask {...props} />;
    case CHAT_TYPE.CANCEL_STOP_TASK:
      return <CancelStopTask {...props} />;
    case CHAT_TYPE.PIN_REMIND:
      return <UpdateTaskNameMessage {...props} new_task_name={props.content} title="Ghim nhắc hẹn" />;
    case CHAT_TYPE.CANCEL_PIN_REMIND:
      return <UpdateTaskNameMessage {...props} new_task_name={props.content} title="Đã bỏ Ghim nhắc hẹn" />;
    case CHAT_TYPE.CHAT_STICKER:
      return <ChatSticker {...props} />;
    case CHAT_TYPE.CHAT_FORWARD_FILE:
      return <ChatForwardFile {...props} />;
    default:
      return <div>Tin nhắn này bị lỗi hiển thị</div>;
  }
};

export default Message