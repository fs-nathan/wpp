import { getTrackingTime, getTrackingTimeComplete } from 'actions/taskDetail/taskDetailActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import ProgressModal from '../ProgressModal';

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getTrackingTime(taskId))
    dispatch(getTrackingTimeComplete(taskId))
  }, [dispatch, taskId])

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  function onClickBack() {
    setShow(0)
  }

  return (
    <div className="container-progress-tabheader">
      <HeaderTab title="Tiến độ công việc"
        onClickBack={onClickBack}
        onClickOpen={handleClickOpen}
        rightIcon="settings"
      />
      <ProgressModal isOpen={open} setOpen={setOpen} />
    </div>
  );
}

export default TabHeader;
