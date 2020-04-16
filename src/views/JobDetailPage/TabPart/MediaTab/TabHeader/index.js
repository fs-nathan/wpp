import { IconButton } from '@material-ui/core';
import { mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFileTabPart, getImage, getLinkTabPart } from '../../../../../actions/taskDetail/taskDetailActions';
import ColorTypo from '../../../../../components/ColorTypo';
import { taskIdSelector } from '../../../selectors';
import './styles.scss';

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  useEffect(() => {
    dispatch(getImage({ taskId }));
    dispatch(getFileTabPart({ taskId }));
    dispatch(getLinkTabPart({ taskId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container-normal-tabheader">
      <IconButton className="headerTab--button" onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </IconButton>
      <ColorTypo uppercase className="mediaHeaderTab--button">Tài liệu</ColorTypo>
      <span style={{ width: 30 }}></span>
    </div>
  );
}

export default TabHeader;
