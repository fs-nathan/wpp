import React from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ProgressModal from '../ProgressModal'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 105px;
  overflow-y: hidden;
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;

function TabHeader({ setShow }) {
  const [time, setTime] = React.useState('')

  const handleTime = () => {
    setTime(time);
  }
  // bien cua modal cong viec con
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ColorTypo uppercase bold>Tiến độ công việc</ColorTypo>
      <IconButton onClick={handleClickClose, handleClickOpen}>
        <Icon path={mdiSettings} size={1} />
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
      {/* modal tao moi cong viec con */}
      <ProgressModal isOpen={open} handleClickOpen={handleClickOpen} handleClickClose={handleClickClose} />
    </Container>
  );
}

export default TabHeader;
