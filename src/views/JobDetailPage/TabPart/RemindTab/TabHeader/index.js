import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRemind } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import RemindModal from '../RemindModal';


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

  return (
    <div className="container-normal-tabheader">
      <HeaderTab title="Nhắc hẹn"
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
      />
      <RemindModal isOpen={isOpen} setOpen={setOpen} isCreate />
    </div>
  );
}

export default TabHeader;
