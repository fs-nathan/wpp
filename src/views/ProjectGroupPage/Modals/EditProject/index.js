import { detailProject } from 'actions/project/detailProject';
import { listProject } from 'actions/project/listProject';
import { updateProject } from 'actions/project/updateProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import EditProjectPresenter, { EditProjectNoReload as EditProjectNoReloadPresenter } from './presenters';
import { groupsSelector } from './selectors';

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  doUpdateProject,
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
    <EditProjectPresenter
      curProject={curProject}
      projectGroupId={projectGroupId}
      doReload={() =>
        doReload({
          groupProject: projectGroupId,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        }, get(curProject, 'id'))
      }
      open={open} setOpen={setOpen}
      groups={groups}
      handleEditProject={({ name, description, projectGroupId, priority, currency }) =>
        doUpdateProject({ projectId: get(curProject, 'id'), name, description, projectGroupId, priority, currency })
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
    doReload: (options, projectId) => {
      options !== null && dispatch(listProject(options, true));
      dispatch(detailProject({ projectId }, true));
    },
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency })),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);

function _EditProjectNoReload({
  curProject = null,
  open, setOpen,
  groups,
  doUpdateProject,
  doListProjectGroup,
  doReload,
}) {

  React.useEffect(() => {
    doListProjectGroup();
    // eslint-disable-next-line
  }, []);

  return (
    <EditProjectNoReloadPresenter
      curProject={curProject}
      doReload={() =>
        doReload(null, get(curProject, 'id'))
      }
      open={open} setOpen={setOpen}
      groups={groups}
      handleEditProject={({ name, description, projectGroupId, priority, currency }) =>
        doUpdateProject({ projectId: get(curProject, 'id'), name, description, projectGroupId, priority, currency })
      }
    />
  )
}

export const EditProjectNoReload = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_EditProjectNoReload);