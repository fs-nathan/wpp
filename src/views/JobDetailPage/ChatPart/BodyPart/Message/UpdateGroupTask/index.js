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
      taskName="thay đổi nhóm công việc thành"
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
