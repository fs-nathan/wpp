import { deleteProject } from "actions/project/deleteProject";
import { listProject } from "actions/project/listProject";
import { useTimes } from "components/CustomPopover";
import { get } from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { localOptionSelector } from "../../selectors";
import DeleteProjectPresenter from "./presenters";

function ProjectDelete({
  selectedProject = null,
  open,
  setOpen,
  doDeleteProject,
  doReloadProject,
  projectGroupId = undefined,
  localOption,
  doAfterSuccess,
}) {
  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return {
      timeStart,
      timeEnd,
    };
    // eslint-disable-next-line
  }, [timeType]);

  console.log("open", open);
  console.log("projectGroupId", projectGroupId);

  return (
    <DeleteProjectPresenter
      projectGroupId={projectGroupId}
      timeRange={timeRange}
      doAfterSuccess={doAfterSuccess}
      doReloadProject={() =>
        doReloadProject({
          groupProject: projectGroupId,
          timeStart: get(timeRange, "timeStart")
            ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
            : undefined,
          timeEnd: get(timeRange, "timeEnd")
            ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
            : undefined,
        })
      }
      open={open}
      setOpen={setOpen}
      handleDeleteProject={() =>
        doDeleteProject({
          projectId: get(selectedProject, "id"),
        })
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doReloadProject: (options) => dispatch(listProject(options, true)),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
  };
};

export default connect(
  (state) => ({
    localOption: localOptionSelector(state),
  }),
  mapDispatchToProps
)(ProjectDelete);
