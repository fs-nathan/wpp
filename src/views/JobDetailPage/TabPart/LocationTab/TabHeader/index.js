import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose  } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';

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
  return (
    <Container>
      <ColorTypo uppercase bold>Chia sẻ vị trí</ColorTypo>
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiClose } size={1}/>
      </ButtonIcon>
    </Container>
  );
}

export default TabHeader;
