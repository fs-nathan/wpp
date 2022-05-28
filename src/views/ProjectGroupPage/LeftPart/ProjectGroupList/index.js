import { listIcon } from "actions/icon/listIcon";
import { listProject } from "actions/project/listProject";
import { listProjectGroup } from "actions/projectGroup/listProjectGroup";
import { sortProjectGroup } from "actions/projectGroup/sortProjectGroup";
import { useTimes } from "components/CustomPopover";
import {
  CustomEventDispose,
  CustomEventListener,
  SORT_PROJECT_GROUP,
} from "constants/events.js";
import { filter, get } from "lodash";
import moment from "moment";
import React from "react";
import { connect, useSelector } from "react-redux";
import CreateProjectGroup from "../../Modals/CreateProjectGroup";
import {
  localOptionSelector,
  routeSelector,
  viewPermissionsSelector,
} from "../../selectors";
import ProjectGroupListPresenter from "./presenters";
import { groupsSelector } from "./selectors";

function ProjectList({
  groups,
  route,
  viewPermissions,
  doSortProjectGroup,
  doListProject,
  doListProjectGroup,
  localOption,
}) {
  const times = useTimes();
  const { timeType } = localOption;
  const projectGroups = useSelector(state => state.projectGroup.listProjectGroup.data.projectGroups)
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return {
      timeStart,
      timeEnd,
    };
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
    return () => {
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
    };
  }, [timeRange]);

  const [searchPattern, setSearchPattern] = React.useState("");

  const newGroups = {
    ...groups,
    groups: filter(groups.groups, (projectGroup) =>
      get(projectGroup, "name", "")
        .toLowerCase()
        .includes(searchPattern.toLowerCase())
    ),
  };

  const [openCreate, setOpenCreate] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case "CREATE": {
        if (get(viewPermissions.permissions, "manage_group_project", false)) {
          setOpenCreate(true);
        }
        return;
      }
      default:
        return;
    }
  }

  return (
    <>
      <ProjectGroupListPresenter
        groups={newGroups}
        route={route}
        canModify={get(
          viewPermissions.permissions,
          "manage_group_project",
          false
        )}
        searchPattern={searchPattern}
        setSearchPattern={setSearchPattern}
        handleSortProjectGroup={(projectGroupId, sortIndex) =>
          doSortProjectGroup({ projectGroupId, sortIndex })
        }
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup open={openCreate} setOpen={setOpenCreate} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    groups: groupsSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSortProjectGroup: ({ projectGroupId, sortIndex }) =>
      dispatch(sortProjectGroup({ projectGroupId, sortIndex })),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListProjectGroup: (options, quite) =>
      dispatch(listProjectGroup(options, quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
