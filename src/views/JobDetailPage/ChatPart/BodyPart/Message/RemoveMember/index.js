import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import { useDispatch } from 'react-redux';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './styles.scss';

const RemoveMember = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  member_avatar,
  member_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function onClickViewDetail() {
    dispatch(showTab(8))
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
      footerText=""
      actionName={t('LABEL_CHAT_TASK_XOA_THANH_VIEN')}
      newUi={true}
    >
      <div className="RemoveMember--content" onClick={onClickViewDetail}>
        <Avatar className="RemoveMember--avatar" src={member_avatar} />
        <span className="member-name">{member_name}</span>
        <ArrowForwardIosIcon className="icon-view-more" />
      </div>
    </DialogMessageWrap>
  );
}

RemoveMember.propTypes = {

};

export default RemoveMember;
