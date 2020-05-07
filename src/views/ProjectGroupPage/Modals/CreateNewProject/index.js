import { createProject } from 'actions/project/createProject';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import CreateNewProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CreateNewProject({
  open, setOpen,
  groups,
  doCreateProject,
  doListProjectGroup,
  doReload,
  projectGroupId = undefined,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);

  React.useEffect(() => {
    doListProjectGroup();
    // eslint-disable-next-line
  }, []);

  return (
    <CreateNewProjectPresenter
      open={open} setOpen={setOpen}
      projectGroupId={projectGroupId}
      doReload={() => doReload({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      })}
      groups={groups}
      handleCreateProject={({ name, description, projectGroupId, priority, currency }) =>
        doCreateProject({ name, description, projectGroupId, priority, currency })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    groups: groupsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options) => dispatch(listProject(options, true)),
    doCreateProject: ({ name, description, projectGroupId, priority, currency }) => dispatch(createProject({ name, description, projectGroupId, priority, currency })),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewProject);
