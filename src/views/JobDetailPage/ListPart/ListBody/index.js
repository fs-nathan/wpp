import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import ListBodySubHeader from './ListBodySubHeader';
import ListBodyItem from './ListBodyItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { WrapperContext } from '../../index'
const StyledList = styled(List)`

    & > li {
      &:not(:last-child) {
        margin-bottom: 10px;
    }
  }
  &:last-child {
    margin: 10px 0 20px 0;
  }
`;
const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  & > div:nth-child(1) {
    margin-right: -7px !important;
  }
`;

function ListBody() {
  const value = React.useContext(WrapperContext)
  let data = []

  let listTaskDetail = value.listTaskDetail
  if (listTaskDetail) {
    data = listTaskDetail.tasks
  }

   
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200} >
        {data.map((item, key) => {
          return (
            <StyledList key={key} >
              <ListBodySubHeader subPrimary={item.name} subSecondary={'(' + item.tasks.length + ' việc)'} />
              {item.tasks.map((detail, idx) => <ListBodyItem key={idx} {...detail} />)}
            </StyledList>
          )
        })}
     

    </Body>

  )
}

export default ListBody;
