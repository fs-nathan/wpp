import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateRoleMember = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  member_name,
  member_avatar,
  time_create,
  roles,
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
      onClickViewDetail={onClickViewDetail}
      taskName={t('LABEL_CHAT_TASK_THAY_DOI_VAI_TRO_THANH_VIEN')}
    >
      <div className="UpdateRoleMember--content" >
        <Avatar className="UpdateRoleMember--avatar" src={member_avatar} />
        {`${member_name} - ${roles.join(' - ')}`}
      </div>
    </DialogMessageWrap>
  );
}

UpdateRoleMember.propTypes = {

};

export default UpdateRoleMember;
