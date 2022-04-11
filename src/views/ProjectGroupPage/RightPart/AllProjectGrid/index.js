import { listIcon } from "actions/icon/listIcon";
import { setProjectGroup } from "actions/localStorage";
import { deleteProject } from "actions/project/deleteProject";
import { hideProject } from "actions/project/hideProject";
import { listProject } from "actions/project/listProject";
import { showProject } from "actions/project/showProject";
import { sortProject } from "actions/project/sortProject";
import { detailProjectGroup } from "actions/projectGroup/detailProjectGroup";
import { listProjectGroup } from "actions/projectGroup/listProjectGroup";
import { useFilters, useTimes } from "components/CustomPopover";
import { CustomTableWrapper } from "components/CustomTable";
import { CREATE_PROJECT } from "constants/events";
import {
  CustomEventDispose,
  CustomEventListener,
  SORT_PROJECT,
  SORT_PROJECT_GROUP,
} from "constants/events.js";
import { filter, get, reverse, size, sortBy } from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import ColorGroupPickerModal from "views/ProjectGroupPage/Modals/ColorGroupPickerModal";
import MembersSettingModal from "../../../ProjectPage/Modals/MembersSetting";
import { routeSelector } from "../../../ProjectPage/selectors";
import AddToPersonalBoardModal from "../../Modals/AddPersonalBoard";
import CreateProjectModal from "../../Modals/CreateProject";
import DeleteProjectModal from "../../Modals/DeleteProject";
import EditProjectModal from "../../Modals/EditProject";
import GuideLineAddUserModal from "../../Modals/GuideLineAddUserModal";
import NoProjectGroupModal from "../../Modals/NoProjectGroup";
import ProjectSettingModal from "../../Modals/ProjectSetting";
import { localOptionSelector, viewPermissionsSelector } from "../../selectors";
import AllProjectTablePresenter from "./presenters";
import {
  bgColorSelector,
  projectsSelector,
  showHidePendingsSelector,
} from "./selectors";

