import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getImage, getFileTabPart, getLinkTabPart } from '../../../../../actions/taskDetail/taskDetailActions';

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
  const taskId = useSelector(taskIdSelector);
  useEffect(() => {
    dispatch(getImage({ taskId }));
    dispatch(getFileTabPart({ taskId }));
    dispatch(getLinkTabPart({ taskId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container-normal-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Tài liệu</ColorTypo>
      <span style={{ width: 30 }}></span>
    </div>
  );
}

export default TabHeader;
