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
  return {
    offer: state.taskDetail.taskOffer.offer.reverse(),

    pendingItems: state.taskDetail.taskOffer.pendingItems,
    approvedItems: state.taskDetail.taskOffer.approvedItems,
    
    remind: state.taskDetail.taskRemind.remind.reverse(),

    uncompleteSubTasks: state.taskDetail.subTask.uncompleteSubTasks,
    completeSubTasks: state.taskDetail.subTask.completeSubTasks,

    image: state.taskDetail.media.image,
    file: state.taskDetail.media.file,
    link: state.taskDetail.media.links,

    command: state.taskDetail.taskCommand.command.reverse(),
    commandItems: state.taskDetail.taskCommand.commandItems.reverse(),
    decisionItems: state.taskDetail.taskCommand.decisionItems.reverse(),

    taskId: state.taskDetail.commonTaskDetail.activeTaskId,
    location: state.taskDetail.location.locations,
    detailTask: state.taskDetail.detailTask.taskDetails,

    member: state.taskDetail.taskMember.member,
    memberNotAssigned: state.taskDetail.taskMember.memberNotAssigned
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
    // command 
    getCommandByTaskId: task_id => dispatch(taskDetailAction.getCommand({ task_id })),
    createCommandByTaskId: (task_id, content, type) => { dispatch(taskDetailAction.createCommand({ task_id, content, type })) },
    updateCommandByTaskId: (id, content, type) => { dispatch(taskDetailAction.updateCommand({ command_id: id, content, type })) },

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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);