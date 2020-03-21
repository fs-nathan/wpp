import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import ListBodySubHeader from './ListBodySubHeader';
import ListBodyItem from './ListBodyItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { taskIdSelector } from '../../selectors';
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
`;

function ListBody() {
  const taskId = useSelector(taskIdSelector);
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);

  let data = [];
  // fix use effect
  if (listTaskDetail) {
    data = listTaskDetail.tasks;
    console.log({ data });
  }

  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      {data.map((item, key) => {
        return (
          <StyledList key={key}>
            <ListBodySubHeader
              subPrimary={item.name}
              subSecondary={"(" + item.tasks.length + " việc)"}
            />
            {item.tasks.map((detail, idx) => (
              <ListBodyItem
                key={idx}
                {...detail}
                isSelected={taskId === detail.id}
              />
            ))}
          </StyledList>
        );
      })}
    </Body>
  );
}

export default ListBody;
