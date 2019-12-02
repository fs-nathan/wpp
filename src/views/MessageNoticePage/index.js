import React from 'react';
import styled from 'styled-components';
import ListPart from './ListPart';
import TablePart from './TablePart';
import { connect } from 'react-redux';
import { filterDocs, setAllDataDocuments } from '../../actions/documents';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(800px, 3fr);
  grid-template-areas: 'list table';
`;

function DocumentPage(props) {
  return (
    <Container>
      <ListPart {...props} />
      <TablePart {...props} />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    data: state.documents,
    docs: state.documents.docs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterDocs: payload => dispatch(filterDocs(payload)),
    setData: payload => dispatch(setAllDataDocuments(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
