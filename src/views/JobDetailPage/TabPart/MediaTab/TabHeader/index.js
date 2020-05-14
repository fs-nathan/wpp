import { IconButton } from '@material-ui/core';
import { mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFileTabPart, getImage, getLinkTabPart } from '../../../../../actions/taskDetail/taskDetailActions';
import ColorTypo from '../../../../../components/ColorTypo';
import { taskIdSelector } from '../../../selectors';
import './styles.scss';

function TabHeader({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  useEffect(() => {
    dispatch(getImage({ taskId }));
    dispatch(getFileTabPart({ taskId }));
    dispatch(getLinkTabPart({ taskId }));
  }, [dispatch, taskId])

  return (
    <div className="container-normal-tabheader">
      <IconButton className="headerTab--button" onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </IconButton>
      <ColorTypo uppercase className="mediaHeaderTab--button">{t('LABEL_CHAT_TASK_TAI_LIEU')}</ColorTypo>
      <span style={{ width: 30 }}></span>
    </div>
  );
}

export default TabHeader;
