import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import Icon from "@mdi/react";
import { mdiAlarmMultiple, mdiPlus } from "@mdi/js";
import ColorTypo from '../../../components/ColorTypo';
import RemindItem from './RemindItem';

const Container = styled.div`
  grid-area: remind;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

const Header = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const ListBody = styled.div`
  padding: 15px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

function RemindPart() {
  return (
    <Container>
      <Header>
        <Icon path={mdiAlarmMultiple} size={1.5} />
        <ColorTypo uppercase>Nhắc việc của bạn</ColorTypo>
        <IconButton>
          <Icon path={mdiPlus} size={1} />
        </IconButton>
      </Header>
      <ListBody>
        <RemindItem />
        <RemindItem />
      </ListBody>
    </Container>
  )
}

export default RemindPart;
