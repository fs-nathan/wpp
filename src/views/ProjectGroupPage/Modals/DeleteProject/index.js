import { deleteProject } from 'actions/project/deleteProject';
import { listProject } from 'actions/project/listProject';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import DeleteProjectPresenter, { DeleteProjectNoReload as DeleteProjectNoReloadPresenter } from './presenters';

function ProjectDelete({
  selectedProject = null,
  open, setOpen,
  doDeleteProject,
  doReloadProject,
  projectGroupId = undefined,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);

  return (
    <DeleteProjectPresenter
      projectGroupId={projectGroupId}
      doReloadProject={() => doReloadProject({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      })}
      open={open} setOpen={setOpen}
      handleDeleteProject={() =>
        doDeleteProject({
          projectId: get(selectedProject, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadProject: (options) => dispatch(listProject(options, true)),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectDelete);

function _ProjectDeleteNoReload({
  selectedProject = null,
  open, setOpen,
  doDeleteProject,
}) {
  return (
    <DeleteProjectNoReloadPresenter
      open={open} setOpen={setOpen}
      handleDeleteProject={() =>
        doDeleteProject({
          projectId: get(selectedProject, 'id'),
        })
      }
    />
  )
}

export const ProjectDeleteNoReload = connect(
  null,
  mapDispatchToProps,
)(_ProjectDeleteNoReload);