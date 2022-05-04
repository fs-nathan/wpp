import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { listColumns } from "actions/columns/listColumns";
import { changeKeyword } from "actions/gantt";
import { searchTask, setVisibleHeader } from "actions/kanban/setting";
import { hideProject } from "actions/project/hideProject";
import { showProject } from "actions/project/showProject";
import { actionVisibleDrawerMessage } from "actions/system/system";
import { CustomLayoutContext } from "components/CustomLayout";
import { CustomTableContext } from "components/CustomTable";
import HeaderProject from "components/HeaderProject";
import TemplateHeader from "components/TemplateHeader";
import { apiService } from "constants/axiosInstance";
import { DRAWER_TYPE } from "constants/constants";
import { exportToCSV } from "helpers/utils/exportData";
import { find, flattenDeep, get, isNil, join } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  projectSelector,
  showHidePendingsSelector,
  tasksSelector,
} from "views/ProjectPage/RightPart/AllTaskTable/selectors";
import { viewPermissionsSelector } from "views/ProjectPage/selectors";
import {
  taskSearchSelector,
  visibleSelector,
} from "../KanbanPage/Header/selectors";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MiniContainer = ({ className = "", ...props }) => (
  <div
    className={`view_KanbanHeader___container-mini ${className}`}
    {...props}
  />
);

