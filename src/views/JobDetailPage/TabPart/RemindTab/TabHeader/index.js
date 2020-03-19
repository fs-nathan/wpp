import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RemindModal from '../RemindModal'
import { taskIdSelector } from '../../../selectors';
import { getRemind } from '../../../../../actions/taskDetail/taskDetailActions';
import HeaderTab from '../../HeaderTab';

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getRemind({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // bien cua modal cong viec con
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-normal-tabheader">
      <HeaderTab title="Nhắc hẹn"
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
      />
      <RemindModal isOpen={isOpen} handleClickClose={handleClickClose} isCreate />
    </div>
  );
}

export default TabHeader;
