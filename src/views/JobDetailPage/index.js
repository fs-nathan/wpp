import React, { useEffect } from 'react';
// import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { useSelector, useDispatch } from 'react-redux';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions';
import '../JobDetailPage/index.scss';
import Intro from './introduce';
import { closeNoticeModal } from '../../actions/system/system';
import { taskIdSelector } from './selectors';

export const WrapperContext = React.createContext(null);

function JobDetailPage(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  const chooseTask = task => dispatch(taskDetailAction.chooseTask(task));
  const getProjectListBasic = projectId => dispatch(taskDetailAction.getProjectListBasic(projectId));

  useEffect(() => {
    // console.log({ taskId });
    if (taskId) {
      chooseTask(taskId);
    } // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    closeNoticeModal();
    // getProjectGroup()
    getProjectListBasic();
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
    const getMemberNotAssignedByTaskId = task_id => dispatch(taskDetailAction.getMemberNotAssigned({ task_id }));
    const getMemberByTaskId = task_id => dispatch(taskDetailAction.getMember({ task_id }));
    const getTaskDetailByTaskId = taskId => dispatch(taskDetailAction.getTaskDetailTabPart({ taskId }));
    // getSubTaskByTaskId(taskId)
    // getRemindByTaskId(taskId)
    // getOfferByTaskId(taskId)
    // getCommandByTaskId(taskId)
    // getImageByTaskId(taskId)
    // getFileByTaskId(taskId)
    // getLinkByTaskId(taskId)
    // getLocationByTaskId(taskId)
    getTaskDetailByTaskId(taskId);
    getMemberByTaskId(taskId);
    getMemberNotAssignedByTaskId(taskId);
    // getTrackingTime(taskId)
  }, [dispatch, taskId]);

  useEffect(() => {
    dispatch(taskDetailAction.getRole());
    dispatch(taskDetailAction.getListGroupTask({ project_id: projectId }));
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
    // offer
    // const offer = useSelector(state=>state.taskDetail.taskOffer.offer);
    // const pendingItems = useSelector(state=>state.taskDetail.taskOffer.pendingItems);
    // const approvedItems = useSelector(state=>state.taskDetail.taskOffer.approvedItems);
    // remind
    // const remind = useSelector(state=>state.taskDetail.taskRemind.remind);
    // subtask
    // media
    // const image = useSelector(state=>state.taskDetail.media.image);
    // const file = useSelector(state=>state.taskDetail.media.file);
    // const link = useSelector(state=>state.taskDetail.media.links);
    // command
    // const command = useSelector(state=>state.taskDetail.taskCommand.command);
    // const commandItems = useSelector(state=>state.taskDetail.taskCommand.commandItems);
    // const decisionItems = useSelector(state=>state.taskDetail.taskCommand.decisionItems);
    // fake ID
    // const taskId = useSelector(state=>state.taskDetail.commonTaskDetail.activeTaskId);
    // location
    // task Detail
    // list group task
    // const listGroupTask = useSelector(state=>state.taskDetail.listGroupTask.listGroupTask);
    // member

    // const userRoles = useSelector(state=>state.taskDetail.taskMember.user_roles);

    // project group
    // const projectGroup = useSelector(state=>state.taskDetail.commonTaskDetail.projectGroups);
    // project detail
    // project list basic
    // static task
    // const staticTask = useSelector(state=>state.taskDetail.listDetailTask.staticTask);
    // const updateComplete = useSelector(state=>state.taskDetail.commonTaskDetail.updateComplet);
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // sub-task

    postSubTaskByTaskId: (taskId, name) =>
      dispatch(taskDetailAction.postSubTask({ task_id: taskId, name })),
    updateSubTaskByTaskId: (subTaskId, name, taskId) =>
      dispatch(
        taskDetailAction.updateSubTask({ sub_task_id: subTaskId, name, taskId })
      ),
    deleteSubTaskByTaskId: ({ subTaskId, taskId }) =>
      dispatch(
        taskDetailAction.deleteSubTask({
          sub_task_id: subTaskId,
          taskId: taskId
        })
      ),
    completeSubTaskByTaskId: ({ subTaskId, taskId }) =>
      dispatch(
        taskDetailAction.completeSubTask({
          sub_task_id: subTaskId,
          taskId: taskId
        })
      ),
    // remind

    createRemindWithTimeDetail: data =>
      dispatch(taskDetailAction.postRemindWithTimeDetail(data)),
    createRemindWithDurationDetail: data =>
      dispatch(taskDetailAction.postRemindDuration(data)),
    updateRemindWithTimeDetail: ({ data, taskId }) =>
      dispatch(taskDetailAction.updateRemindWithTimeDetail({ data, taskId })),
    updateRemindWithDurationDetail: ({ data, taskId }) =>
      dispatch(taskDetailAction.updateRemindWithDuration({ data, taskId })),
    deleteRemindWByRemindId: ({ remindId, taskId }) =>
      dispatch(
        taskDetailAction.deleteRemind({ remind_id: remindId, taskId: taskId })
      ),
    // offer
    createOfferByTaskId: ({ data, taskId }) =>
      dispatch(taskDetailAction.createOffer({ data, taskId })),
    deleteOfferByTaskId: ({ offer_id, taskId }) =>
      dispatch(taskDetailAction.deleteOffer({ offer_id, taskId })),
    updateOfferById: ({ offerId, content, taskId }) =>
      dispatch(taskDetailAction.updateOffer({ offerId, content, taskId })),
    uploadDocumentToOfferById: (data, cb, taskId) =>
      dispatch(taskDetailAction.uploadDocumentToOffer(data, cb, taskId)),
    deleteDocumentToOfferById: (data, cb, taskId) =>
      dispatch(taskDetailAction.deleteDocumentToOffer(data, cb, taskId)),
    handleOfferById: ({ data, taskId }) =>
      dispatch(taskDetailAction.handleOffer({ data, taskId })),
    // command

    createCommandByTaskId: ({ task_id, content, type }) =>
      dispatch(taskDetailAction.createCommand({ task_id, content, type })),
    updateCommandByTaskId: ({ id, content, type, taskId }) =>
      dispatch(
        taskDetailAction.updateCommand({
          command_id: id,
          content,
          type,
          taskId
        })
      ),
    deleteCommandByCommandId: ({ command_id, task_id }) =>
      dispatch(taskDetailAction.deleteCommand({ command_id, task_id })),
    // Media Image File Link

    // Location
    getLocationByTaskId: taskId =>
      dispatch(taskDetailAction.getLocationTabPart({ taskId })),
    // Task Detail - cot phai

    // update Priority

    // Member

    createMemberToTask: (task_id, member_id) =>
      dispatch(taskDetailAction.createMember({ task_id, member_id })),
    deleteMemberToTask: (task_id, member_id) =>
      dispatch(taskDetailAction.deleteMember({ task_id, member_id })),
    // Member Priority
    getGroupPermission: () => dispatch(taskDetailAction.getPermission()),
    updateGroupPermission: data =>
      dispatch(taskDetailAction.updatePermission(data)),
    // Member Role
    createRoleTask: (name, description) =>
      dispatch(taskDetailAction.createRole({ name, description })),
    updateRoleTask: (user_role_id, name, description) =>
      dispatch(
        taskDetailAction.updateRole({ user_role_id, name, description })
      ),
    deleteRoleTask: user_role_id =>
      dispatch(taskDetailAction.deleteRole({ user_role_id })),

    //time

    // List Task Detail

    //  List Group Task

    //edit name and description task

    // get project group
    // getProjectGroup: () => dispatch(taskDetailAction.getProjectGroup()),

    searchSubTask: data => dispatch(taskDetailAction.searchSubTask(data)),
    searchRemind: data => dispatch(taskDetailAction.searchRemind(data)),
    searchImages: data => dispatch(taskDetailAction.searchImage(data)),
    searchFile: data => dispatch(taskDetailAction.searchFile(data)),
    searchLink: data => dispatch(taskDetailAction.searchLink(data)),
    searchDemand: data => dispatch(taskDetailAction.searchDemand(data)),
    searchOffer: data => dispatch(taskDetailAction.searchOffer(data)),

    //updateComplete

    closeNoticeModal: () => dispatch(closeNoticeModal()),
  };
};

export default JobDetailPage;
