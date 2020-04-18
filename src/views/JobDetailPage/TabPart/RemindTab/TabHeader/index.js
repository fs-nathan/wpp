import { openCreateRemind } from 'actions/chat/chat';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRemind } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import './styles.scss';

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getRemind({ taskId }))
  }, [dispatch, taskId]);

  const handleClickOpen = () => {
    dispatch(openCreateRemind(true, true))
  };

  return (
    <div className="container-normal-tabheader RemindTab--header">
      <HeaderTab title="Nhắc hẹn"
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
      />
    </div>
  );
}

export default TabHeader;
