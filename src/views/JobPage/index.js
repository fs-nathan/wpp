import React from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import TablePart from './TablePart';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(800px, 3fr);
  grid-template-areas: 
    "list table";
`;

function JobPage() {
  return (
    <Container>
      <ListPart />
      <TablePart />
    </Container>
  )
}

export default JobPage;
