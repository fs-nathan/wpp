import { useTranslation } from 'react-i18next';
import { getRemindDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CreateRemindWithDuration = (props) => {
  const { t } = useTranslation();
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
      taskName={t('LABEL_CHAT_TASK_TAO_NHAC_HEN_THEO_TIEN_DO')}
      className="CreateRemindWithDuration"
    >
      <>
        {remind_name}
        <div className="CreateRemindWithDuration--title">{t('LABEL_CHAT_TASK_KHI_TIEN_DO_KE_HOACH_DAT_MOC')}</div>
        <div className="CreateRemindWithDuration--percent">
          {remind_duration.map(pc =>
            (<div
              className="CreateRemindWithDuration--duration"
              key={pc}>{`${pc}%`}
            </div>))}
        </div>
      </>
    </DialogMessageWrap>
  );
}

CreateRemindWithDuration.propTypes = {

};

export default CreateRemindWithDuration;
