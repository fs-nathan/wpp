import { listProject } from 'actions/project/listProject';
import { detailDefaultGroup } from 'actions/projectGroup/detailDefaultGroup';
import React from 'react';
import { connect } from 'react-redux';
import { routeSelector } from '../../selectors';
import DefaultGroupDetailPresenter from './presenters';
import { groupSelector } from './selectors';

function DefaultGroupDetail({
  group, route,
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

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doDetailDefaultGroup: (quite) => dispatch(detailDefaultGroup(quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultGroupDetail);
