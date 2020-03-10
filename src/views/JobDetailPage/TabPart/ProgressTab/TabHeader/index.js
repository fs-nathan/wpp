import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressModal from '../ProgressModal'
import { useSelector, useDispatch } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getTrackingTime } from '../../../../../actions/taskDetail/taskDetailActions';

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

const ProgressTitle = styled(ColorTypo)`
  font-size: 17px;
  font-weight: normal;
`

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  // bien cua modal cong viec con
  useEffect(() => {
    dispatch(getTrackingTime(taskId))
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
    <div className="container-progress-tabheader">
      <abbr title="Quay lại">
        <ButtonIcon onClick={() => setShow(0)}>
          <Icon path={mdiChevronLeft} size={1} />
        </ButtonIcon>
      </abbr>
      <ProgressTitle uppercase >Tiến độ công việc</ProgressTitle>
      <abbr title="Cài đặt">
        <ButtonIcon onClick={handleClickOpen}>
          <Icon path={mdiSettings} size={1} />
        </ButtonIcon>
      </abbr>
      {/* modal tao moi cong viec con */}
      <ProgressModal isOpen={open} handleClickOpen={handleClickOpen} handleClickClose={handleClickClose} />
    </div>
  );
}

export default TabHeader;
