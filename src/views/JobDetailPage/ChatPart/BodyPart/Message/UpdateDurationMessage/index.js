import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateDurationMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  new_task_name,
  time_changes = [],
  time_create,
  chat_parent,
  isReply,
  is_me,
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
      taskName="điều chỉnh tiến độ thực hiện"
    >
      <>
        <div className="UpdateDurationMessage--title" >
          Bắt đầu
      </div>
        <div className="UpdateDurationMessage--content" >
          {time_changes[0] && `Từ ${time_changes[0].old} sang ${time_changes[0].new}`}
        </div>
        <div className="UpdateDurationMessage--title" >
          Kết thúc
      </div>
        <div className="UpdateDurationMessage--content" >
          {time_changes[1] && `Từ ${time_changes[1].old} sang ${time_changes[1].new}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

UpdateDurationMessage.propTypes = {

};

export default UpdateDurationMessage;