const LayoutDetail = ({
  children,
  tasks,
  project,
  viewPermissions,
  showHidePendings,
  handleExpand,
  doHideProject,
  doShowProject,
  projectInfo,
  keyword,
  taskSearchStr,
  doSearchTask,
  expand = false,
  doActionVisibleDrawerMessage,
  visible,
  doSetVisibleHeader,
  handleClose,
  handleOpen,
}) => {
  const { doOpenModal, setItemLocation } = useContext(CustomLayoutContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const isProject = location.pathname === "/projects";
  const TableContext = React.useContext(CustomTableContext);
  const parsedPath = location.pathname.split("/");
  const [view, setViewParam] = useState("");
  const [projectId, setProjectId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [memberId, setMemberId] = useState("");
  const search = location.search;
  const params = new URLSearchParams(search);
  const groupID = params.get("groupID");

  const isTemplate = useMemo(() => {
    return parsedPath.includes("template");
  }, [parsedPath]);
  const isProjectAddNew = useMemo(() => {
    return parsedPath.includes("add-new");
  }, [parsedPath]);
  const isPreview = useMemo(() => {
    return parsedPath.includes("preview");
  }, [parsedPath]);
  useEffect(() => {
    if (isTemplate) {
      setCategoryId(parsedPath[3]);
      setViewParam(parsedPath[6]);
      setProjectId(parsedPath[7]);
      setMemberId(parsedPath[8]);
    } else {
      setViewParam(parsedPath[2]);
      setProjectId(parsedPath[3]);
      setMemberId(parsedPath[4]);
    }
  }, [isTemplate, parsedPath]);

  useEffect(() => {
    if (isPreview) {
      handleClose();
    }
  }, [isPreview]);

  useEffect(() => {
    if (isProject && !isProjectAddNew) {
      handleOpen();
    }
  }, [isProject, isProjectAddNew]);

  const disableShowHide = !isNil(
    find(
      showHidePendings.pendings,
      (pending) => pending === get(project.project, "id")
    )
  );
  const query = useQuery();
  React.useEffect(() => {
    if (query.get("open-employee")) {
      doOpenModal("SETTING_MEMBER", {});
    }
  }, [query]);

  const _handleAddNewColumns = (dataColumn) => {
    if (!dataColumn) return;
    /* Dispatching an action to the Redux store. */
    dispatch(listColumns({ project_id: projectId }));
  };

  const _handleHideColumn = async (idHide, statusUpdate = 0, index) => {
    await apiService({
      data: {
        project_field_id: idHide,
        project_id: projectId,
        status: statusUpdate,
      },
      url: "/project-field/set-status",
      method: "POST",
    });
  };

  const _exportData = () => {
    const data = flattenDeep(
      tasks.tasks.map((groupTask) =>
        get(groupTask, "tasks", []).map((task) => ({
          id: get(task, "id", ""),
          groupTask: get(groupTask, "name", ""),
          name: get(task, "name", ""),
          status: get(task, "status_name", ""),
          duration:
            get(task, "duration_value", 0) +
            " " +
            get(task, "duration_unit", ""),
          start_time: get(task, "start_time", ""),
          start_date: get(task, "start_date", ""),
          end_time: get(task, "end_time", ""),
          end_date: get(task, "end_date", ""),
          progress: get(task, "complete", 0) + "%",
          priority: get(task, "priority_name", ""),
          members: join(
            get(task, "members", []).map((member) => get(member, "name")),
            ","
          ),
        }))
      )
    );

    exportToCSV(data, "tasks");
  };

  const setView = () => {
    switch (view) {
      case "task-kanban":
        return {
          view: "kanban",
          project: project.project,
          valueSearch: taskSearchStr,
          onSearch: (searchStr) => doSearchTask(searchStr),
          onOpenCreateModal: () =>
            doOpenModal("MENU_CREATE", {
              curProject: project.project,
            }),
          canUpdateProject: get(
            viewPermissions.permissions,
            [projectId, "update_project"],
            false
          ),
          onUpdateMember: () => doOpenModal("MEMBER_SETTING", {}),
          onUpdateTime: () => doOpenModal("CALENDAR", {}),
          onShareProject: () => doOpenModal("SHARE_PROJECT", {}),
          onUnShareProject: () => doOpenModal("UN_SHARE_PROJECT", {}),
          onUpdateVisible: () =>
            get(project, "visibility", false)
              ? doHideProject({ projectId: get(project?.project, "id") })
              : doShowProject({ projectId: get(project?.project, "id") }),
          onUpdateSetting: () =>
            doOpenModal("SETTING_PROJECT", {
              curProject: project.project,
            }),
          onOpenFilterKanban: () =>
            doActionVisibleDrawerMessage({
              type: DRAWER_TYPE.KANBAN.FILTER,
              anchor: "right",
              options: {},
            }),
          expand: expand,
          onExpand: handleExpand,
        };
      case "task-gantt":
        return {
          view: "grantt",
          project: projectInfo,
          valueSearch: keyword,
          onSearch: (searchStr) => doSearchTask(searchStr),
          onOpenCreateModal: () => console.log("onOpenCreateModal"),
          onUpdateTime: () => console.log("CALENDAR"),
          onShareProject: () => doOpenModal("SHARE_PROJECT", {}),
          onUnShareProject: () => doOpenModal("UN_SHARE_PROJECT", {}),

          onUpdateSetting: () => console.log("SETTING"),
          expand: expand,
          onExpand: handleExpand,
        };
      case "task-chat":
        return {
          view: "chat",
          project: { id: projectId },
          expand: expand,
          onExpand: handleExpand,
        };
      case "dashboard":
        return {
          view: "list",
          project: project.project,
          valueSearch: get(TableContext?.options, "search.patern", ""),
          onSearch: (value) =>
            get(TableContext?.options, "search.onChange", () => null)(value),
          onOpenCreateModal: () => doOpenModal("MENU_CREATE"),
          hasMemberId: isNil(memberId),
          canUpdateProject:
            get(
              viewPermissions.permissions,
              [projectId, "update_project"],
              false
            ) && isNil(memberId),
          disableShowHide,
          onUpdateMember: () => doOpenModal("SETTING_MEMBER"),
          onUpdateTime: () => doOpenModal("CALENDAR", {}),
          onShareProject: () => doOpenModal("SHARE_PROJECT", {}),
          onUnShareProject: () => doOpenModal("UN_SHARE_PROJECT", {}),

          onUpdateSetting: () =>
            doOpenModal("SETTING", {
              curProject: project.project,
            }),
          onExpand: handleExpand,
        };
      case "report":
        return {
          view: "list",
          project: project.project,
          valueSearch: get(TableContext?.options, "search.patern", ""),
          onSearch: (value) =>
            get(TableContext?.options, "search.onChange", () => null)(value),
          hasMemberId: isNil(memberId),
          canUpdateProject:
            get(
              viewPermissions.permissions,
              [projectId, "update_project"],
              false
            ) && isNil(memberId),
          disableShowHide,
          onExpand: handleExpand,
        };
      default:
        return {
          view: "list",
          project: project.project,
          valueSearch: get(TableContext?.options, "search.patern", ""),
          onSearch: (value) =>
            get(TableContext?.options, "search.onChange", () => null)(value),
          onOpenCreateModal: () => doOpenModal("MENU_CREATE"),
          onAddColumns: _handleAddNewColumns,
          onHideColumn: _handleHideColumn,
          setItemLocation: setItemLocation,
          hasMemberId: isNil(memberId),
          canUpdateProject:
            get(
              viewPermissions.permissions,
              [projectId, "update_project"],
              false
            ) && isNil(memberId),
          disableShowHide,
          onUpdateMember: () => doOpenModal("SETTING_MEMBER"),
          onUpdateTime: () => doOpenModal("CALENDAR", {}),
          onShareProject: () => doOpenModal("SHARE_PROJECT", {}),
          onUnShareProject: () => doOpenModal("UN_SHARE_PROJECT", {}),

          onUpdateVisible: () =>
            get(project, "visibility", false)
              ? doHideProject({ projectId: get(project?.project, "id") })
              : doShowProject({ projectId: get(project?.project, "id") }),
          onUpdateSetting: () =>
            doOpenModal("SETTING", {
              curProject: project.project,
              canChange: {
                date: get(
                  viewPermissions.permissions,
                  [projectId, "update_project"],
                  false
                ),
                copy: get(
                  viewPermissions.permissions,
                  [projectId, "update_project"],
                  false
                ),
                view: true,
              },
            }),
          onExportData: () => _exportData,
          onExpand: handleExpand,
        };
    }
  };

  return (
    <>
      {!isProject && view === "task-kanban" && (
        <>
          {visible ? (
            isTemplate ? (
              <TemplateHeader
                projectId={projectId}
                categoryId={categoryId}
                {...setView()}
              />
            ) : (
              <HeaderProject {...setView()} />
            )
          ) : (
            <MiniContainer>
              <Icon
                path={mdiChevronDown}
                size={1}
                onClick={() => doSetVisibleHeader(true)}
              />
            </MiniContainer>
          )}
        </>
      )}
      {!isProject &&
        view !== "task-kanban" &&
        (isTemplate ? (
          <TemplateHeader
            projectId={projectId}
            categoryId={categoryId}
            {...setView()}
          />
        ) : (
          <HeaderProject {...setView()} />
        ))}
      {isTemplate ||
      (!groupID && !isProject && view !== "task-chat" && view !== "report") ? (
        <div
          className="template-preview-body"
          style={{
            height: isTemplate ? "calc(100vh - 88px)" : "calc(100vh - 75px)",
          }}
        >
          {React.cloneElement(children, { aaaa: 1 })}
        </div>
      ) : (
        React.cloneElement(children, { aaaa: 1 })
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: tasksSelector(state),
    project: projectSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    projectInfo: state.gantt.projectInfo,
    keyword: state.gantt.keyword,
    taskSearchStr: taskSearchSelector(state),
    visible: visibleSelector(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    changeKeyword: ({ keyword }) => dispatch(changeKeyword(keyword)),
    doSearchTask: (searchStr) => dispatch(searchTask(searchStr)),
    doActionVisibleDrawerMessage: (option) =>
      dispatch(actionVisibleDrawerMessage(option)),
    doSetVisibleHeader: (visible) => dispatch(setVisibleHeader(visible)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDetail);
