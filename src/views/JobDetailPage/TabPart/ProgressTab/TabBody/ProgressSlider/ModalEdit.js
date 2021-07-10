import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import CustomModal from 'components/CustomModal';
import {
  updateComplete
} from 'actions/taskDetail/taskDetailActions'
import {useDispatch} from 'react-redux';
import {
  CustomEventDispose,
  CustomEventListener,
  UPDATE_COMPLETE_TASK
} from 'constants/events';
import { Slider } from '@material-ui/core';

function UpdateCompleteTask({
  isOpen,
  setOpen,
  taskId,
  oldComplete
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [newComplete, setNewComplete] = React.useState(oldComplete)
  const [loading, setLoading] = React.useState(false)

  const confirmChangeStatus = () => {
    dispatch(updateComplete({
      data: {task_id: taskId, complete: newComplete, from_view: "Table"}
    }))
    setLoading(true)
  }
  React.useEffect(() => {
    function finishUpdate() {
      setOpen(false)
      setLoading(false)
    }
    CustomEventListener(UPDATE_COMPLETE_TASK, finishUpdate);
    return () => {
      CustomEventDispose(UPDATE_COMPLETE_TASK, finishUpdate);
    }
  }, []);

  return (
    <CustomModal
      title={t("views.calendar_page.modal.create_group_personal_remind.title_create")}
      open={isOpen}
      setOpen={setOpen}
      canConfirm={true}
      onConfirm={() => confirmChangeStatus()}
      onCancle={() => setOpen(false)}
      height='miniWide'
      maxWidth='sm'
      actionLoading={loading}
      className="update-task-complete"
      manualClose={true}
    >
      <div className="progressSlider">
        <Slider
          valueLabelDisplay="on"
          aria-label="pretty slider"
          value={newComplete}
          valueLabelFormat={x => `${x}%`}
          onChange={(e, val) => { setNewComplete(val) }}
        />
      </div>
    </CustomModal>
  );
}

export default UpdateCompleteTask;
