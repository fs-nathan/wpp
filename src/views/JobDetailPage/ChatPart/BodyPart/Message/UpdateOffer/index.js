import { useTranslation } from 'react-i18next';
import { loadDetailOffer } from 'views/OfferPage/redux/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';
import { setOpenDetailOffer } from 'actions/taskDetail/taskDetailActions';

const UpdateOffer = ({
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
      taskName={t('LABEL_CHAT_TASK_CHINH_SUA_DE_XUAT')}
    >
      <>
        {offer_title || offer_content}
      </>
    </DialogMessageWrap>
  );
}

UpdateOffer.propTypes = {

};

export default UpdateOffer;
