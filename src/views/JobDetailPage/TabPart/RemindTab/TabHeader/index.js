import React from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import RemindModal from '../RemindModal'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 85px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
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
  // bien cua modal cong viec con
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ColorTypo uppercase bold>Nhắc hẹn</ColorTypo>
      <ButtonIcon onClick={handleClickOpen}>
        <Icon path={mdiPlus} size={1} />
      </ButtonIcon>
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </ButtonIcon>
      {/* modal tao moi cong viec con */}
      <RemindModal isOpen={isOpen} handleClickClose={handleClickClose} />
    </Container>
  );
}

export default TabHeader;
