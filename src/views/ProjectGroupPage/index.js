import { makeStyles } from "@material-ui/styles";
import { detailStatus } from "actions/project/setting/detailStatus";
import { getPermissionViewProjects } from "actions/viewPermissions";
import classNames from "classnames";
import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { useLocalStorage } from "react-use";
import {
  checkHasRecentlyProjects,
  countPersonalProjectsBoard,
} from "../../actions/project/listProject";
import "./index.scss";
import ProjectGroupList from "./LeftPart/ProjectGroupList";
import ProjectGroupListDeleted from "./LeftPart/ProjectGroupListDeleted";
import { routeSelector } from "./selectors";

const useStyles = makeStyles({
  wrapper: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "minmax(300px,1fr) minmax(800px,4fr)",
    backgroundColor: "#fff!important",
    "&.isCollapsed": {
      gridTemplateRows: "auto",
      gridTemplateColumns: "auto",
    },
  },
  leftSidebar: {
    display: "initial",
  },
  mainContent: {},
});

const ProjectsStart = React.lazy(() => import("./RightPart/ProjectsStart"));
const AllProjectTable = React.lazy(() => import("./RightPart/AllProjectTable"));
const AllTaskTable = React.lazy(() =>
  import("../ProjectPage/RightPart/AllTaskTable")
);
const DeletedProjectTable = React.lazy(() =>
  import("./RightPart/DeletedProjectTable")
);
const KanbanPage = React.lazy(() => import("views/KanbanPage"));
const ChatPage = React.lazy(() => import("views/JobDetailPage"));
const DashboardPage = React.lazy(() => import("views/JobDetailPage/Dashboard"));
const ReportPage = React.lazy(() => import("views/JobDetailPage/Report"));
const GranttPage = React.lazy(() => import("views/GrantPage/GrantTable"));

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
  countPersonalProjectsBoard,
  checkHasRecentlyProjects,
  doDetailStatus,
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
    <div
      className={classNames(classes.wrapper, { isCollapsed })}
      style={{ backgroundColor: "#fff" }}
    >
      {!isCollapsed && (
        <div className={classNames(classes.leftSidebar, { isCollapsed })}>
          {isDeletedPage ? <ProjectGroupListDeleted /> : <ProjectGroupList />}
        </div>
      )}


      <div className={classNames(classes.mainContent, { isCollapsed })}>
        <React.Suspense fallback={<div />}>
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
              <KanbanPage expand={isCollapsed} handleExpand={_handleExpand} />
            </Route>
            <Route exact path="/projects/task-gantt/:projectId/:memberId?">
              <GranttPage expand={isCollapsed} handleExpand={_handleExpand} />
            </Route>
            <Route exact path="/projects/task-chat/:projectId/:memberId?">
              <ChatPage expand={isCollapsed} handleExpand={_handleExpand} />
            </Route>
            <Route exact path="/projects/dashboard/:projectId/:memberId?">
              <DashboardPage
                expand={isCollapsed}
                handleExpand={_handleExpand}
                doDetailStatus={doDetailStatus}
              />
            </Route>
            <Route exact path="/projects/report/:projectId/:memberId?">
              <ReportPage expand={isCollapsed} handleExpand={_handleExpand} />
            </Route>
            {/* Detail project */}

            <Route exact path="/projects">
              <AllProjectTable
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
          </Switch>
        </React.Suspense>
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
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
  };
};

export default connect(
  (state) => ({
    route: routeSelector(state),
  }),
  mapDispatchToProps
)(ProjectGroupPage);
