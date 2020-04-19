import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const DeleteCommandDecided = ({
  command_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  command_content,
  command_type,
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
      taskName={command_type === 0 ? "xoá chỉ đạo" : "xoá quyết định"}
    >
      <>
        {command_content}
      </>
    </DialogMessageWrap>
  );
}

DeleteCommandDecided.propTypes = {

};

export default DeleteCommandDecided;
