import { useTranslation } from 'react-i18next';
import { mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const PinTask = ({
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
      taskName={t('LABEL_CHAT_TASK_GHIM_CONG_VIEC')}
    >
      <>
        <Icon className="PinTask--icon" path={mdiPin}></Icon>
      </>
    </DialogMessageWrap>
  );
}

PinTask.propTypes = {

};

export default PinTask;
