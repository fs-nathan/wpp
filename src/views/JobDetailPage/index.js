import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux'
import { getOffer, getSubTask, postSubTask } from '../../actions/taskDetail/taskDetailActions'

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
    // props.getOfferByTaskId("5da18ce8aa75001b8060eb12");
    props.getSubTaskByTaskId("5da183cfc46d8515e03fa9e8")
    // ....
  }, [])

  return (
    <Container>
      <ListPart {...props} />
      <ChatPart {...props} />
      <TabPart {...props} />
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

    // offer
    getOfferByTaskId: taskId => dispatch(getOffer({ taskId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);