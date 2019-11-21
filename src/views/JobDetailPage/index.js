import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions'

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
  }, [])

  return (
    <Container>
      <ListPart {...props} />
      <ChatPart {...props} />
      <TabPart  {...props} />
    </Container>
  )
}

const mapStateToProps = state => {
  // console.log('commanddddd', state.taskDetail.taskCommand.command)
  return {
    offer: state.taskDetail.taskOffer.offer,
    remind: state.taskDetail.taskRemind.remind,
    uncompleteSubTasks: state.taskDetail.subTask.uncompleteSubTasks,
    completeSubTasks: state.taskDetail.subTask.completeSubTasks,
    image: state.taskDetail.media.image,
    file: state.taskDetail.media.file,
    command: state.taskDetail.taskCommand.command,
    commandItems: state.taskDetail.taskCommand.commandItems,
    decisionItems: state.taskDetail.taskCommand.decisionItems,
    taskId: state.taskDetail.commonTaskDetail.activeTaskId
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
    // createRemindWithTimeDetail: () => dispatch(taskDetailAction.createRemindWithTime()),
    // createRemindWithDurationDetail: () => dispatch(taskDetailAction.createRemindWithDuration()),
    // updateRemindWithTimeDetail: () => dispatch(taskDetailAction.updateRemindWithTime()),
    // updateRemindWithDurationDetail: () => dispatch(taskDetailAction.updateRemindWithDuration()),
    deleteRemindWByRemindId: remindId => dispatch(taskDetailAction.deleteRemind({ remind_id: remindId })),
    // offer
    getOfferByTaskId: taskId => dispatch(taskDetailAction.getOffer({ taskId })),
    createOfferByTaskId: (createId, content) => { dispatch(taskDetailAction.createOffer({ createId, content })) },
    deleteOfferByTaskId: deleteId => dispatch(taskDetailAction.deleteOffer({ offer_id: deleteId })),
    updateOfferByOfferId: (updateId, content) => dispatch(taskDetailAction.updateOffer({ offer_id: updateId, content })),
    // command 
    getCommandByTaskId: task_id => dispatch(taskDetailAction.getCommand({ task_id })),
    createCommandByTaskId: (task_id, content, type) => { dispatch(taskDetailAction.createCommand({ task_id, content, type })) },
    updateCommandByTaskId: (id, content, type) => { dispatch(taskDetailAction.updateCommand({ command_id: id, content, type })) },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);