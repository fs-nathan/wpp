import {listIcon} from 'actions/icon/listIcon';
import {setProjectGroup} from 'actions/localStorage';
import {deleteProject} from 'actions/project/deleteProject';
import {hideProject} from 'actions/project/hideProject';
import {listProject} from 'actions/project/listProject';
import {showProject} from 'actions/project/showProject';
import {sortProject} from 'actions/project/sortProject';
import {detailProjectGroup} from 'actions/projectGroup/detailProjectGroup';
import {listProjectGroup} from 'actions/projectGroup/listProjectGroup';
import {useFilters, useTimes} from 'components/CustomPopover';
import {CustomEventDispose, CustomEventListener, SORT_PROJECT, SORT_PROJECT_GROUP} from 'constants/events.js';
import {filter, get, reverse, sortBy} from 'lodash';
import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {routeSelector} from '../../../ProjectPage/selectors';
import CreateProjectModal from '../../Modals/CreateProject';
import DeleteProjectModal from '../../Modals/DeleteProject';
import EditProjectModal from '../../Modals/EditProject';
import NoProjectGroupModal from '../../Modals/NoProjectGroup';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import {localOptionSelector, viewPermissionsSelector} from '../../selectors';
import AllProjectTablePresenter from './presenters';
import {bgColorSelector, projectsSelector, showHidePendingsSelector} from './selectors';
import {CREATE_PROJECT} from "constants/events";
import GuideLineAddUserModal from "../../Modals/GuideLineAddUserModal";
import MembersSettingModal from "../../../ProjectPage/Modals/MembersSetting";

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
  localOption,
  doSetProjectGroup, type_data = null
}) {
  const times = useTimes();
  const { filterType, timeType, workType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    });
  }, [timeType]);

  const [sortType, setSortType] = React.useState({});
  const [newProjects, setNewProjects] = React.useState(projects);
  const filters = useFilters();
  const params = new URLSearchParams(window.location.search);
  const groupID = params.get('groupID');
  React.useEffect(() => {
    if (groupID === 'deleted') return;
    doListProject({
      groupProject: groupID,
      timeStart: get(timeRange, 'timeStart')
        ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
        : undefined,
      timeEnd: get(timeRange, 'timeEnd')
        ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
        : undefined,
      type_data
    });
    const reloadListProject = () => {
      doListProject({
        groupProject: groupID,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
        type_data
      });
    };
    CustomEventListener(SORT_PROJECT, reloadListProject);
    CustomEventListener(CREATE_PROJECT.SUCCESS, reloadListProject);
    return () => {
      CustomEventDispose(SORT_PROJECT, reloadListProject);
      CustomEventDispose(CREATE_PROJECT.SUCCESS, reloadListProject);
    }
    // eslint-disable-next-line
  }, [groupID, timeRange, type_data]);

  React.useEffect(() => {
    doListProjectGroup({
      timeStart: get(timeRange, 'timeStart')
        ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
        : undefined,
      timeEnd: get(timeRange, 'timeEnd')
        ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
        : undefined,
    });
    const reloadListProjectGroup = () => {
      doListProjectGroup({
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
    }
    CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(CREATE_PROJECT.SUCCESS, reloadListProjectGroup);
    return () => {
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(CREATE_PROJECT.SUCCESS, reloadListProjectGroup);
    }
    // eslint-disable-next-line
  }, [timeRange]);
  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = filter(_projects, filters[filterType].option);
    setNewProjects({...projects, projects: _projects});
  }, [filterType, projects.projects]);

  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = sortBy(_projects, o => get(o, sortType.col));
    _projects = sortType.dir === -1 ? reverse(_projects) : _projects;
    setNewProjects({
      ...projects,
      projects: _projects,
    });
  }, [projects, sortType]);

  const [guideLineModal, setGuideLineModal] = React.useState(false);
  const [newCreatedBoard, setNewCreatedBoard] = React.useState(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [createProps, setCreateProps] = React.useState({});
  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);
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
            setCreateProps({
              groupID,
              work_types: get(projects,'group_work_types'),
              ...props
            });
        }
        return;
      }
      case 'UPDATE': {
        setOpenEdit(true);
        setEditProps({
          groupID,
          ...props,
        });
        return;
      }
      case 'SETTING': {
        setOpenSetting(true);
        setSettingProps({
          groupID,
          ...props
        });
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps({
          groupID,
          ...props
        });
        return;
      }
      default: return;
    }
  }
  React.useEffect(() => {
    CustomEventListener(CREATE_PROJECT.SUCCESS, (e) => {
      setGuideLineModal(true);
      setNewCreatedBoard(e.detail.project_id);
    });
    return () => {
      CustomEventDispose(CREATE_PROJECT.SUCCESS, (e) => {
        setGuideLineModal(true);
        setNewCreatedBoard(e.detail.project_id);
      });
    }
  }, []);
  return (
    <>
      <AllProjectTablePresenter
        expand={expand} handleExpand={handleExpand} showHidePendings={showHidePendings} route={route}
        projects={newProjects}
        bgColor={bgColor} type_data={type_data}
        canCreate={get(viewPermissions.permissions, 'create_project', false)}
        filterType={filterType}
        handleFilterType={filterType => doSetProjectGroup({
          ...localOption,
          filterType,
        })}
        timeType={timeType}
        workTypeLocal={workType}
        handleTimeType={timeType => doSetProjectGroup({
          ...localOption,
          timeType,
        })}
        handleWorkTypeChange={workType => doSetProjectGroup({
          ...localOption,
          workType
        })}
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
        groupID={groupID}
      />
      <CreateProjectModal
        open={openCreate}
        setOpen={setOpenCreate}
        {...createProps}
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
        type_data={type_data}
        projectGroupId={groupID}
      />
      <DeleteProjectModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
      <GuideLineAddUserModal
        open={guideLineModal} setOpen={setGuideLineModal}
        handleAddNow={() => setOpenMemberSetting(true)}
      />
      <MembersSettingModal
        open={openMemberSetting}
        setOpen={setOpenMemberSetting}
        project_id={newCreatedBoard}
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
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (options,quite) => dispatch(listProjectGroup(options,quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doSortProject: ({ sortData, groupId }) =>
      dispatch(sortProject({ sortData, groupId })),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDetailProjectGroup: ({ projectGroupId }, quite) =>
      dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doSetProjectGroup: (value) => dispatch(setProjectGroup(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectTable);
