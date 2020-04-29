import { useTranslation } from 'react-i18next';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const ShareLocation = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  sub_task_name,
  time_create,
  sub_task_id,
  chatPosition = "top",
  address,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(showTab(5))
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
      taskName={t('LABEL_CHAT_TASK_CHIA_SE_VI_TRI')}
      className="ShareLocation"
    >
      <>
        <div className="ShareLocation--imageWrap">
          <img className="ShareLocation--image" src="/images/bg_map.png" alt="map" />
          <div className="ShareLocation--location">
            {address}
          </div>
        </div>
      </>
    </DialogMessageWrap>
  );
}

ShareLocation.propTypes = {

};

export default ShareLocation;
