import { useTranslation } from 'react-i18next';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateGroupTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  group_task_name,
  time_create,
}) => {
  const { t } = useTranslation();

  return (
    <DialogMessageWrap
      {...{
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      isHideFooterIcon
      footerText=""
      taskName={t('LABEL_CHAT_TASK_THAY_DOI_NHOM_CONG_VIEC_THANH')}
    >
      <>
        {group_task_name}
      </>
    </DialogMessageWrap>
  );
}

UpdateGroupTask.propTypes = {

};

export default UpdateGroupTask;
