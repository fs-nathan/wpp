import React from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux'
import { getOffer } from '../../actions/taskDetail/taskDetailActions'

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(200px, 27%) minmax(400px, 44%) minmax(200px, 29%);
  grid-template-areas: 
    "list chat tab";
`;

function JobDetailPage(props) {
  // props.getOfferByTaskId("5da18ce8aa75001b8060eb12")
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
    getOfferByTaskId: taskId => dispatch(getOffer({ taskId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailPage);