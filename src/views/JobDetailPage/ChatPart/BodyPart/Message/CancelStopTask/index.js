import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { getDialogDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CancelStopTask = ({
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
      taskName={t('LABEL_CHAT_TASK_HUY_BO_TAM_DUNG')}
    >
      <>
        <Icon className="CancelStopTask--icon" path={mdiTimer}></Icon>
        <div className="StopTask--content" >
          {getDialogDate(time_create, dateFormat)}
        </div>
        <div className="StopTask--notify" >
          {t('LABEL_CHAT_TASK_TIEN_DO_CONG_VIEC_DA_DUOC_CHAY')}
        </div>
      </>
    </DialogMessageWrap>
  );
}

CancelStopTask.propTypes = {

};

export default CancelStopTask;
