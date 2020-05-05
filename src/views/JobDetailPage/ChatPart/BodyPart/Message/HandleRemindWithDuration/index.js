import { useTranslation } from 'react-i18next';
import { getRemindDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const HandleRemindWithDuration = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  const {
    remind_id,
    remind_name,
    time_create,
    handle_duration,
  } = props;

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      {...{
        time_create,
      }}
      isHaveFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName=""
      titleHeader="Nhắc hẹn"
      className="HandleRemindWithDuration"
    >
      <>
        <div className="HandleRemindWithDuration--timeRemind">
          <div className="HandleRemindWithDuration--title">{t('LABEL_CHAT_TASK_TIEN_DO_KE_HOACH_DAT')}</div>
          <div className="HandleRemindWithDuration--percent">
            {`${handle_duration}%`}
          </div>
        </div>
        {remind_name}
      </>
    </DialogMessageWrap>
  );
}

HandleRemindWithDuration.propTypes = {

};

export default HandleRemindWithDuration;
