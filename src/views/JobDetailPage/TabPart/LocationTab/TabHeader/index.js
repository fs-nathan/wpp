import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationTabPart } from '../../../../../actions/taskDetail/taskDetailActions';

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  useEffect(() => {
    dispatch(getLocationTabPart({ taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container-normal-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Chia sẻ vị trí</ColorTypo>
      <span style={{ width: 30 }}></span>
    </div>
  );
}

export default TabHeader;
