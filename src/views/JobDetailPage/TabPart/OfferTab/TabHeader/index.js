import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import OfferModal from '../OfferModal';

function TabHeader(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  useEffect(() => {
    dispatch(getOffer({ taskId }))
  }, [dispatch, taskId])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="container-normal-tabheader">
      <HeaderTab title="Đề xuất - Phê duyệt"
        onClickBack={() => props.setShow(0)}
        onClickOpen={handleClickOpen}
      />
      <OfferModal isOpen={open} setOpen={setOpen}{...props} />
    </div>
  );
}

export default TabHeader;
