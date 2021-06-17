import { useTranslation } from 'react-i18next';
import React from 'react';

const LeaveGroup = ({
  user_create_name,
  user_create_avatar,
  time_create
}) => {
  const { t } = useTranslation();

  return (
    <div className="section-chat-leave-group" title={time_create}>
      <img src={user_create_avatar} />
      <span>{t("LABEL_MEMBER_LEAVE_GROUP_CHAT", {member_name: user_create_name})}</span>
    </div>
  );
}

LeaveGroup.propTypes = {

};

export default LeaveGroup;
