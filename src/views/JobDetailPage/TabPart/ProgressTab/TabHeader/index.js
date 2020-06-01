import { useTranslation } from 'react-i18next';
import { getTrackingTime, getTrackingTimeComplete } from 'actions/taskDetail/taskDetailActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import ProgressModal from '../ProgressModal';
import get from 'lodash/get';

function TabHeader({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const {
    update_duration,
  } = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));

  useEffect(() => {
    dispatch(getTrackingTime(taskId))
    dispatch(getTrackingTimeComplete(taskId))
  }, [dispatch, taskId])

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (!update_duration) return;
    setOpen(true);
  };
  function onClickBack() {
    setShow(0)
  }

  return (
    <div className="container-progress-tabheader">
      <HeaderTab title={t('LABEL_CHAT_TASK_TIEN_DO_CONG_VIEC')}
        onClickBack={onClickBack}
        onClickOpen={handleClickOpen}
        rightIcon="settings"
      />
      <ProgressModal isOpen={open} setOpen={setOpen} />
    </div>
  );
}

export default TabHeader;
