import React, { useEffect } from 'react';
import DemandModal from '../DemandModal'
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getCommand, createCommand } from '../../../../../actions/taskDetail/taskDetailActions';
import HeaderTab from '../../HeaderTab';

function TabHeader(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getCommand({ task_id: taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [open, setOpen] = React.useState(false)
  // console.log('props nè', props )
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const confirmCreateCommand = ({ content, type }) => {
    dispatch(createCommand({ task_id: taskId, content, type }))
  }
  return (
    <div className="container-normal-tabheader">
      <HeaderTab title="Chỉ đạo - Quyết định"
        onClickBack={() => props.setShow(0)}
        onClickOpen={handleClickOpen}
      />
      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        handleClose={handleClose}
        handleOpen={handleClickOpen}
        confirmCreateCommand={confirmCreateCommand}
        item={{ content: "", type: -1 }}
        {...props}
      />
    </div>
  );
}

export default TabHeader;
