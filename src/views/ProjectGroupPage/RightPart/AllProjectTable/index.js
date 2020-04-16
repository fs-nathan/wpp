import { filter, get, reverse, sortBy } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProject } from '../../../../actions/project/deleteProject';
import { hideProject } from '../../../../actions/project/hideProject';
import { listProject } from '../../../../actions/project/listProject';
import { showProject } from '../../../../actions/project/showProject';
import { sortProject } from '../../../../actions/project/sortProject';
import { detailProjectGroup } from '../../../../actions/projectGroup/detailProjectGroup';
import AlertModal from '../../../../components/AlertModal';
import { useFilters } from '../../../../components/CustomPopover';
import { routeSelector } from '../../../ProjectPage/selectors';
import { Context as ProjectPageContext } from '../../index';
import CreateProjectModal from '../../Modals/CreateProject';
import EditProjectModal from '../../Modals/EditProject';
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
  isDefault = false,
  route, viewPermissions,
}) {

  const filters = useFilters();
  const {
    setTimeRange,
    setProjectGroupId,
    setStatusProjectId,
    localOptions, setLocalOptions
  } = React.useContext(ProjectPageContext);
  const { projectGroupId } = useParams();

  React.useEffect(() => {
    if (isDefault) setProjectGroupId('default');
    else setProjectGroupId(projectGroupId);
  }, [setProjectGroupId, isDefault, projectGroupId])

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
      <EditProjectModal
        open={openEdit}
        setOpen={setOpenEdit}
        {...editProps}
      />
      <ProjectSettingModal
        open={openSetting}
        setOpen={setOpenSetting}
        setStatusProjectId={setStatusProjectId}
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
