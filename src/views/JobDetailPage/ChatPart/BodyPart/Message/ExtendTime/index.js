import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const ExtendTime = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();

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
      taskName={t('LABEL_CHAT_TASK_EXTEND_TIME')}
    >
      <>
        <Icon className="ExtendTime--icon" path={mdiTimerOff}></Icon>
        <div className="UpdateTaskNameMessage--content" >{t('LABEL_CHAT_TASK_LUC', { createdAt: time_create })}
        </div>
        <div className="ExtendTime--notify" >
          {"Tiến độ công việc đã được chạy"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

ExtendTime.propTypes = {

};

export default ExtendTime;
