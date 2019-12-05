import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions'

export const WrapperContext = React.createContext(null)
const Wrapper = WrapperContext.Provider

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(200px, 27%) minmax(400px, 44%) minmax(200px, 29%);
  grid-template-areas: 
    "list chat tab";
`;

function JobDetailPage(props) {
  useEffect(() => {
    props.getListGroupTaskByProjectId(props.projectId)
    props.getSubTaskByTaskId(props.taskId)
    props.getRemindByTaskId(props.taskId)
    props.getOfferByTaskId(props.taskId)
    props.getCommandByTaskId(props.taskId)
    props.getImageByTaskId(props.taskId)
    props.getFileByTaskId(props.taskId)
    props.getLinkByTaskId(props.taskId)
    props.getLocationByTaskId(props.taskId)
    props.getTaskDetailByTaskId(props.taskId)
    props.getMemberByTaskId(props.taskId)
    props.getMemberNotAssignedByTaskId(props.taskId)
    props.getTrackingTime(props.taskId)
    props.getListTaskDetailByProjectId(props.projectId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    
    <Wrapper value={{ ...props }}>
      
      <Container>
        
        <ListPart {...props} />
        <ChatPart {...props} />
        <TabPart {...props} />
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = state => {
  // console.log('state project id::::', state.taskDetail.listGroupTask.listGroupTask);
  
  return {
    // offer
    offer: state.taskDetail.taskOffer.offer.reverse(),

    pendingItems: state.taskDetail.taskOffer.pendingItems,
    approvedItems: state.taskDetail.taskOffer.approvedItems,
    // remind
    remind: state.taskDetail.taskRemind.remind,
    // subtask
    uncompleteSubTasks: state.taskDetail.subTask.uncompleteSubTasks,
    completeSubTasks: state.taskDetail.subTask.completeSubTasks,
    // media
    image: state.taskDetail.media.image,
    file: state.taskDetail.media.file,
    link: state.taskDetail.media.links,
    // command
    command: state.taskDetail.taskCommand.command.reverse(),
    commandItems: state.taskDetail.taskCommand.commandItems.reverse(),
    decisionItems: state.taskDetail.taskCommand.decisionItems.reverse(),
    // fake ID
    taskId: state.taskDetail.commonTaskDetail.activeTaskId,
    projectId: state.taskDetail.commonTaskDetail.activeProjectId,
    // location
    location: state.taskDetail.location.locations,
    // task Detail
    detailTask: state.taskDetail.detailTask.taskDetails,
    listTaskDetail: state.taskDetail.listDetailTask.listTaskDetail,
    // list group task
    listGroupTask: state.taskDetail.listGroupTask.listGroupTask,
    // member 
    member: state.taskDetail.taskMember.member,
    memberNotAssigned: state.taskDetail.taskMember.memberNotAssigned,

    listTime: state.taskDetail.trackingTime.listTime,


  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sub-task
    getSubTaskByTaskId: taskId => dispatch(taskDetailAction.getSubTask({ taskId })),
    postSubTaskByTaskId: (taskId, name) => dispatch(taskDetailAction.postSubTask({ task_id: taskId, name })),
    updateSubTaskByTaskId: (taskId, name) => dispatch(taskDetailAction.updateSubTask({ sub_task_id: taskId, name })),
    deleteSubTaskByTaskId: taskId => dispatch(taskDetailAction.deleteSubTask({ sub_task_id: taskId })),
    completeSubTaskByTaskId: taskId => dispatch(taskDetailAction.completeSubTask({ sub_task_id: taskId })),
    // remind
    getRemindByTaskId: taskId => dispatch(taskDetailAction.getRemind({ taskId })),
    createRemindWithTimeDetail: (data) => dispatch(taskDetailAction.postRemindWithTimeDetail(data)),
    createRemindWithDurationDetail: (data) => dispatch(taskDetailAction.postRemindDuration(data)),
    updateRemindWithTimeDetail: (data) => dispatch(taskDetailAction.updateRemindWithTimeDetail(data)),
    updateRemindWithDurationDetail: (data) => dispatch(taskDetailAction.updateRemindWithDuration(data)),
    deleteRemindWByRemindId: remindId => dispatch(taskDetailAction.deleteRemind({ remind_id: remindId })),
    // offer
    getOfferByTaskId: taskId => dispatch(taskDetailAction.getOffer({ taskId })),
    createOfferByTaskId: (createId, content) => { dispatch(taskDetailAction.createOffer({ createId, content })) },
    deleteOfferByTaskId: deleteId => dispatch(taskDetailAction.deleteOffer({ offer_id: deleteId })),
    updateOfferById: (updateId, content) => dispatch(taskDetailAction.updateOffer({ offer_id: updateId, content })),
    uploadDocumentToOfferById: (data, cb) => dispatch(taskDetailAction.uploadDocumentToOffer(data, cb)),
    deleteDocumentToOfferById: (data, cb) => dispatch(taskDetailAction.deleteDocumentToOffer(data, cb)),
    handleOfferById: (data) => dispatch(taskDetailAction.handleOffer(data)),
    // command 
    getCommandByTaskId: task_id => dispatch(taskDetailAction.getCommand({ task_id })),
    createCommandByTaskId: (task_id, content, type) => { dispatch(taskDetailAction.createCommand({ task_id, content, type })) },
    updateCommandByTaskId: (id, content, type) => { dispatch(taskDetailAction.updateCommand({ command_id: id, content, type })) },
    deleteCommandByCommandId: command_id => dispatch(taskDetailAction.deleteCommand({ command_id })),
    // Media Image File Link
    getImageByTaskId: taskId => dispatch(taskDetailAction.getImage({ taskId })),
    getFileByTaskId: taskId => dispatch(taskDetailAction.getFileTabPart({ taskId })),
    getLinkByTaskId: taskId => dispatch(taskDetailAction.getLinkTabPart({ taskId })),
    // Location
    getLocationByTaskId: taskId => dispatch(taskDetailAction.getLocationTabPart({ taskId })),
    // Task Detail - cot phai
    getTaskDetailByTaskId: taskId => dispatch(taskDetailAction.getTaskDetailTabPart({ taskId })),
    // update Priority
    updateTaskPriority: (task_id, priority) => dispatch(taskDetailAction.updatePriority({ task_id, priority })),
    // Member
    getMemberByTaskId: task_id => dispatch(taskDetailAction.getMember({ task_id })),
    getMemberNotAssignedByTaskId: task_id => dispatch(taskDetailAction.getMemberNotAssigned({ task_id })),
    createMemberToTask: (task_id, member_id) => dispatch(taskDetailAction.createMember({ task_id, member_id })),
    deleteMemberToTask: (task_id, member_id) => dispatch(taskDetailAction.deleteMember({ task_id, member_id })),
    // Member Role
    createRoleTask: (name) => dispatch(taskDetailAction.createRole({name})),
    updateRoleTask: (role_task_id, name) => dispatch(taskDetailAction.updateRole({ role_task_id, name })),
    deleteRoleTask: (role_task_id) => dispatch(taskDetailAction.deleteRole({ role_task_id })),
    //time
    getTrackingTime: task_id => dispatch(taskDetailAction.getTrackingTime(task_id)),
    // List Task Detail
    getListTaskDetailByProjectId: projectId => dispatch(taskDetailAction.getListTaskDetail({ project_id: projectId})),
    createJobByProjectId: (data) => dispatch(taskDetailAction.createTask(data)),
    //  List Group Task
    getListGroupTaskByProjectId: projectId => dispatch(taskDetailAction.getListGroupTask({ project_id: projectId})),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);