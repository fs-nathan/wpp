import { showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const EditPriority = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  priority_name,
  time_create,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(0))
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
      onClickViewDetail={onClickViewDetail}
      taskName={t('LABEL_CHAT_TASK_THAY_DOI_MUC_DO_UU_TIEN')}
    >
      <>
        <div className={clsx("EditPriority--priority", `EditPriority--priority__${priority_name}`)} >
          {priority_name}
        </div>
        {/* <Icon className="EditPriority--icon" path={mdiTransferRight}></Icon>
        <div className={clsx("EditPriority--priority", `EditPriority--priority__${priority_name}`)} >
          <div>{priority_name}</div>
        </div> */}
      </>
    </DialogMessageWrap>
  );
}

EditPriority.propTypes = {

};

export default EditPriority;
