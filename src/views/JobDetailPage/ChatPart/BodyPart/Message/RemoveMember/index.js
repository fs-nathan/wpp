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
      taskName="xoá thành viên"
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
