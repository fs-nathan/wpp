import { useTranslation } from 'react-i18next';
import { getRemindDetail } from 'actions/chat/chat';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from 'views/JobDetailPage/TabPart/RemindTab/TabBody/RemindItem';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateRemind = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const {
    remind_id,
    remind_type,
    user_create_name,
    user_create_avatar,
    user_create_position,
    remind_name,
    time_create,
    chatPosition = "top",
  } = props;

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
      }}
      isHaveFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName={t('LABEL_CHAT_TASK_CHINH_SUA_NHAC_HEN')}
    >
      <>
        {remind_name}
        <div className="UpdateRemind--time">
          {`${typesRemind[remind_type]} lúc ${getUpdateProgressDate(time_create, dateFormat)}`}
        </div>
      </>
    </DialogMessageWrap>
  );
}

UpdateRemind.propTypes = {

};

export default UpdateRemind;
