import { mdiTransferRight } from '@mdi/js';
import Icon from '@mdi/react';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateComplete = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  priority_name,
  time_create,
  old_complete = 0,
  complete,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(1))
  }

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
      onClickViewDetail={onClickViewDetail}
      taskName="Cập nhật tiến độ hoàn thành"
    >
      <div className="UpdateComplete--content" >
        <div className="UpdateComplete--circle" >
          {old_complete}%
        </div>
        <Icon className="UpdateComplete--icon" path={mdiTransferRight}></Icon>
        <div className="UpdateComplete--circle" >
          {complete}%
        </div>
      </div>
    </DialogMessageWrap>
  );
}

UpdateComplete.propTypes = {

};

export default UpdateComplete;
