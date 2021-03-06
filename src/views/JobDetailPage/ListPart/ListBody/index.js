import {List, Popover, Typography} from '@material-ui/core';
import {
  filterNoGroupTaskByType,
  filterTaskByType,
  searchNoGroupTaskByName,
  searchTaskByTaskName
} from 'helpers/jobDetail/arrayHelper';
import React, {useEffect, useRef, useState} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {taskIdSelector} from '../../selectors';
import {listTaskDataTypes} from '../ListHeader/CreateJobSetting';
import ListBodyItem from './ListBodyItem';
import ListBodySubHeader from './ListBodySubHeader';
import './styles.scss';
import {clearFocusTaskGroup, getListTaskDetail} from 'actions/taskDetail/taskDetailActions';
import {Icon} from "@mdi/react";
import {mdiMenuDown} from '@mdi/js';
import {getViewAllMessage} from "../../../../components/Drawer/DrawerService";
import {DEFAULT_MESSAGE, SNACKBAR_VARIANT, SnackbarEmitter} from "../../../../constants/snackbarController";
import {isNil} from "lodash";
import {CREATE_GROUP_TASK, CustomEventDispose, CustomEventListener} from "../../../../constants/events";

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
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  const filterTaskType = useSelector(state => state.taskDetail.listDetailTask.filterTaskType);
  const searchKey = useSelector(state => state.taskDetail.listDetailTask.searchKey);
  const focusId = useSelector(state => state.taskDetail.detailTask.focusId);
  const [selectedFilter, setSelectedFilter] = React.useState(1);
  const [anchorElFilterControl, setAnchorElFilterControl] = React.useState(null);
  const [data, setData] = useState([]);
  const [customListTaskDataType, setCustomListTaskDataType] = React.useState(listTaskDataType);
  const userId = useSelector((state) => state.system.profile.id);

  useEffect(() => {
    if (selectedFilter === 0) {
      setData(filterNoGroupTaskByType(searchNoGroupTaskByName(listDataNotRoom, searchKey), filterTaskType));
      setCustomListTaskDataType(listTaskDataTypes[0]);
    } else if(selectedFilter === 1) {
      setData(filterTaskByType(searchTaskByTaskName(listTaskDetail, searchKey), filterTaskType));
      setCustomListTaskDataType(listTaskDataTypes[1]);
    } else {
      const key = `TASK_GIRD:${userId}:${projectId}`;
      const typeData = localStorage.getItem(key) || "include-room";
      if (typeData == "not-room") {
        setData(filterNoGroupTaskByType(searchNoGroupTaskByName(listDataNotRoom, searchKey), 6));
      } else {
        setData(filterTaskByType(searchNoGroupTaskByName(listTaskDetail, searchKey), 6));
      }
      // setCustomListTaskDataType(listTaskDataTypes[0]);
    }
  }, [filterTaskType, listDataNotRoom, listTaskDataType, listTaskDetail, searchKey, selectedFilter]);
  // React.useEffect(() => {
  //   if(!isNil(projectId) && projectId !== "") {
  //     if (selectedFilter === 0) dispatch(getListTaskDetail(projectId, listTaskDataTypes[selectedFilter]));
  //     else if(selectedFilter === 1) {
  //       console.log('msg', projectId)
  //       dispatch(getListTaskDetail(projectId, listTaskDataTypes[selectedFilter]));
  //     }
  //   }
  // }, [selectedFilter, projectId, dispatch]);

  React.useEffect(() => {
    if (projectId !== "" && userId) {
      const key = `TASK_GIRD:${userId}:${projectId}`;
      const type_data = localStorage.getItem(key) || "include-room";
      setSelectedFilter(type_data === listTaskDataTypes[0] ? 0 : 1);
    }
  }, [projectId, userId, dispatch]);

  useEffect(() => {
    if (focusId) {
      const ele = document.getElementById(focusId)
      if (ele) {
        setTimeout(function () {
          scrollRef.current.scrollTop(ele.offsetTop)
          dispatch(clearFocusTaskGroup());
        }, 10)
      }
    }
  });

  function renderTitleSelectedFilter() {
    switch (selectedFilter) {
      case 0:
        return t("IDS_WP_JOB");
      case 1:
        return t("LABEL_JOBS_AND_GROUP");
      case 2:
        return t("LABEL_DISCUSS_UNREAD");
      default:
        return;
    }
  }
  function handleSelectFilter(type) {
    setSelectedFilter(type);
    if (type != 2) {
      const key = `TASK_GIRD:${userId}:${projectId}`;
      localStorage.setItem(key, listTaskDataTypes[type]);
      if (type != selectedFilter) {
        if (selectedFilter === 0) dispatch(getListTaskDetail(projectId, listTaskDataTypes[type]));
        else if(selectedFilter === 1) {
          dispatch(getListTaskDetail(projectId, listTaskDataTypes[type]));
        }
      }
    }
    setAnchorElFilterControl(null);
  }
  const handleViewAll = async () => {
    await getViewAllMessage();
  }
  React.useEffect(() => {
    const reload = () => {
      dispatch(getListTaskDetail(projectId, listTaskDataTypes[selectedFilter]));
    }
    CustomEventListener(CREATE_GROUP_TASK.SUCCESS, reload);
    return () => {
      CustomEventDispose(CREATE_GROUP_TASK.SUCCESS, reload);
    }
  });

  return (
    <Body className="listJobBody"
      ref={scrollRef}
      renderView={props => <div {...props} className="listJobBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className={"listJobBody--taskControlTop"}>
        <div className={"listJoBody--taskControlTop_left"}>
          <div className={"customSelectBox"} onClick={(evt) => setAnchorElFilterControl(evt.currentTarget)}>
            {renderTitleSelectedFilter()}
            <Icon path={mdiMenuDown} size={1} color={"rgba(0,0,0,0.54)"}/>
          </div>
        </div>
        <div className={"listJobBody--taskControlTop_right"} onClick={() => handleViewAll().then(() => {
          SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
        })}>
          <span className={"mark-as-read"}>{t("LABEL_MARK_AS_READ")}</span>
        </div>
        <Popover
          open={Boolean(anchorElFilterControl)} className={"listJobBody--taskControlTop-popover"}
          anchorEl={anchorElFilterControl} elevation={1}
          onClose={() => setAnchorElFilterControl(null)}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          transformOrigin={{vertical: 'top', horizontal: 'left'}}
        >
          <Typography
            variant={"body1"} className={`listJobBody--taskControlTop-popoverItem ${selectedFilter === 0 && "active"}`}
            onClick={() => handleSelectFilter(0)}
          >
            {t("IDS_WP_JOB")}
          </Typography>
          <Typography
            variant={"body1"} className={`listJobBody--taskControlTop-popoverItem ${selectedFilter === 1 && "active"}`}
            onClick={() => handleSelectFilter(1)}
          >
            {t("LABEL_JOBS_AND_GROUP")}
          </Typography>
          <Typography
            variant={"body1"} className={`listJobBody--taskControlTop-popoverItem ${selectedFilter === 2 && "active"}`}
            onClick={() => handleSelectFilter(2)}
          >
            {t("LABEL_DISCUSS_UNREAD")}
          </Typography>
        </Popover>
      </div>
      {customListTaskDataType === listTaskDataTypes[1] ? data.map((item, key) => {
        const { tasks = [] } = item;
        return (
          <StyledList
            key={item.id}
            id={item.id}
          >
            <ListBodySubHeader
              subPrimary={item.name}
              subSecondary={t('LABEL_CHAT_TASK_VIEC', { task: tasks.length })}
            />
            {tasks.map((detail, idx) => (
              <ListBodyItem
                key={detail.id}
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
