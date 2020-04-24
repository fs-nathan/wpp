import { getRemindDetail } from 'actions/chat/chat';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from 'views/JobDetailPage/TabPart/RemindTab/TabBody/RemindItem';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const RemindMessage = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const {
    remind_id,
    remind_type,
    user_create_name,
    user_create_avatar,
    user_create_position,
    remind_name,
    time_create,
    chatPosition = "top",
  } = props;

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
      }}
      isHaveFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName="tạo Nhắc hẹn"
    >
      <>
        {remind_name}
        <div className="RemindMessage--time">
          {`${typesRemind[remind_type]} lúc ${getUpdateProgressDate(time_create, dateFormat)}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

RemindMessage.propTypes = {

};

export default RemindMessage;
