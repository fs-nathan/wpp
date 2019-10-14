import React from 'react';
import styled from 'styled-components';
import Icon from "@mdi/react";
import { mdiMagnify ,mdiGoogleAssistant } from "@mdi/js";
import ColorTypo from '../../../components/ColorTypo';
import NewsItem from './NewsItem';

const Container = styled.div`
  grid-area: news;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

const Header = styled.div`
  padding: 15px 25px;
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

function NewsPart() {
  return (
    <Container>
      <Header>
        <Icon path={mdiGoogleAssistant} size={1.8} color="#ff630f"/>
        <ColorTypo uppercase>Bảng tin nội bộ</ColorTypo>
        <Icon path={mdiMagnify} size={1.3} color="#6c757d" />
      </Header>
      <ListBody>
        <NewsItem />  
        <NewsItem />
        <NewsItem />
      </ListBody>
    </Container>
  )
}

export default NewsPart;
