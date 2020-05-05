import { useTranslation } from 'react-i18next';
import { openCreateRemind } from 'actions/chat/chat';
import { getRemind } from 'actions/taskDetail/taskDetailActions';
import React, { useEffect } from 'react';
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
    if (reminds.length === 0)
      dispatch(getRemind({ taskId }))
  }, [dispatch, reminds.length, taskId]);

  const handleClickOpen = () => {
    dispatch(openCreateRemind(true, true))
  };

  return (
    <div className="container-normal-tabheader RemindTab--header">
      <HeaderTab title={t('LABEL_CHAT_TASK_NHAC_HEN')}
        onClickBack={() => setShow(0)}
        onClickOpen={handleClickOpen}
      />
    </div>
  );
}

export default TabHeader;
