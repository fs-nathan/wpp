import { useTranslation } from 'react-i18next';
import { getOfferDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CreateOffer = ({
  offer_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  offer_title,
  offer_content,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
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
      taskName={t('LABEL_CHAT_TASK_TAO_DE_XUAT')}
    >
      <>
        {offer_title || offer_content}
      </>
    </DialogMessageWrap>
  );
}

CreateOffer.propTypes = {

};

export default CreateOffer;
