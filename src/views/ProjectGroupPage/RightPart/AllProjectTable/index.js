import React from 'react';
import { get, sortBy, reverse, filter } from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context as ProjectPageContext } from '../../index';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import CreateProjectModal from '../../Modals/CreateProject';
import EditProjectModal from '../../Modals/EditProject';
import AlertModal from '../../../../components/AlertModal';
import { listProject } from '../../../../actions/project/listProject';
import { sortProject } from '../../../../actions/project/sortProject';
import { detailProjectGroup } from '../../../../actions/projectGroup/detailProjectGroup';
import { deleteProject } from '../../../../actions/project/deleteProject';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
import { bgColorSelector, projectsSelector } from './selectors';
import { filters } from './constants';
import AllProjectTablePresenter from './presenters';

function AllProjectTable({
  expand,
  handleExpand,
  projects, bgColor,
  doDeleteProject,
  doHideProject,
  doShowProject,
  doSortProject,
  isDefault = false,
}) {

  const { setTimeRange, setProjectGroupId } = React.useContext(ProjectPageContext);
  const { projectGroupId } = useParams();

  React.useEffect(() => {
    if (isDefault) setProjectGroupId('default');
    else setProjectGroupId(projectGroupId);
  }, [setProjectGroupId, isDefault, projectGroupId])

  const [filterType, setFilterType] = React.useState(1);
  const [timeType, setTimeType] = React.useState(5);
  const [sortType, setSortType] = React.useState({});

  const [newProjects, setNewProjects] = React.useState(projects);

  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = filter(_projects, filters[filterType].option);
    _projects = (sortType.col === 'state_name'
      ? sortBy(_projects, [
        o => get(o, 'visibility'),
        o => get(o, sortType.col) 
      ])
      : sortBy(_projects, [
        o => get(o, sortType.col)
      ]));
    _projects = sortType.dir === -1 ? reverse(_projects) : _projects;
    setNewProjects({
      ...projects,
      projects: _projects,
    });
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
        setOpenCreate(true);
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
        expand={expand} handleExpand={handleExpand}
        projects={newProjects} bgColor={bgColor}
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
        handleSortProject={sortData => null
          //doSortProject({ sortData, groupId: isDefault ? '__default__' : projectGroupId })
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
