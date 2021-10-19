import { makeStyles } from "@material-ui/styles";
import { getPermissionViewProjects } from "actions/viewPermissions";
import classNames from "classnames";
import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { useLocalStorage } from "react-use";
import GranttPage from "views/GrantPage/GrantTable";
import ChatPage from "views/JobDetailPage";
import KanbanPage from "views/KanbanPage";
import HeaderRightPart from "views/ProjectGroupPage/RightPart/components/HeaderRightPart.js";
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
  wrapper: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "minmax(300px,1fr) minmax(800px,4fr)",
    "&.isCollapsed": {
      gridTemplateRows: "auto",
      gridTemplateColumns: "auto",
    },
  },
  leftSidebar: {
    display: "initial",
  },
  mainContent: {
    borderLeft: "1px solid rgba(0,0,0,.1)",
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
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "WPS_COLLAPSED_DEFAULT",
    true
  );
  const isDeletedPage = pathname.split("/")[2] === "deleted";

  useLayoutEffect(() => {
    doGetPermissionViewProjects();
    checkHasRecentlyProjects();
    countPersonalProjectsBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleExpand = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={classNames(classes.wrapper, { isCollapsed })}>
      {!isCollapsed && (
        <div className={classNames(classes.leftSidebar, { isCollapsed })}>
          {isDeletedPage ? <ProjectGroupListDeleted /> : <ProjectGroupList />}
        </div>
      )}
      <div className={classNames(classes.mainContent, { isCollapsed })}>
        <HeaderRightPart />
        <Switch>
          <Route exact path="/projects/recently">
            <AllProjectTable
              type_data={1}
              expand={isCollapsed}
              handleExpand={_handleExpand}
            />
          </Route>
          <Route exact path="/projects/start">
            <ProjectsStart expand={isCollapsed} handleExpand={_handleExpand} />
          </Route>
          <Route exact path="/projects/personal-board">
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

          {/* Detail project */}
          <Route exact path="/projects/task-table/:projectId/:memberId?">
            <AllTaskTable expand={isCollapsed} handleExpand={_handleExpand} />
          </Route>
          <Route exact path="/projects/task-kanban/:projectId/:memberId?">
            <KanbanPage />
          </Route>
          <Route exact path="/projects/task-gantt/:projectId/:memberId?">
            <GranttPage />
          </Route>
          <Route exact path="/projects/task-chat/:projectId/:memberId?">
            <ChatPage />
          </Route>
          {/* Detail project */}

          <Route exact path="/projects">
            <AllProjectTable
              expand={isCollapsed}
              handleExpand={_handleExpand}
            />
          </Route>
        </Switch>
      </div>
    </div>
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
