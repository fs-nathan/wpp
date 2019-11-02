import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import ListBodySubHeader from './ListBodySubHeader';
import ListBodyItem from './ListBodyItem';

const StyledList = styled(List)`
  padding: 10px 0; 
  & > * {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

function ListBody() {
  return (
    <StyledList>
      <ListBodySubHeader subPrimary={`Thiết kế giao diện`} subSecondary={`(2 việc)`}/>
      <ListBodyItem />
      <ListBodyItem />
      <ListBodySubHeader subPrimary={'Thiết kế giao diện'} subSecondary={'(2 việc)'}/>
      <ListBodyItem />
      <ListBodyItem />
    </StyledList>
  )
}

export default ListBody;
