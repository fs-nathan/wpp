import { listIcon } from 'actions/icon/listIcon';
import { listProject } from 'actions/project/listProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { sortProjectGroup } from 'actions/projectGroup/sortProjectGroup';
import { useTimes } from 'components/CustomPopover';
import { CustomEventDispose, CustomEventListener, SORT_PROJECT, SORT_PROJECT_GROUP } from 'constants/events.js';
import { filter, get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import { localOptionSelector, routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupListPresenter from './presenters';
import { groupsSelector } from './selectors';

function ProjectList({
  groups, route, viewPermissions,
  doSortProjectGroup,
  doListProject,
  doListProjectGroup,
  doListIcon,
  localOption,
}) {

  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    });
  }, [timeType]);

  const { projectGroupId } = useParams();
  React.useEffect(() => {
    if (projectGroupId !== null) {
      doListProject({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListProject = () => {
        doListProject({
          groupProject: projectGroupId,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        });
      };
      CustomEventListener(SORT_PROJECT, reloadListProject);
      return () => {
        CustomEventDispose(SORT_PROJECT, reloadListProject);
      }
    }
  }, [projectGroupId, timeRange]);

  React.useEffect(() => {
    doListProjectGroup();
    const reloadListProjectGroup = () => {
      doListProjectGroup();
    }
    CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
    return () => {
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
    }
  }, []);

  React.useEffect(() => {
    doListIcon();
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
    localOption: localOptionSelector(state),
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
