import { List } from '@material-ui/core';
import { filterNoGroupTaskByType, filterTaskByType, searchNoGroupTaskByName, searchTaskByTaskName } from 'helpers/jobDetail/arrayHelper';
import React, { useEffect, useState, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { taskIdSelector } from '../../selectors';
import { listTaskDataTypes } from '../ListHeader/CreateJobSetting';
import ListBodyItem from './ListBodyItem';
import ListBodySubHeader from './ListBodySubHeader';
import './styles.scss';
import { clearFocusTaskGroup } from 'actions/taskDetail/taskDetailActions';

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
  const scrollRef = useRef();
  const dispatch = useDispatch();

  const taskId = useSelector(taskIdSelector);
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);
  const listDataNotRoom = useSelector(state => state.taskDetail.listDetailTask.listDataNotRoom);
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  const filterTaskType = useSelector(state => state.taskDetail.listDetailTask.filterTaskType);
  const searchKey = useSelector(state => state.taskDetail.listDetailTask.searchKey);
  const focusId = useSelector(state => state.taskDetail.detailTask.focusId);

  const [data, setData] = useState([])

  useEffect(() => {
    let allTasks = searchNoGroupTaskByName(listDataNotRoom, searchKey)
    if (filterTaskType == 0) {
      setData(allTasks)
    } else {
      setData(allTasks.filter(e => e.type_chat == filterTaskType))
    }
  }, [filterTaskType, listDataNotRoom, listTaskDataType, listTaskDetail, searchKey])

  useEffect(() => {
    let rqId;
    if (focusId) {
      const ele = document.getElementById(focusId)
      if (ele) {
        // console.log('focusId', focusId)
        rqId = setTimeout(function () {
          scrollRef.current.scrollTop(ele.offsetTop)
          dispatch(clearFocusTaskGroup());
        }, 10)
      }
    }
    return () => {
      // console.log('focusTopId clearTimeout')
      // clearTimeout(rqId);
    }
  })
  return (
    <Body className="listJobBody"
      ref={scrollRef}
      renderView={props => <div {...props} className="listJobBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      {
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
