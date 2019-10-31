import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose , mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 92px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
  }
`;

function TabHeader({ setShow }) {
  return (
    <Container>
      <ColorTypo uppercase>Đề xuất - Phê duyệt</ColorTypo>
      <IconButton>
        <Icon path={mdiPlus} size={1}/>
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose } size={1}/>
      </IconButton>
    </Container>
  );
}

export default TabHeader;
