import { listIcon } from 'actions/icon/listIcon';
import { deleteProject } from 'actions/project/deleteProject';
import { hideProject } from 'actions/project/hideProject';
import { listProject } from 'actions/project/listProject';
import { showProject } from 'actions/project/showProject';
import { sortProject } from 'actions/project/sortProject';
import { detailProjectGroup } from 'actions/projectGroup/detailProjectGroup';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import AlertModal from 'components/AlertModal';
import { useFilters } from 'components/CustomPopover';
import { COPY_PROJECT, CustomEventDispose, CustomEventListener, SORT_PROJECT, SORT_PROJECT_GROUP, UPDATE_PROJECT } from 'constants/events.js';
import { filter, get, reverse, sortBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { routeSelector } from '../../../ProjectPage/selectors';
import { Context as ProjectPageContext } from '../../index';
import CreateProjectModal from '../../Modals/CreateProject';
import EditProjectModal from '../../Modals/EditProject';
import NoProjectGroupModal from '../../Modals/NoProjectGroup';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import { viewPermissionsSelector } from '../../selectors';
import AllProjectTablePresenter from './presenters';
import { bgColorSelector, projectsSelector, showHidePendingsSelector } from './selectors';

function AllProjectTable({
  expand,
  handleExpand,
  projects, bgColor, showHidePendings,
  doDeleteProject,
  doHideProject,
  doShowProject,
  doSortProject,
  route, viewPermissions,
  doListProject,
  doListProjectGroup,
  doListIcon,
}) {

  const filters = useFilters();
  const {
    setTimeRange, timeRange,
    localOptions, setLocalOptions
  } = React.useContext(ProjectPageContext);
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

  const [filterType, setFilterType] = React.useState(localOptions.filterType);
  const [timeType, setTimeType] = React.useState(localOptions.timeType);
  const [sortType, setSortType] = React.useState({});

  const [newProjects, setNewProjects] = React.useState(projects);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType,
    }));
    // eslint-disable-next-line
  }, [timeType]);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      filterType,
    }));
    // eslint-disable-next-line
  }, [filterType]);

  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = filter(_projects, filters[filterType].option);
    _projects = sortBy(_projects, o => get(o, sortType.col));
    _projects = sortType.dir === -1 ? reverse(_projects) : _projects;
    setNewProjects({
      ...projects,
      projects: _projects,
    });
    // eslint-disable-next-line
  }, [projects, filterType, sortType]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openNoPG, setOpenNoPG] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editProps, setEditProps] = React.useState({});
  const [openSetting, setOpenSetting] = React.useState(false);
  const [settingProps, setSettingProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        if (get(viewPermissions.permissions, 'create_project', false)) {
          if (projects.projectGroupsCount === 0)
            setOpenNoPG(true);
          else
            setOpenCreate(true);
        }
        return;
      }
      case 'UPDATE': {
        setOpenEdit(true);
        setEditProps(props);
        return;
      }
      case 'SETTING': {
        setOpenSetting(true);
        setSettingProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <AllProjectTablePresenter
        expand={expand} handleExpand={handleExpand} showHidePendings={showHidePendings} route={route}
        projects={newProjects}
        bgColor={bgColor}
        canCreate={get(viewPermissions.permissions, 'create_project', false)}
        filterType={filterType} handleFilterType={type => setFilterType(type)}
        timeType={timeType} handleTimeType={type => setTimeType(type)}
        handleSortType={type => setSortType(oldType => {
          const newCol = type;
          const newDir = type === oldType.col ? -oldType.dir : 1;
          return {
            col: newCol,
            dir: newDir,
          }
        })}
        handleShowOrHideProject={project =>
          get(project, 'visibility', false)
            ? doHideProject({ projectId: get(project, 'id') })
            : doShowProject({ projectId: get(project, 'id') })
        }
        handleDeleteProject={project => doDeleteProject({ projectId: get(project, 'id') })}
        handleSortProject={sortData =>
          doSortProject({ sortData })
        }
        handleOpenModal={doOpenModal}
        handleTimeRange={(start, end) => setTimeRange({
          timeStart: start,
          timeEnd: end,
        })}
      />
      <CreateProjectModal
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <NoProjectGroupModal
        open={openNoPG}
        setOpen={setOpenNoPG}
      />
      <EditProjectModal
        open={openEdit}
        setOpen={setOpenEdit}
        {...editProps}
      />
      <ProjectSettingModal
        open={openSetting}
        setOpen={setOpenSetting}
        {...settingProps}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    projects: projectsSelector(state),
    bgColor: bgColorSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doSortProject: ({ sortData, groupId }) =>
      dispatch(sortProject({ sortData, groupId })),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDetailProjectGroup: ({ projectGroupId }, quite) =>
      dispatch(detailProjectGroup({ projectGroupId }, quite))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectTable);
