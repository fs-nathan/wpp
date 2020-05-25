import { openCreateRemind } from 'actions/chat/chat';
import { getRemind } from 'actions/taskDetail/taskDetailActions';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import './styles.scss';

function TabHeader({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const reminds = useSelector(state => state.taskDetail.taskRemind.remind);

  useEffect(() => {
    dispatch(getRemind({ taskId }))
  }, [dispatch, taskId]);

  const handleClickOpen = () => {
    dispatch(openCreateRemind(true, true))
  };

  return (
    <div className="container-normal-tabheader RemindTab--header">
      <HeaderTab title={t('LABEL_CHAT_TASK_NHAC_HEN')}
        buttonTooltipText={t('LABEL_CHAT_TASK_TAO_MOI')}
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
      />
    </div>
  );
}

export default TabHeader;
