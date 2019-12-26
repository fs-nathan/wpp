import React, { useEffect } from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft , mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressModal from '../ProgressModal'
import { WrapperContext } from '../../../index'
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 85px;
  overflow-y: hidden;
`;

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
  // const [time, setTime] = React.useState('')

  // const handleTime = () => {
  //   setTime(time);
  // }
  // bien cua modal cong viec con
  const value = React.useContext(WrapperContext)
  useEffect(() => {
    value.getTrackingTime(value.taskId)
  })
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft } size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Tiến độ công việc</ColorTypo>
      <ButtonIcon onClick={handleClickOpen}>
        <Icon path={mdiSettings} size={1} />
      </ButtonIcon>
      {/* modal tao moi cong viec con */}
      <ProgressModal isOpen={open} handleClickOpen={handleClickOpen} handleClickClose={handleClickClose} />
    </Container>
  );
}

export default TabHeader;
