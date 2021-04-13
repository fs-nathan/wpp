import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationTabPart } from '../../../../../actions/taskDetail/taskDetailActions';
import ColorTypo from '../../../../../components/ColorTypo';
import '../../HeaderTab/styles.scss';


function TabHeader({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  useEffect(() => {
    dispatch(getLocationTabPart({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container-normal-tabheader">
      <IconButton className="headerTab--button" onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </IconButton>
      <ColorTypo uppercase style={{ fontSize: 17 }}>{t('LABEL_CHAT_TASK_CHIA_SE_VI_TRI')}</ColorTypo>
      <span style={{ width: 30 }}></span>
    </div>
  );
}

export default TabHeader;
