import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux'
import { getOffer, createOffer, getSubTask, postSubTask, updateSubTask, deleteSubTask } from '../../actions/taskDetail/taskDetailActions'

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
    subTasks: state.taskDetail.subTask.subTasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sub-task
    getSubTaskByTaskId: taskId => dispatch(getSubTask({ taskId })),
    postSubTaskByTaskId: (taskId, name) => dispatch(postSubTask({ task_id: taskId, name })),
    updateSubTaskByTaskId: (taskId, name) => dispatch(updateSubTask({ sub_task_id: taskId, name})),
    deleteSubTaskByTaskId: (taskId) => dispatch(deleteSubTask({sub_task_id: taskId})),
    // offer
    getOfferByTaskId: taskId => dispatch(getOffer({ taskId })),
    createOfferByTaskId: (createId, content) => {
      dispatch(createOffer({ createId, content }))}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);