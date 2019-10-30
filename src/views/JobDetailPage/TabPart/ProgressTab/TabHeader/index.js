import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;

function TabHeader({ setShow }) {
  return (
    <Container>
      <ColorTypo uppercase bold>Tiến độ công việc</ColorTypo>
      <IconButton>
        <Icon path={mdiSettings} size={1}/>
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiChevronRight} size={1}/>
      </IconButton>
    </Container>
  );
}

export default TabHeader;
