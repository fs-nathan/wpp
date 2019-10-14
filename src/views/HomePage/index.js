import React from "react";
import styled from "styled-components";
import NewsPart from './NewsPart';
import JobsPart from './JobsPart';
import RemindPart from './RemindPart';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(360px, 4fr) repeat(2, minmax(270px, 3fr));
  grid-template-areas:
    "news jobs remind";
`;

function HomePage() {
  return (
    <Container>
      <NewsPart />
      <JobsPart />
      <RemindPart />
    </Container>
  );
}

export default HomePage;
