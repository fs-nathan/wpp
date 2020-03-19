import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProgressModal from '../ProgressModal'
import { taskIdSelector } from '../../../selectors';
import { getTrackingTime } from '../../../../../actions/taskDetail/taskDetailActions';
import HeaderTab from '../../HeaderTab';

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getTrackingTime(taskId))
  }, [dispatch, taskId])

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-progress-tabheader">
      <HeaderTab title="Tiến độ công việc"
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
        rightIcon="settings"
      />
      <ProgressModal isOpen={open} handleClickOpen={handleClickOpen} handleClickClose={handleClickClose} />
    </div>
  );
}

export default TabHeader;
