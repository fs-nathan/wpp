import { getEmotions, getListStickersRequest } from 'actions/chat/chat';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNoticeModal } from '../../actions/system/system';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions';
import '../JobDetailPage/index.scss';
import ChatPart from './ChatPart';
import Intro from './introduce';
import ListPart from './ListPart';
import { taskIdSelector } from './selectors';
import TabPart from './TabPart';

function JobDetailPage(props) {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const taskId = useSelector(taskIdSelector) || url.searchParams.get('task_id');
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  let id = props.history.location.pathname.substring(18);
  // console.log('JobDetailPage', taskId);

  useEffect(() => {
    dispatch(closeNoticeModal());
    dispatch(getListStickersRequest());
    dispatch(getEmotions());
    dispatch(taskDetailAction.getRole());
    dispatch(taskDetailAction.getListOffer());
    dispatch(taskDetailAction.getPermission({ type: 4 }));
  }, [dispatch]);

  useEffect(() => {
    const chooseProject = project => dispatch(taskDetailAction.chooseProject(project))
    const getDetailProject = project_id => dispatch(taskDetailAction.getProjectDetail(project_id))
    // console.log({ id });
    if (id.length > 0) {
      if (id !== projectId) {
        getDetailProject(id);
        chooseProject({ id });
      }
    }
  }, [dispatch, id, projectId]);

  useEffect(() => {
    dispatch(taskDetailAction.getMemberNotAssigned({ task_id: taskId }));
    dispatch(taskDetailAction.getMember({ task_id: taskId }));
    dispatch(taskDetailAction.getTaskDetailTabPart({ task_id: taskId }));
    if (taskId) {
      dispatch(taskDetailAction.chooseTask(taskId))
      dispatch(taskDetailAction.getTaskDetailTabPart({ taskId }))
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (projectId !== '') {
      dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
      dispatch(taskDetailAction.getListTaskDetail({ project_id: projectId }));
      dispatch(taskDetailAction.getStaticTask(projectId));
      dispatch(taskDetailAction.getProjectListBasic(projectId));
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
