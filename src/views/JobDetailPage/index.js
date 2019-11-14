import React from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(200px, 3fr) minmax(400px, 5fr) minmax(200px, 4fr);
  grid-template-areas: 
    "list chat tab";
`;

function JobDetailPage() {
  return (
    <Container>
      <ListPart />
      <ChatPart />
      <TabPart />
    </Container>
  )
}

export default JobDetailPage;