import { makeStyles } from "@material-ui/styles";
import { getPermissionViewProjects } from "actions/viewPermissions";
import classNames from "classnames";
import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import {
  checkHasRecentlyProjects,
  countPersonalProjectsBoard,
} from "../../actions/project/listProject";
import AllTaskTable from "../ProjectPage/RightPart/AllTaskTable";
import ProjectGroupList from "./LeftPart/ProjectGroupList";
import ProjectGroupListDeleted from "./LeftPart/ProjectGroupListDeleted";
import AllProjectTable from "./RightPart/AllProjectTable";
import DeletedProjectTable from "./RightPart/DeletedProjectTable";
import ProjectsStart from "./RightPart/ProjectsStart";
import { routeSelector } from "./selectors";

const useStyles = makeStyles({
  wrapper: { display: "flex" },
  leftSidebar: { width: 300, "&.isCollapsed": { width: 0 } },
  mainContent: {
    width: "calc(100% - 300px)",
    "&.isCollapsed": { width: "100%" },
  },
});

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
  countPersonalProjectsBoard,
  checkHasRecentlyProjects,
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDeletedPage = pathname.split("/")[2] === "deleted";

  useLayoutEffect(() => {
    doGetPermissionViewProjects();
    checkHasRecentlyProjects();
    countPersonalProjectsBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleExpand = () => setIsCollapsed(!isCollapsed);

  return (
    <Route path={route}>
      <div className={classNames(classes.wrapper, { isCollapsed })}>
        {!isCollapsed && (
          <div className={classes.leftSidebar}>
            {isDeletedPage ? <ProjectGroupListDeleted /> : <ProjectGroupList />}
          </div>
        )}
        <div className={classNames(classes.mainContent, { isCollapsed })}>
          <Switch>
            <Route exact path="/projects/recently">
              <AllProjectTable
                type_data={1}
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/start">
              <ProjectsStart
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/personal-board">
              <AllProjectTable
                type_data={2}
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/group/:projectGroupId">
              <AllProjectTable
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/deleted">
              <DeletedProjectTable
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/task-table/:projectId/:memberId?">
              <AllTaskTable expand={isCollapsed} handleExpand={_handleExpand} />
            </Route>
            <Route exact path="/projects">
              <AllProjectTable
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Route>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doGetPermissionViewProjects: (quite) =>
      dispatch(getPermissionViewProjects(quite)),
    checkHasRecentlyProjects: () => dispatch(checkHasRecentlyProjects()),
    countPersonalProjectsBoard: () => dispatch(countPersonalProjectsBoard()),
  };
};

export default connect(
  (state) => ({
    route: routeSelector(state),
  }),
  mapDispatchToProps
)(ProjectGroupPage);
