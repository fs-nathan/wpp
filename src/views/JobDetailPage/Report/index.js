import { detailProject } from "actions/project/detailProject";
import { CustomTableWrapper } from "components/CustomTable";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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
import WrapperReport from "./components/WrapperReport";
import ReportPresenter from "./presenters";

function Report({
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
  localOption,
  memberTask,
}) {
  const { timeType } = localOption;
  const { projectId, memberId } = useParams();

  React.useEffect(() => {
    if (projectId !== null) {
      doDetailProject({ projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <>
      <CustomTableWrapper>
        <ReportPresenter
          expand={expand}
          handleExpand={handleExpand}
          handleSubSlide={handleSubSlide}
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
        <WrapperReport />
      </CustomTableWrapper>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Report);
