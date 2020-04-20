import { mdiTransferRight } from '@mdi/js';
import Icon from '@mdi/react';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const EditPriority = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  priority_name,
  time_create,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(0))
  }

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
      }}
      isHideFooterIcon
      footerText=""
      onClickViewDetail={onClickViewDetail}
      taskName="Thay đổi mức độ ưu tiên"
    >
      <>
        <div className={clsx("EditPriority--priority", `EditPriority--priority__${priority_name}`)} >
          <div>{priority_name}</div>
        </div>
        <Icon className="EditPriority--icon" path={mdiTransferRight}></Icon>
        <div className={clsx("EditPriority--priority", `EditPriority--priority__${priority_name}`)} >
          <div>{priority_name}</div>
        </div>
      </>
    </DialogMessageWrap>
  );
}

EditPriority.propTypes = {

};

export default EditPriority;
