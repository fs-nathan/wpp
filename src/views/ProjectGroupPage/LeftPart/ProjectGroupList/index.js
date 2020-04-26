import { listIcon } from 'actions/icon/listIcon';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { sortProjectGroup } from 'actions/projectGroup/sortProjectGroup';
import { COPY_PROJECT, CustomEventDispose, CustomEventListener, SORT_PROJECT, SORT_PROJECT_GROUP, UPDATE_PROJECT } from 'constants/events.js';
import { filter, get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context as ProjectGroupContext } from '../../index';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupListPresenter from './presenters';
import { groupsSelector } from './selectors';

function ProjectList({
  groups, route, viewPermissions,
  doSortProjectGroup,
  doListProject,
  doListProjectGroup,
  doListIcon,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);
  const { projectGroupId } = useParams();
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setId(projectGroupId);
  }, [projectGroupId]);

  React.useEffect(() => {
    if (id === 'deleted') return;
    if (id !== null) {
      doListProject({
        groupProject: id,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListProject = () => {
        doListProject({
          groupProject: id,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        });
      };
      CustomEventListener(UPDATE_PROJECT, reloadListProject);
      CustomEventListener(SORT_PROJECT, reloadListProject);
      CustomEventListener(COPY_PROJECT, reloadListProject);
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadListProject);
        CustomEventDispose(SORT_PROJECT, reloadListProject);
        CustomEventDispose(COPY_PROJECT, reloadListProject);
      }
    }
    // eslint-disable-next-line
  }, [id, timeRange]);

  React.useEffect(() => {
    doListProjectGroup();
    const reloadListProjectGroup = () => {
      doListProjectGroup();
    }
    CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
    return () => {
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListIcon();
    // eslint-disable-next-line
  }, []);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroups = {
    ...groups,
    groups: filter(groups.groups, projectGroup => get(projectGroup, 'name', '').toLowerCase().includes(searchPatern.toLowerCase())),
  }

  const [openCreate, setOpenCreate] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        if (get(viewPermissions.permissions, 'manage_group_project', false)) {
          setOpenCreate(true);
        }
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectGroupListPresenter
        groups={newGroups} route={route} canModify={get(viewPermissions.permissions, 'manage_group_project', false)}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        handleSortProjectGroup={(projectGroupId, sortIndex) => doSortProjectGroup({ projectGroupId, sortIndex })}
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup open={openCreate} setOpen={setOpenCreate} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    groups: groupsSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSortProjectGroup: ({ projectGroupId, sortIndex }) => dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectList);
