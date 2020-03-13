import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OfferModal from '../OfferModal'
import { getOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';

function TabHeader(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  useEffect(() => {
    dispatch(getOffer({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-normal-tabheader">
      <HeaderTab title="Đề xuất - Phê duyệt"
        onClickBack={() => props.setShow(0)}
        onClickOpen={handleClickOpen}
      />
      <OfferModal isOpen={open} handleClickClose={handleClickClose} handleClickOpen={handleClickOpen} {...props} />
    </div>
  );
}

export default TabHeader;
