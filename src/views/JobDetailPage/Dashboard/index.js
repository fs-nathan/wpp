import { detailProject } from "actions/project/detailProject";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { statusSelector } from "views/ProjectGroupPage/Modals/ProjectSetting/selectors.js";
import {
  bgColorSelector,
  memberTaskSelector,
  projectSelector,
  showHidePendingsSelector,
} from "views/ProjectPage/RightPart/AllTaskTable/selectors.js";
import {
  localOptionSelector,
  viewPermissionsSelector,
} from "views/ProjectPage/selectors.js";
import DashboardPresenters from "./presenters";

function Dashboard({
  expand,
  handleExpand,
  viewPermissions,
  bgColor,
  isShortGroup,
  showHidePendings,
  handleSubSlide,
  tasks,
  project,
  doDetailProject,
  doDetailStatus,
  localOption,
  memberTask,
  status,
}) {
  const { timeType } = localOption;
  const { projectId, memberId } = useParams();

  React.useEffect(() => {
    if (projectId !== null) {
      doDetailProject({ projectId });
      doDetailStatus({ projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <>
      <DashboardPresenters
        expand={expand}
        handleExpand={handleExpand}
        handleSubSlide={handleSubSlide}
        status={status.status || {}}
        canUpdateProject={get(
          viewPermissions.permissions,
          [projectId, "update_project"],
          false
        )}
        canCreateTask={true}
        isShortGroup={isShortGroup}
        showHidePendings={showHidePendings}
        tasks={tasks}
        project={project}
        memberID={memberId}
        memberTask={memberTask}
        bgColor={bgColor}
        timeType={timeType}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    status: statusSelector(state),
    project: projectSelector(state),
    bgColor: bgColorSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
    memberTask: memberTaskSelector(state),
    isShortGroup: state.groupTask.sortGroupTask.sortgroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doDetailProject: ({ projectId }, quite) => {
      return dispatch(detailProject({ projectId }, quite));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
