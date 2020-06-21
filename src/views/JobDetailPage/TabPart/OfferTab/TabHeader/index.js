import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getOffer, createOffer } from 'actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import OfferModal from '../OfferModal';

function TabHeader(props) {
  const { t } = useTranslation();
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
      <HeaderTab title={t('LABEL_CHAT_TASK_DE_XUAT_PHE_DUYET')}
        buttonTooltipText={t('LABEL_CHAT_TASK_TAO_MOI')}
        onClickBack={() => props.setShow(0)}
        onClickOpen={handleClickOpen}
      />
      <OfferModal
        isOpen={open}
        setOpen={setOpen}
        actionCreateOffer={createOffer()}
        {...props} />
    </div>
  );
}

export default TabHeader;
