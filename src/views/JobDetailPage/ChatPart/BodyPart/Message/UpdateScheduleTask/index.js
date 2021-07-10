import { useTranslation } from 'react-i18next';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateScheduleTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  schedule_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(0))
  }

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      isHideFooterIcon
      footerText=""
      onClickViewDetail={onClickViewDetail}
      actionName={t('LABEL_CHAT_TASK_THAY_DOI_LICH_LAM_VIEC')}
      newUi={true}
    >
      <div className="UpdateScheduleTask--content">
         <span className="member-name">{schedule_name}</span>
      </div>
    </DialogMessageWrap>
  );
}

UpdateScheduleTask.propTypes = {

};

export default UpdateScheduleTask;
