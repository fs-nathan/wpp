import React from 'react';
import { connect } from 'react-redux';
import DefaultGroupDetailPresenter from './presenters';
import { groupSelector } from './selectors';

function DefaultGroupDetail({ 
  group, 
}) {
  
  return (
    <DefaultGroupDetailPresenter 
      group={group}
    />
  )
}

const mapStateToProps = state => {
  return {
    group: groupSelector(state),
  };
};

export default connect(
  mapStateToProps,
  null,
)(DefaultGroupDetail);
