import { useTranslation } from 'react-i18next';
import { loadDetailOffer } from 'views/OfferPage/redux/actions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';
import { setOpenDetailOffer } from 'actions/taskDetail/taskDetailActions';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(loadDetailOffer({ id: offer_id }))
    dispatch(setOpenDetailOffer(true))
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
      taskName={t('LABEL_CHAT_TASK_PHE_DUYET_DE_XUAT')}
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
