import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const UpdateTaskNameMessage = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
  time_create,
  chatPosition = "top",
  title = "Đổi tên công việc"
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
      actionName={t('LABEL_CHAT_TASK_CHINH_SUA_TEN_MO_TA_CONG_VIEC')}
      newUi={true}
    >
      <div className="UpdateTaskNameMessage--content">
         <span className="member-name">{new_task_name}</span>
      </div>
    </DialogMessageWrap>
  );
}

UpdateTaskNameMessage.propTypes = {
  new_task_name: PropTypes.string,

};

export default UpdateTaskNameMessage;
