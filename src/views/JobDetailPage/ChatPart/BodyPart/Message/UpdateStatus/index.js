import { useTranslation } from 'react-i18next';
import { mdiTransferRight } from '@mdi/js';
import Icon from '@mdi/react';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateStatus = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  old_status_name,
  old_status_code,
  time_create,
  new_status_name,
  new_status_code,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function onClickViewDetail() {
    
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
      isHideFooterIcon={true}
      footerText=""
      onClickViewDetail={onClickViewDetail}
      taskName={t('LABEL_CHAT_TASK_CAP_NHAT_TRANG_THAI_CONG_VIEC')}
    >
      <div className="UpdateStatus--content" >
        <div className={`UpdateStatus--label UpdateStatus--label-${old_status_code}`} >
          {old_status_name}
        </div>
        <Icon className="UpdateStatus--icon" path={mdiTransferRight}></Icon>
        <div className={`UpdateStatus--label UpdateStatus--label-${new_status_code}`} >
          {new_status_name}
        </div>
      </div>
    </DialogMessageWrap>
  );
}

UpdateStatus.propTypes = {

};

export default UpdateStatus;
