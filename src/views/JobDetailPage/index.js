import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions';
import Intro from './introduce';
import { closeNoticeModal } from '../../actions/system/system';
import { taskIdSelector } from './selectors';
import '../JobDetailPage/index.scss';

function JobDetailPage(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  // console.log('JobDetailPage', { taskId });
  useEffect(() => {
    if (taskId) {
      dispatch(taskDetailAction.chooseTask(taskId))
    } // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    dispatch(closeNoticeModal());
    // getProjectGroup()
    dispatch(taskDetailAction.getProjectListBasic(projectId));
    // getDetailProject(projectId)
    // eslint-disable-next-line
  }, []);

  let id = props.history.location.pathname.substring(18);
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
    // getSubTaskByTaskId(taskId)
    // getRemindByTaskId(taskId)
    // getOfferByTaskId(taskId)
    // getCommandByTaskId(taskId)
    // getImageByTaskId(taskId)
    // getFileByTaskId(taskId)
    // getLinkByTaskId(taskId)
    // getLocationByTaskId(taskId)
    // getTrackingTime(taskId)
  }, [dispatch, taskId]);

  useEffect(() => {
    dispatch(taskDetailAction.getRole());
    dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
    dispatch(taskDetailAction.getListOffer());
    if (projectId !== '') {
      dispatch(taskDetailAction.getListTaskDetail({ project_id: projectId }));
      dispatch(taskDetailAction.getStaticTask(projectId));
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

const mapStateTo = state => {
  // console.log('state time task::::', state.taskDetail.commonTaskDetail.updateComplete);
  return {
    // const listGroupTask = useSelector(state=>state.taskDetail.listGroupTask.listGroupTask);
    // project group
    // const projectGroup = useSelector(state=>state.taskDetail.commonTaskDetail.projectGroups);
    // static task
    // const staticTask = useSelector(state=>state.taskDetail.listDetailTask.staticTask);
    // const updateComplete = useSelector(state=>state.taskDetail.commonTaskDetail.updateComplet);
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Member
    deleteMemberToTask: (task_id, member_id) =>
      dispatch(taskDetailAction.deleteMember({ task_id, member_id })),
    // Member Priority
    getGroupPermission: () => dispatch(taskDetailAction.getPermission()),
    updateGroupPermission: data =>
      dispatch(taskDetailAction.updatePermission(data)),
    // get project group
    // getProjectGroup: () => dispatch(taskDetailAction.getProjectGroup()),
  };
};

export default JobDetailPage;
