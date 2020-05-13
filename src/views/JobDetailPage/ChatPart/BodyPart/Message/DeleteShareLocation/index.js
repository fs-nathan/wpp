import { mdiMapMarkerRemoveOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const DeleteShareLocation = ({
  command_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  address,
  command_type,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
      footerText=""
      taskName={t('LABEL_CHAT_TASK_HUY_BO_CHIA_SE_VI_TRI')}
      onClickViewDetail={onClickViewDetail}
    >
      <>
        <Icon path={mdiMapMarkerRemoveOutline} className="DeleteShareLocation--icon" />
        <div className="DeleteShareLocation--location">
          {address}
        </div>
      </>
    </DialogMessageWrap>
  );
}

DeleteShareLocation.propTypes = {

};

export default DeleteShareLocation;
