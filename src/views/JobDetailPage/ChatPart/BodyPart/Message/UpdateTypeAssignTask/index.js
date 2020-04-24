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
      taskName="thay đổi hình thức giao việc thành"
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
