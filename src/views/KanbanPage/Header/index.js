import { detailProject as kanbanDetailProject } from "actions/kanban/detailProject";
import {
  searchTask,
  setMemberFilter,
  setVisibleHeader,
} from "actions/kanban/setting";
import { detailProject } from "actions/project/detailProject";
import { hideProject } from "actions/project/hideProject";
import { memberProject } from "actions/project/memberProject";
import { showProject } from "actions/project/showProject";
import { actionVisibleDrawerMessage } from "actions/system/system";
import { getProjectListBasic } from "actions/taskDetail/taskDetailActions";
import {
  CustomEventDispose,
  CustomEventListener,
  UPDATE_PROJECT,
} from "constants/events.js";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  projectSelector,
  showHidePendingsSelector,
  taskSearchSelector,
  viewPermissionsSelector,
  visibleSelector,
} from "./selectors";

function KanbanPage({
  doKanbanDetailProject,
  doDetailProject,
  doMemberProject,
  projectId,
  project,
  doSetMemberFitler,
  doGetProjectListBasic,
}) {
  React.useEffect(() => {
    doKanbanDetailProject({ projectId });
    doMemberProject({ projectId });
    doDetailProject({ projectId });
  }, [projectId]);

  React.useLayoutEffect(() => {
    doGetProjectListBasic(projectId);
    const handleGetProjectListBasic = () => {
      doGetProjectListBasic(projectId);
    };
    CustomEventListener(UPDATE_PROJECT.SUCCESS, handleGetProjectListBasic);
    return () => {
      CustomEventDispose(UPDATE_PROJECT.SUCCESS, handleGetProjectListBasic);
    };
  }, [projectId]);

  React.useEffect(() => {
    const members = get(project.project, "members", []);
    const initialMemberFilter = members.map((member) => get(member, "id", ""));
    doSetMemberFitler(initialMemberFilter);
  }, [project]);

  return <></>;
}

const mapStateToProps = (state) => {
  return {
    project: projectSelector(state),
    visible: visibleSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    taskSearchStr: taskSearchSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doActionVisibleDrawerMessage: (option) =>
      dispatch(actionVisibleDrawerMessage(option)),
    doKanbanDetailProject: (option, quite) =>
      dispatch(kanbanDetailProject(option, quite)),
    doDetailProject: (option, quite) => dispatch(detailProject(option, quite)),
    doSetVisibleHeader: (visible) => dispatch(setVisibleHeader(visible)),
    doSetMemberFitler: (memberFilter) =>
      dispatch(setMemberFilter(memberFilter)),
    doMemberProject: (option, quite) => dispatch(memberProject(option, quite)),
    doGetProjectListBasic: (projectId) =>
      dispatch(getProjectListBasic(projectId)),
    doSearchTask: (searchStr) => dispatch(searchTask(searchStr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanPage);
