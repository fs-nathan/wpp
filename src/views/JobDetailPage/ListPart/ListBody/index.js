import { List } from '@material-ui/core';
import { filterNoGroupTaskByType, filterTaskByType, searchNoGroupTaskByName, searchTaskByTaskName } from 'helpers/jobDetail/arrayHelper';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { taskIdSelector } from '../../selectors';
import { listTaskDataTypes } from '../ListHeader/CreateJobSetting';
import ListBodyItem from './ListBodyItem';
import ListBodySubHeader from './ListBodySubHeader';
import './styles.scss';

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
  const { t } = useTranslation();
  const taskId = useSelector(taskIdSelector);
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);
  const listDataNotRoom = useSelector(state => state.taskDetail.listDetailTask.listDataNotRoom);
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  const filterTaskType = useSelector(state => state.taskDetail.listDetailTask.filterTaskType);
  const searchKey = useSelector(state => state.taskDetail.listDetailTask.searchKey);
  const [data, setData] = useState([])

  useEffect(() => {
    if (listTaskDataType === listTaskDataTypes[1]) {
      setData(filterTaskByType(searchTaskByTaskName(listTaskDetail, searchKey), filterTaskType))
    } else {
      setData(filterNoGroupTaskByType(searchNoGroupTaskByName(listDataNotRoom, searchKey), filterTaskType))
    }
  }, [filterTaskType, listDataNotRoom, listTaskDataType, listTaskDetail, searchKey])

  return (
    <Body className="listJobBody"
      renderView={props => <div {...props} className="listJobBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      {listTaskDataType === listTaskDataTypes[1] ? data.map((item, key) => {
        const { tasks = [] } = item;
        return (
          <StyledList key={key}>
            <ListBodySubHeader
              subPrimary={item.name}
              subSecondary={t('LABEL_CHAT_TASK_VIEC', { task: tasks.length })}
            />
            {tasks.map((detail, idx) => (
              <ListBodyItem
                key={idx}
                {...detail}
                isSelected={taskId === detail.id}
              />
            ))}
          </StyledList>
        );
      }) :
        data.map((detail, idx) => (
          <ListBodyItem
            key={idx}
            {...detail}
            isSelected={taskId === detail.id}
          />
        ))
      }
    </Body>
  );
}

export default ListBody;
