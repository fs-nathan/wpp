import { useTranslation } from 'react-i18next';
import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import { getDialogDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const StopTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dateFormat = useSelector(state => state.system.profile.format_date);

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
      }}
      isHideFooterIcon
      footerText=""
      taskName={t('LABEL_CHAT_TASK_TAM_DUNG_CONG_VIEC')}
    >
      <>
        <Icon className="StopTask--icon" path={mdiTimerOff}></Icon>
        <div className="StopTask--content" >
          {getDialogDate(time_create, dateFormat)}
        </div>
        <div className="StopTask--notify" >
          {"Tiến độ công việc sẽ được tính khi huỷ bỏ tạm dừng!"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

StopTask.propTypes = {

};

export default StopTask;
