import { useTranslation } from 'react-i18next';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { getSubtaskDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CompleteSubtask = ({
  sub_task_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  sub_task_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getSubtaskDetail(taskId, sub_task_id))
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
      taskName={t('LABEL_CHAT_TASK_HOAN_THANH_CONG_VIEC_CON')}
    >
      <>
        <Icon className="CompleteSubtask--icon" path={mdiCheckboxMarkedCircleOutline} color="inherit" />
        {sub_task_name}
      </>
    </DialogMessageWrap>
  );
}

CompleteSubtask.propTypes = {

};

export default CompleteSubtask;
