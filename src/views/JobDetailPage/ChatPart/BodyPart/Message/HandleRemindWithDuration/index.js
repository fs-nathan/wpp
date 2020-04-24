import { getRemindDetail } from 'actions/chat/chat';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from 'views/JobDetailPage/TabPart/RemindTab/TabBody/RemindItem';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const HandleRemindWithDuration = (props) => {
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

  const time = new Date(remind_time)
  const month = time.getMonth() + 1
  const day = time.getDate()

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      isHaveFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName=""
      titleHeader="Nhắc hẹn"
      className="HandleRemindWithDuration"
    >
      <>
        <div className="HandleRemindWithDuration--timeRemind">
          <div className="HandleRemindWithDuration--month">
            Tiến độ đạt
          </div>
          <div className="HandleRemindWithDuration--percent">
            {day}
          </div>
        </div>
        {remind_name}
        <div className="HandleRemindWithDuration--time">
          {`${typesRemind[remind_type]} lúc ${getUpdateProgressDate(time_create, dateFormat)}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

HandleRemindWithDuration.propTypes = {

};

export default HandleRemindWithDuration;
