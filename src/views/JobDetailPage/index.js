import { getEmotions, getGirdListTask, getListStickersRequest } from 'actions/chat/chat';
import { detailStatus } from 'actions/project/setting/detailStatus';
import last from 'lodash/last';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNoticeModal } from '../../actions/system/system';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions';
import '../JobDetailPage/index.scss';
import ChatPart from './ChatPart';
import Intro from './introduce';
import ListPart from './ListPart';
import TabPart from './TabPart';

function JobDetailPage(props) {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const taskId = url.searchParams.get('task_id');
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  // console.log('JobDetailPage', taskId);

  useEffect(() => {
    dispatch(closeNoticeModal());
    dispatch(getListStickersRequest());
    dispatch(getEmotions());
    dispatch(getGirdListTask());
    dispatch(taskDetailAction.getRole());
    dispatch(taskDetailAction.getListOffer());
    dispatch(taskDetailAction.getPermission({ type: 4 }));
  }, [dispatch]);

  useEffect(() => {
    // console.log('url', url.pathname, 'projectId', projectId)
    const path = url.pathname;
    const id = last(path.split('/'));
    // console.log({ id, path });
    if (id.length > 0) {
      if (id !== projectId) {
        dispatch(taskDetailAction.getProjectListBasic(id));
        // dispatch(taskDetailAction.chooseProject({ id }))
        dispatch(taskDetailAction.getListTaskDetail(id));
        dispatch(taskDetailAction.getProjectDetail(id))
      }
    }
  }, [dispatch, projectId, url]);

  useEffect(() => {
    // console.log('taskId', taskId)
    if (taskId) {
      dispatch(taskDetailAction.getMemberNotAssigned({ task_id: taskId }));
      dispatch(taskDetailAction.getMember({ task_id: taskId }));
      dispatch(taskDetailAction.chooseTask(taskId))
      dispatch(taskDetailAction.getTaskDetailTabPart({ taskId }))
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    // console.log('projectId', projectId)
    if (projectId !== '') {
      dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
      dispatch(taskDetailAction.getListTaskDetail(projectId));
      dispatch(taskDetailAction.getStaticTask(projectId));
      dispatch(taskDetailAction.getProjectListBasic(projectId));
      dispatch(detailStatus({ projectId }));
    }
  }, [dispatch, projectId]);

  return (
    <div className={taskId ? 'container' : 'container-job-introduce'}>
      <ListPart />
      {taskId ? (
        <>
          <ChatPart />
          <TabPart />
        </>
      ) : (
          <Intro />
        )}
    </div>
  );
}

export default JobDetailPage;
