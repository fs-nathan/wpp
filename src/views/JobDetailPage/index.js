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
    props.getSubTaskByTaskId("5da183cfc46d8515e03fa9e8")
    props.getRemindByTaskId("5da1821ad219830d90402fd8")
    props.getOfferByTaskId("5da18ce8aa75001b8060eb12")
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

  return {
    offer: state.taskDetail.taskOffer.offer,
    remind: state.taskDetail.taskRemind.remind,
    subTasks: state.taskDetail.subTask.subTasks,
   
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sub-task
    getSubTaskByTaskId: taskId => dispatch(taskDetailAction.getSubTask({ taskId })),
    postSubTaskByTaskId: (taskId, name) => dispatch(taskDetailAction.postSubTask({ task_id: taskId, name })),
    updateSubTaskByTaskId: (taskId, name) => dispatch(taskDetailAction.updateSubTask({ sub_task_id: taskId, name})),
    deleteSubTaskByTaskId: taskId => dispatch(taskDetailAction.deleteSubTask({sub_task_id: taskId})),
    // remind
    getRemindByTaskId: taskId => dispatch(taskDetailAction.getRemind({taskId})),
    // offer
    getOfferByTaskId: taskId => dispatch(taskDetailAction.getOffer({ taskId })),
    createOfferByTaskId: (createId, content) => {dispatch(taskDetailAction.createOffer({ createId, content }))},
    deleteOfferByTaskId: deleteId => dispatch(taskDetailAction.deleteOffer({ offer_id: deleteId })),
    updateOfferByOfferId: (updateId, content) => dispatch(taskDetailAction.updateOffer({ offer_id: updateId, content }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);