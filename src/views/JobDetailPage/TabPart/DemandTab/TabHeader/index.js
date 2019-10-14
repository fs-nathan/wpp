import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
  }
`;

function TabHeader({ setShow }) {
  return (
    <Container>
      <ColorTypo uppercase>Chỉ đạo - Quyết định</ColorTypo>
      <IconButton>
        <Icon path={mdiPlus} size={1}/>
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiChevronRight} size={1}/>
      </IconButton>
    </Container>
  );
}

export default TabHeader;