import LogoManagerModal from "../../../DepartmentPage/Modals/LogoManager";
import { sortProjectGroup } from "actions/projectGroup/sortProjectGroup";
import DeleteProjectGroup from "views/ProjectGroupPage/Modals/DeleteProjectGroup";
import { editProjectGroup } from "actions/projectGroup/editProjectGroup";
import CreateProjectGroup from "views/ProjectGroupPage/Modals/CreateProjectGroup";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllProjectGrid({
  expand,
  handleExpand,
  projects,
  bgColor,
  showHidePendings,
  doDeleteProject,
  doHideProject,
  doShowProject,
  doSortProject,
  doSortProjectGroup,
  route,
  viewPermissions,
  doListProject,
  doListProjectGroup,
  localOption,
  doSetProjectGroup,
  doEditProjectGroup,
  doReloadList,
  type_data = null,
}) {
  const times = useTimes();
  const { filterType, timeType, workType, labelType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return {
      timeStart,
      timeEnd,
    };
  }, [timeType]);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [sortType, setSortType] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [newProjects, setNewProjects] = React.useState(projects);
  const [openPersonalBoard, setOpenPersonalBoard] = React.useState(false);

  const filters = useFilters();
  const query = useQuery();
  const groupID = query.get("groupID");

  React.useEffect(() => {
    if (groupID === "deleted") return;
    doListProject({
      groupProject: groupID,
      timeStart: get(timeRange, "timeStart")
        ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
        : undefined,
      timeEnd: get(timeRange, "timeEnd")
        ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
        : undefined,
      type_data,
    });
    const reloadListProject = () => {
      doListProject({
        groupProject: groupID,
        timeStart: get(timeRange, "timeStart")
          ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
          : undefined,
        timeEnd: get(timeRange, "timeEnd")
          ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
          : undefined,
        type_data,
      });
    };
    CustomEventListener(SORT_PROJECT, reloadListProject);
    CustomEventListener(CREATE_PROJECT.SUCCESS, reloadListProject);
    return () => {
      CustomEventDispose(SORT_PROJECT, reloadListProject);
      CustomEventDispose(CREATE_PROJECT.SUCCESS, reloadListProject);
    };
    // eslint-disable-next-line
  }, [groupID, timeRange, type_data]);

  React.useEffect(() => {
    doListProjectGroup({
      timeStart: get(timeRange, "timeStart")
        ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
        : undefined,
      timeEnd: get(timeRange, "timeEnd")
        ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
        : undefined,
    });
    const reloadListProjectGroup = () => {
      doListProjectGroup({
        timeStart: get(timeRange, "timeStart")
          ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
          : undefined,
        timeEnd: get(timeRange, "timeEnd")
          ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
          : undefined,
      });
    };
    CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(CREATE_PROJECT.SUCCESS, reloadListProjectGroup);
    return () => {
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(CREATE_PROJECT.SUCCESS, reloadListProjectGroup);
    };
    // eslint-disable-next-line
  }, [timeRange]);

  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = sortBy(_projects, (o) => get(o, sortType.col));
    _projects = sortType.dir === -1 ? reverse(_projects) : _projects;
    if (filters?.[filterType]?.option)
      _projects = filter(_projects, filters[filterType].option);
    if (labelType && labelType !== -1)
      _projects = filter(_projects, { project_label: { id: labelType } });
    if (labelType && labelType === -1)
      _projects = filter(_projects, { project_label: {} });
    if (searchValue.trim().length)
      _projects = _projects.filter((obj) =>
        JSON.stringify(obj.name)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

    setNewProjects({ ...projects, projects: _projects });
    setIsFiltering(size(projects.projects) > 0);
  }, [projects, sortType, filterType, labelType, searchValue]);

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
    };
  }, []);

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
  const [openDeleteGroup, setOpenDeleteGroup] = React.useState(false);
  const [deleteGroupProps, setDeleteGroupProps] = React.useState({});
  const [openColorPickerGroup, setOpenColorPickerGroup] = React.useState(false);
  const [colorPickerProps, setColorPickerProps] = React.useState({});
  const [openLogo, setOpenLogo] = React.useState(false);
  const [logoProps, setLogoProps] = React.useState({});
  const [activeLoading, setActiveLoading] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case "CREATE": {
        if (projects.projectGroupsCount === 0) setOpenNoPG(true);
        else setOpenCreate(true);
        setCreateProps({
          groupID,
          work_types: get(projects, "group_work_types"),
          ...props,
        });
        return;
      }

      case "UPDATE": {
        setOpenEdit(true);
        setEditProps({
          groupID,
          ...props,
        });
        return;
      }
      case "SETTING": {
        setOpenSetting(true);
        setSettingProps({
          groupID,
          ...props,
        });
        return;
      }
      case "ALERT": {
        setOpenAlert(true);
        setAlertProps({
          groupID,
          ...props,
        });
        return;
      }
      case "DELETE_GROUP": {
        setOpenDeleteGroup(true);
        setDeleteGroupProps({
          groupID,
          ...props,
        });
        return;
      }
      case "ADD_PERSONAL_BOARD": {
        setOpenPersonalBoard(true);
        return;
      }
      case "COLOR_PICKER": {
        setOpenColorPickerGroup(true);
        setColorPickerProps({
          groupID,
          ...props,
        });
        return;
      }
      case "LOGO": {
        setOpenLogo(true);
        setLogoProps({
          groupID,
          ...props,
        });
        return;
      }
      default:
        return;
    }
  }

  const _handleSearch = (value) => {
    setSearchValue(value);
  };
  console.log("alertProps", alertProps);

  return (
    <>
      <CustomTableWrapper>
        <AllProjectTablePresenter
          expand={expand}
          handleExpand={handleExpand}
          showHidePendings={showHidePendings}
          route={route}
          projects={newProjects}
          bgColor={bgColor}
          type_data={type_data}
          filterType={filterType}
          labelType={labelType}
          doReloadList={() => doReloadList()}
          handleSearch={_handleSearch}
          handleFilterType={(filterType) =>
            doSetProjectGroup({
              ...localOption,
              filterType,
            })
          }
          handleFilterLabel={(labelID) =>
            doSetProjectGroup({
              ...localOption,
              labelType: labelID,
            })
          }
          timeType={timeType}
          workTypeLocal={workType}
          handleTimeType={(timeType) =>
            doSetProjectGroup({
              ...localOption,
              timeType,
            })
          }
          handleWorkTypeChange={(workType) =>
            doSetProjectGroup({
              ...localOption,
              workType,
            })
          }
          handleSortType={(type) =>
            setSortType((oldType) => {
              const newCol = type;
              const newDir = type === oldType.col ? -oldType.dir : 1;
              return {
                col: newCol,
                dir: newDir,
              };
            })
          }
          handleShowOrHideProject={(project) =>
            get(project, "visibility", false)
              ? doHideProject({ projectId: get(project, "id") })
              : doShowProject({ projectId: get(project, "id") })
          }
          handleDeleteProject={(project) =>
            doDeleteProject({ projectId: get(project, "id") })
          }
          handleSortProject={(sortData) => doSortProject({ sortData })}
          handleSortProjectGroup={(projectGroupId, sortIndex) =>
            doSortProjectGroup(projectGroupId, sortIndex)
          }
          handleUpdateProjectGroup={doEditProjectGroup}
          handleOpenModal={doOpenModal}
          groupID={groupID}
          isFiltering={isFiltering}
          setIsFiltering={setIsFiltering}
          activeLoading={activeLoading}
          setActiveLoading={setActiveLoading}
          canModify={get(
            viewPermissions.permissions,
            "manage_group_project",
            false
          )}
        />
      </CustomTableWrapper>
      <CreateProjectModal
        open={openCreate}
        setOpen={setOpenCreate}
        {...createProps}
      />
      <CreateProjectGroup
        open={openEdit}
        setOpen={setOpenEdit}
        {...editProps}
      />
      <NoProjectGroupModal open={openNoPG} setOpen={setOpenNoPG} />
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
      <DeleteProjectGroup
        open={openDeleteGroup}
        setOpen={setOpenDeleteGroup}
        {...deleteGroupProps}
      />

      <GuideLineAddUserModal
        open={guideLineModal}
        setOpen={setGuideLineModal}
        handleAddNow={() => {
          setGuideLineModal(false);
          setOpenMemberSetting(true);
        }}
      />
      <MembersSettingModal
        open={openMemberSetting}
        setOpen={setOpenMemberSetting}
        project_id={newCreatedBoard}
      />
      <AddToPersonalBoardModal
        open={openPersonalBoard}
        setOpen={setOpenPersonalBoard}
      />
      <ColorGroupPickerModal
        open={openColorPickerGroup}
        setOpen={setOpenColorPickerGroup}
        {...colorPickerProps}
      />
      <LogoManagerModal open={openLogo} setOpen={setOpenLogo} {...logoProps} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: projectsSelector(state),
    bgColor: bgColorSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doReloadList: () => dispatch(listProjectGroup(true)),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (options, quite) =>
      dispatch(listProjectGroup(options, quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doSortProject: ({ sortData, groupId }) =>
      dispatch(sortProject({ sortData, groupId })),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDetailProjectGroup: ({ projectGroupId }, quite) =>
      dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doSetProjectGroup: (value) => dispatch(setProjectGroup(value)),
    doSortProjectGroup: (projectGroupId, sortIndex) =>
      dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
    doEditProjectGroup: ({
      projectGroupId,
      name,
      icon,
      description,
      work_types,
      color,
    }) =>
      dispatch(
        editProjectGroup({
          projectGroupId,
          name,
          icon,
          description,
          work_types,
          color,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectGrid);
