import React from 'react';
import { connect } from 'react-redux';
import { routeSelector } from '../../selectors';
import DefaultGroupDetailPresenter from './presenters';
import { groupSelector } from './selectors';

function DefaultGroupDetail({
  group, route
}) {

  return (
    <DefaultGroupDetailPresenter
      group={group} route={route}
    />
  )
}

const mapStateToProps = state => {
  return {
    group: groupSelector(state),
    route: routeSelector(state),
  };
};

export default connect(
  mapStateToProps,
  null,
)(DefaultGroupDetail);
