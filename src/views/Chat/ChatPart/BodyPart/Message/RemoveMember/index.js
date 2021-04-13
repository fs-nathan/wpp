import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const RemoveMember = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  member_avatar,
  member_name,
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
      taskName={t('LABEL_CHAT_TASK_XOA_THANH_VIEN')}
    >
      <div className="RemoveMember--content" >
        <Avatar className="RemoveMember--avatar" src={member_avatar} />
        {member_name}
      </div>
    </DialogMessageWrap>
  );
}

RemoveMember.propTypes = {

};

export default RemoveMember;
