import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import ListBanner from './ListBanner';
import ListBody from './ListBody';

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
  padding: 15px;
`;

function ListPart() {
  return (
    <Container>
      <ListHeader />
      <ListBanner />
      <ListBody />
    </Container>
  )
}

export default ListPart;
