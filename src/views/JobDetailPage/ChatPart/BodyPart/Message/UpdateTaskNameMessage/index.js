import PropTypes from 'prop-types';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateTaskNameMessage = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
  time_create,
  chatPosition = "top",
  title = "Đổi tên công việc"
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
      taskName="Chỉnh sửa tên, mô tả công việc"
    >
      <>
        {new_task_name}
      </>
    </DialogMessageWrap>
  );
}

UpdateTaskNameMessage.propTypes = {
  new_task_name: PropTypes.string,

};

export default UpdateTaskNameMessage;
