import { useTranslation } from 'react-i18next';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateTypeAssignTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  type_assign_name,
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
      taskName={t('LABEL_CHAT_TASK_THAY_DOI_HINH_THUC')}
    >
      <>
        {type_assign_name}
      </>
    </DialogMessageWrap>
  );
}

UpdateTypeAssignTask.propTypes = {

};

export default UpdateTypeAssignTask;
