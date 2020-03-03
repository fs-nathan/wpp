import React, { useEffect } from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft , mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressModal from '../ProgressModal'
import { useSelector, useDispatch } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { getTrackingTime } from '../../../../../actions/taskDetail/taskDetailActions';
// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #fff;
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
//   height: 85px;
//   overflow-y: hidden;
// `;

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
`

function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  // bien cua modal cong viec con
  useEffect(() => {
    dispatch(getTrackingTime(taskId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-progress-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft } size={1} />
      </ButtonIcon>
      <ProgressTitle uppercase bold>Tiến độ công việc</ProgressTitle>
      <ButtonIcon onClick={handleClickOpen}>
        <Icon path={mdiSettings} size={1} />
      </ButtonIcon>
      {/* modal tao moi cong viec con */}
      <ProgressModal isOpen={open} handleClickOpen={handleClickOpen} handleClickClose={handleClickClose} />
    </div>
  );
}

export default TabHeader;
