import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';



const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 92px;
  & > *:first-child {
    margin-right: auto;
    font-size: 16px;
    margin-left: 20px
  }
`;

function TabHeader(props) {
  // console.log('header props::', props)
  return (
    <Container>
      <ColorTypo uppercase bold>Công việc con</ColorTypo>
      <IconButton onClick={() => props.onClickPlusIcon()}>
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      <IconButton onClick={() => props.setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
    </Container>
  );
}

export default TabHeader;
