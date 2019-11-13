import React, {useEffect} from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux'
import { getOffer, getSubTask } from '../../actions/taskDetail/taskDetailActions'

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
    props.getOfferByTaskId("5da18ce8aa75001b8060eb12")
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
    offer: state.taskDetail.taskOffer.offer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sub-task
    getSubTaskByTaskId: taskId => dispatch(getSubTask({ taskId })),


    // offer
    getOfferByTaskId: taskId => dispatch(getOffer({ taskId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);