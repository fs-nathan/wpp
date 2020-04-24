import { getRemindDetail } from 'actions/chat/chat';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from 'views/JobDetailPage/TabPart/RemindTab/TabBody/RemindItem';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const HandleRemindTimeDetail = (props) => {
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
      className="HandleRemindTimeDetail"
    >
      <>
        <div className="HandleRemindTimeDetail--timeRemind">
          <div className="HandleRemindTimeDetail--month">
            Tháng {month}
          </div>
          <div className="HandleRemindTimeDetail--day">
            {day}
          </div>
        </div>
        {remind_name}
        <div className="HandleRemindTimeDetail--time">
          {`${typesRemind[remind_type]} lúc ${getUpdateProgressDate(time_create, dateFormat)}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

HandleRemindTimeDetail.propTypes = {

};

export default HandleRemindTimeDetail;
