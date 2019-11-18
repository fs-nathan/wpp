import React from 'react';
import { IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft  , mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import DemandModal from '../DemandModal'



const Container = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  height: 85px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft } size={1}/>
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}>Chỉ đạo - Quyết định</ColorTypo>
      <ButtonIcon onClick={handleClose,handleClickOpen}>
        <Icon path={mdiPlus} size={1}/>
      </ButtonIcon>
      {/* modal chi dao quyet dinh */}
      <DemandModal isOpen={open} handleClose={handleClose} handleOpen={handleClickOpen}/>
    </Container>
  );
}

export default TabHeader;
