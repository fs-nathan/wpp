import { getRemindDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CreateRemindWithDuration = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const {
    remind_id,
    user_create_name,
    user_create_avatar,
    user_create_position,
    remind_name,
    time_create,
    remind_duration = [],
  } = props;

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      {...{
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
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
            {remind_duration.map(pc => (<div key={pc}>{pc}</div>))}
          </div>
        </div>
        {remind_name}
      </>
    </DialogMessageWrap>
  );
}

CreateRemindWithDuration.propTypes = {

};

export default CreateRemindWithDuration;
