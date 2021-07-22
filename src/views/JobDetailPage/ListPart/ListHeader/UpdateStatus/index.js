import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';
import CustomModal from 'components/CustomModal';
import {
  updateTaskStatus
} from 'actions/taskDetail/taskDetailActions'
import {useDispatch} from 'react-redux';
import {
  CustomEventDispose,
  CustomEventListener,
  UPDATE_STATUS_TASK
} from 'constants/events';

function UpdateTaskStatus({
  isOpen,
  setOpen,
  taskId,
  oldStatus,
  isStop
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [newStatus, setNewStatus] = React.useState(oldStatus)
  const [loading, setLoading] = React.useState(false)

  const confirmChangeStatus = () => {
    if (isStop) {
      dispatch(updateTaskStatus({task_id: taskId, status: newStatus, from_view: "Table"}))
      setLoading(true)
    } else {
      if (newStatus !== oldStatus) {
        dispatch(updateTaskStatus({task_id: taskId, status: newStatus, from_view: "Table"}))
        setLoading(true)
      } else {
        setOpen(false)
        setLoading(false)
      }
    }
  }
  React.useEffect(() => {
    function finishUpdate() {
      setOpen(false)
      setLoading(false)
    }
    CustomEventListener(UPDATE_STATUS_TASK, finishUpdate);
    return () => {
      CustomEventDispose(UPDATE_STATUS_TASK, finishUpdate);
    }
  }, []);

  return (
    <CustomModal
      title={t("LABEL_UPDATE_TASK_STATUS")}
      open={isOpen}
      setOpen={setOpen}
      canConfirm={true}
      onConfirm={() => confirmChangeStatus()}
      onCancle={() => setOpen(false)}
      height='miniWide'
      maxWidth='sm'
      actionLoading={loading}
      className="update-task-status"
      manualClose={true}
    >
      <div className="list-option">
        <div className={`per-option per-option-waiting ${newStatus === 0 ? "active": ""}`} onClick={() => setNewStatus(0)}>
          Đang chờ
        </div>
        <div className={`per-option per-option-doing ${newStatus === 1 ? "active": ""}`} onClick={() => setNewStatus(1)}>
          Đang làm
        </div>
        <div className={`per-option per-option-complete ${newStatus === 2 ? "active": ""}`} onClick={() => setNewStatus(2)}>
          Hoàn thành
        </div>
      </div>
    </CustomModal>
  );
}

export default UpdateTaskStatus;
