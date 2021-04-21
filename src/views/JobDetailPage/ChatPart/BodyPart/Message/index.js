import * as fileType from 'assets/fileType';
import { FileType } from 'components/FileType';
import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import { getFileType } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import AddNewMember from './AddNewMember';
import CancelPinRemind from './CancelPinRemind';
import CancelPinTask from './CancelPinTask';
import CancelStopTask from './CancelStopTask';
import ChatSticker from './ChatSticker';
import CompleteSubtask from './CompleteSubtask';
import CreateCommandDecided from './CreateCommandDecided';
import CreateNewSubTask from './CreateNewSubTask';
import CreateOffer from './CreateOffer';
import CreateRemindWithDuration from './CreateRemindWithDuration';
import DeleteCommandDecided from './DeleteCommandDecided';
import DeleteFile from './DeleteFile';
import DeleteOffer from './DeleteOffer';
import DeleteRemind from './DeleteRemind';
import DeleteShareLocation from './DeleteShareLocation';
import DeleteSubTask from './DeleteSubTask';
import EditPriority from './EditPriority';
import ExtendTime from './ExtendTime';
import FileMessage from './FileMessage';
import HandleOffer from './HandleOffer';
import HandleRemindTimeDetail from './HandleRemindTimeDetail';
import HandleRemindWithDuration from './HandleRemindWithDuration';
import ImageMessage from './ImageMessage';
import PinRemind from './PinRemind';
import PinTask from './PinTask';
import QuickLike from './QuickLike';
import RemindMessage from './RemindMessage';
import RemoveMember from './RemoveMember';
import ShareLocation from './ShareLocation';
import StopTask from './StopTask';
import TextMessage from './TextMessage';
import UpdateCommandDecided from './UpdateCommandDecided';
import UpdateComplete from './UpdateComplete';
import UpdateDurationMessage from './UpdateDurationMessage';
import UpdateGroupTask from './UpdateGroupTask';
import UpdateOffer from './UpdateOffer';
import UpdateRemind from './UpdateRemind';
import UpdateRoleMember from './UpdateRoleMember';
import UpdateScheduleTask from './UpdateScheduleTask';
import UpdateSubtask from './UpdateSubtask';
import UpdateTaskNameMessage from './UpdateTaskNameMessage';
import UpdateTypeAssignTask from './UpdateTypeAssignTask';
import UpdateStatus from './UpdateStatus';

const Message = props => {
  if (props.type === undefined) return null;
  switch (props.type) {
    case CHAT_TYPE.TEXT:
      return <TextMessage {...props} />;
    case CHAT_TYPE.FILE:
    case CHAT_TYPE.CHAT_FORWARD_FILE:
    case CHAT_TYPE.CHAT_FILE_FROM_GOOGLE_DRIVER:
      return <FileMessage {...props} />;
    case CHAT_TYPE.IMAGE:
      const files = props.images;
      if (files.length === 1 && files[0].media_type === 1)
        return <FileMessage {...props} files={files} />;
      return <ImageMessage {...props} isUploading={false} />;
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
    case CHAT_TYPE.DELETE_OFFER_HANDLE:
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
      return <HandleRemindTimeDetail {...props} />;
    case CHAT_TYPE.SHARE_FILE:
      return <FileMessage {...props} />;
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
      return <PinTask {...props} />;
    case CHAT_TYPE.CANCEL_PIN_TASK:
      return <CancelPinTask {...props} />;
    case CHAT_TYPE.STOP_TASK:
      return <StopTask {...props} />;
    case CHAT_TYPE.CANCEL_STOP_TASK:
      return <CancelStopTask {...props} />;
    case CHAT_TYPE.PIN_REMIND:
      return <PinRemind {...props} />;
    case CHAT_TYPE.CANCEL_PIN_REMIND:
      return <CancelPinRemind {...props} />;
    case CHAT_TYPE.CHAT_STICKER:
      return <ChatSticker {...props} />;
    case CHAT_TYPE.QUICK_LIKE:
      return <QuickLike {...props} />;
    case CHAT_TYPE.UPDATE_GROUP_TASK:
      return <UpdateGroupTask {...props} />;
    case CHAT_TYPE.UPDATE_TYPE_ASSIGN_TASK:
      return <UpdateTypeAssignTask {...props} />;
    case CHAT_TYPE.UPDATE_SCHEDULE_TASK:
      return <UpdateScheduleTask {...props} />;
    case CHAT_TYPE.DELETE_SHARE_LOCATION:
      return <DeleteShareLocation {...props} />;
    case CHAT_TYPE.UPDATE_SUBTASK:
      return <UpdateSubtask {...props} />;
    case CHAT_TYPE.UPDATE_REMIND:
      return <UpdateRemind {...props} />;
    case CHAT_TYPE.UPDATE_OFFER:
      return <UpdateOffer {...props} />;
    case CHAT_TYPE.UPDATE_COMMAND_DECIDED:
      return <UpdateCommandDecided {...props} />;
    case CHAT_TYPE.UPDATE_ROLE_MEMBER:
      return <UpdateRoleMember {...props} />;
    case CHAT_TYPE.HANDLE_REMIND_WITH_DURATION:
      return <HandleRemindWithDuration {...props} />;
    case CHAT_TYPE.CREATE_REMIND_WITH_DURATION:
      return <CreateRemindWithDuration {...props} />;
    case CHAT_TYPE.UPLOADING_IMAGES:
      return <ImageMessage {...props} />;
    case CHAT_TYPE.UPLOADING_FILE:
      return <FileMessage {...props} />;
    case CHAT_TYPE.DATE_TIME_CHAT_HISTORY:
      return <div className="wrap-time">
        <div className="time">{props.time_create}</div>
      </div>;
    case CHAT_TYPE.UPDATE_STATUS_TASK:
      return <UpdateStatus {...props} />;
    default:
      return <div>Tin nhắn này bị lỗi hiển thị</div>;
  }
};

export default Message