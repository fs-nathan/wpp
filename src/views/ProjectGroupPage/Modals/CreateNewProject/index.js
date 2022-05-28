import { createProject } from "actions/project/createProject";
import { listProject } from "actions/project/listProject";
import { listProjectGroup } from "actions/projectGroup/listProjectGroup";
import { useTimes } from "components/CustomPopover";
import { get } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { localOptionSelector } from "../../selectors";
import CreateNewProjectPresenter from "./presenters";
import { groupsSelector } from "./selectors";

function CreateNewProject({
  open,
  setOpen,
  groups,
  work_types,
  doCreateProject,
  doListProjectGroup,
  doReload,
  projectGroupId = undefined,
  localOption,
}) {
  const projectGroups = useSelector(state => state.projectGroup.listProjectGroup.data.projectGroups)
  const history = useHistory();
  useEffect(() => {
    if (open) history.push("/projects/add-new");
  }, [history, open]);

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

  React.useEffect(() => {
    if (timeRange.timeEnd || timeRange.timeStart || projectGroups.length < 1) doListProjectGroup({
      timeStart: get(timeRange, "timeStart")
        ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
        : undefined,
      timeEnd: get(timeRange, "timeEnd")
        ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
        : undefined,
    });
  }, [timeRange]);

  return (
    <CreateNewProjectPresenter
      open={open}
      setOpen={setOpen}
      projectGroupId={projectGroupId}
      timeRange={timeRange}
      doReload={() =>
        doReload({
          groupProject: projectGroupId,
          timeStart: get(timeRange, "timeStart")
            ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
            : undefined,
          timeEnd: get(timeRange, "timeEnd")
            ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
            : undefined,
        })
      }
      groups={groups}
      work_types={work_types}
      handleCreateProject={({
        name,
        description,
        projectGroupId,
        priority,
        currency,
        project_label_id,
      }) =>
        doCreateProject({
          name,
          description,
          projectGroupId,
          priority,
          currency,
          project_label_id,
        })
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    groups: groupsSelector(state),
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doReload: (options) => dispatch(listProject(options, true)),
    doCreateProject: ({
      name,
      description,
      projectGroupId,
      priority,
      currency,
      project_label_id,
    }) =>
      dispatch(
        createProject({
          name,
          description,
          projectGroupId,
          priority,
          currency,
          project_label_id,
        })
      ),
    doListProjectGroup: (options, quite) =>
      dispatch(listProjectGroup(options, quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewProject);
