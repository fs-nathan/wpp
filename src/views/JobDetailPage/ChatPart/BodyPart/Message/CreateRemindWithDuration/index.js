import { getRemindDetail } from 'actions/chat/chat';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from 'views/JobDetailPage/TabPart/RemindTab/TabBody/RemindItem';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CreateRemindWithDuration = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const {
    remind_id,
    remind_type,
    remind_name,
    time_create,
    remind_time,
  } = props;

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      isHaveFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName="tạo Nhắc hẹn theo tiến độ"
      className="CreateRemindWithDuration"
    >
      <>
        <div className="CreateRemindWithDuration--timeRemind">
          <div className="CreateRemindWithDuration--month">
            Khi Tiến độ kế hoạch đạt mốc
          </div>
          <div className="CreateRemindWithDuration--percent">
            {remind_time}
          </div>
        </div>
        {remind_name}
        <div className="CreateRemindWithDuration--time">
          {`${typesRemind[remind_type]} lúc ${getUpdateProgressDate(time_create, dateFormat)}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

CreateRemindWithDuration.propTypes = {

};

export default CreateRemindWithDuration;
