import { copyProject } from 'actions/project/copyProject';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { filter, get, map } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import CopyProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CopyProject({
  open, setOpen,
  groups,
  doCopyProject,
  doListProjectGroup,
  doListProject,
  doReload,
  projectGroupId = undefined,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);

  React.useEffect(() => {
    doListProjectGroup();
    // eslint-disable-next-line
  }, []);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroups = map(groups.groups, (projectGroup) => {
    const ownedProjects = filter(
      projectGroup.projects,
      project => get(project, 'name').toLowerCase().includes(searchPatern.toLowerCase())
    );
    return {
      ...projectGroup,
      projects: ownedProjects,
    };
  });

  return (
    <CopyProjectPresenter
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
      searchPatern={searchPatern} setSearchPatern={setSearchPatern}
      groups={newGroups}
      handleCopyProject={(projectId, name, description, startDate, isCopyMember) =>
        doCopyProject({
          projectId: projectId === 'default' ? null : projectId,
          name,
          description,
          startDate,
          isCopyMember,
        })
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
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doCopyProject: ({ projectId, name, description, startDate, isCopyMember }) => dispatch(copyProject({ projectId, name, description, startDate, isCopyMember })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
