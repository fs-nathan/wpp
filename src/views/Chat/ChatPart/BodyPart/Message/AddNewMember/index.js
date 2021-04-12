import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const AddNewMember = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  member_name,
  member_avatar,
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
      onClickViewDetail={onClickViewDetail}
      taskName={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
    >
      <div className="AddNewMember--content" >
        <Avatar className="AddNewMember--avatar" src={member_avatar} />
        {member_name}
      </div>
    </DialogMessageWrap>
  );
}

AddNewMember.propTypes = {

};

export default AddNewMember;
