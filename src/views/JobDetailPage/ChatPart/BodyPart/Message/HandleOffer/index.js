import { getOfferDetail } from 'actions/chat/chat';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const HandleOffer = ({
  offer_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  offer_title,
  handle_status,
  handle_content,
  time_create,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getOfferDetail(taskId, offer_id))
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
      taskName="phê duyệt đề xuất"
    >
      <>
        <div className={clsx("HandleOffer", `HandleOffer__status${handle_status}`)}>
          {handle_status === 0 ? "Đồng ý" : "Từ chối"}
        </div>
        {offer_title}
      </>
    </DialogMessageWrap>
  );
}

HandleOffer.propTypes = {

};

export default HandleOffer;
