import { useTranslation } from 'react-i18next';
import { showTab, setLocationData } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const ShareLocation = ({
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles,
  time_create,
  chatPosition = "top",
  address,
  lat,
  lng,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    // dispatch(showTab(5))
    dispatch(setLocationData({
      address, date_create: time_create,
      user_share: user_create_name, time_create, lat, lng,
      user_share_avatar: user_create_avatar,
      room: user_create_position, roles: user_create_roles
    }))
  }

  return (
    <DialogMessageWrap
      {...{
        id,
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
