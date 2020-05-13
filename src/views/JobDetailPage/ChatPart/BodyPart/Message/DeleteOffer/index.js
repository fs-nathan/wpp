import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const DeleteOffer = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  offer_content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();

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
      taskName={t('LABEL_CHAT_TASK_XOA_DE_XUAT')}
    >
      <>
        {offer_content}
      </>
    </DialogMessageWrap>
  );
}

DeleteOffer.propTypes = {

};

export default DeleteOffer;
