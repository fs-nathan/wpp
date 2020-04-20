import { mdiHomeRemove } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CancelPinRemind = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
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
      taskName="bỏ ghim nhắc hẹn lên bảng thảo luận"
    >
      <>
        <Icon className="CancelPinRemind--icon" path={mdiHomeRemove}></Icon>
      </>
    </DialogMessageWrap>
  );
}

CancelPinRemind.propTypes = {

};

export default CancelPinRemind;
