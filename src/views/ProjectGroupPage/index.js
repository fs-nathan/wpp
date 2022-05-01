import { makeStyles } from "@material-ui/styles";
import { detailStatus } from "actions/project/setting/detailStatus";
import { getPermissionViewProjects } from "actions/viewPermissions";
import classNames from "classnames";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { useLocalStorage } from "react-use";
import GranttPage from "views/GrantPage/GrantTable";
import ChatPage from "views/JobDetailPage";
import DashboardPage from "views/JobDetailPage/Dashboard";
import ReportPage from "views/JobDetailPage/Report";
import KanbanPage from "views/KanbanPage";
import {
  checkHasRecentlyProjects,
  countPersonalProjectsBoard,
} from "../../actions/project/listProject";
import AllTaskTable from "../ProjectPage/RightPart/AllTaskTable";
import "./index.scss";
import LayoutDetail from "./LayoutDetail";
import ProjectGroupList from "./LeftPart/ProjectGroupList";
import ProjectGroupListDeleted from "./LeftPart/ProjectGroupListDeleted";
import AllProjectTable from "./RightPart/AllProjectTable";
import DeletedProjectTable from "./RightPart/DeletedProjectTable";
import ProjectsStart from "./RightPart/ProjectsStart";
import ProjectAddNew from "./RightPart/ProjectAddNew";
import { routeSelector } from "./selectors";
import { CustomTableWrapper } from "components/CustomTable";
import { CustomLayoutProvider } from "components/CustomLayout";
import ProjectsTemplate from "./RightPart/ProjectsTemplate/ProjectsTemplate";
import ProjectTemplateList from "./LeftPart/ProjectTemplateList/ProjectTemplateList";
import ProjectSingleTemplate from "./RightPart/ProjectsTemplate/ProjectSingleTemplate";
import ProjectGroupTemplate from "./RightPart/ProjectsTemplate/ProjectGroupTemplate";
import ProjectSharedTemplate from "./RightPart/ProjectsTemplate/ProjectSharedTemplate";
import ProjectBeSharedTemplate from "./RightPart/ProjectsTemplate/ProjectBeSharedTemplate";
import ProjectTemplatePreview from "./RightPart/ProjectsTemplate/ProjectTemplatePreview";
import DemoTemplate from "./RightPart/DemoTemplate/DemoTemplate";
import Scrollbars from "react-custom-scrollbars";

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
  countPersonalProjectsBoard,
  checkHasRecentlyProjects,
  doDetailStatus,
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [test, setTest] = useState([]);
  const parsedPath = pathname.split("/");
  const isPreviewPage = useMemo(() => {
    return parsedPath.includes("preview");
  }, [parsedPath]);
  const isTemplatePage = useMemo(() => {
    return parsedPath.includes("template");
  }, [parsedPath]);
  const isDeletedPage = pathname.split("/")[2] === "deleted";

  useLayoutEffect(() => {
    doGetPermissionViewProjects();
    checkHasRecentlyProjects();
    countPersonalProjectsBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleExpand = () => setIsCollapsed(!isCollapsed);
  const _handleOpen = () => setIsCollapsed(false);
  const _handleClose = () => setIsCollapsed(true);

  return (
    <div
      className={classNames(classes.wrapper, { isCollapsed })}
      style={{ backgroundColor: "#fff" }}
    >
      {!isCollapsed && (
        <div className={classNames(classes.leftSidebar, { isCollapsed })}>
          {isTemplatePage ? (
            <ProjectTemplateList />
          ) : isDeletedPage ? (
            <ProjectGroupListDeleted />
          ) : (
            <ProjectGroupList />
          )}
        </div>
      )}
      <div
        className={classNames(
          isTemplatePage
            ? !isPreviewPage
              ? classes.mainContentOverflow
              : classes.mainContent
            : classes.mainContent,
          { isCollapsed }
        )}
      >
        <Scrollbars autoHide autoHideTimeout={500}>
          <Switch>
            <Route exact path="/projects/recently">
              <AllProjectTable
                type_data={1}
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/add-new">
              <ProjectAddNew handleClose={_handleClose} />
            </Route>

            <Route exact path="/projects/start">
              <ProjectsStart
                expand={isCollapsed}
                handleExpand={_handleExpand}
                handleOpen={_handleOpen}
              />
            </Route>
            <Route exact path="/projects/personal-board">
              <AllProjectTable
                type_data={2}
                expand={isCollapsed}
                handleExpand={_handleExpand}
              />
            </Route>
            <Route exact path="/projects/template/shared">
              <ProjectSharedTemplate handleOpen={_handleOpen} />
            </Route>
            <Route exact path="/projects/template/be-shared">
              <ProjectBeSharedTemplate handleOpen={_handleOpen} />
            </Route>
            <Route exact path="/projects/template/demo">
              <DemoTemplate />
            </Route>
            <Route exact path="/projects/template/:groupId">
              <ProjectGroupTemplate handleOpen={_handleOpen} />
            </Route>

            <Route path="/projects/template/:groupId/:templateId/preview">
              <CustomTableWrapper>
                <CustomLayoutProvider>
                  <LayoutDetail
                    handleExpand={_handleExpand}
                    expand={isCollapsed}
                    handleClose={_handleClose}
                    handleOpen={_handleOpen}
                  >
                    <Switch>
                      <Route
                        exact
                        path="/projects/template/:groupId/:templateId/preview/task-table/:projectId/:memberId?"
                        render={(props) => (
                          <AllTaskTable
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/template/:groupId/:templateId/preview/task-kanban/:projectId/:memberId?"
                        render={(props) => (
                          <KanbanPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/template/:groupId/:templateId/preview/task-gantt/:projectId/:memberId?"
                        render={(props) => (
                          <GranttPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                    </Switch>
                  </LayoutDetail>
                </CustomLayoutProvider>
              </CustomTableWrapper>
              {/* <ProjectTemplatePreview /> */}
            </Route>
            <Route exact path="/projects/template/:groupId/:templateId">
              <ProjectSingleTemplate handleOpen={_handleOpen} />
            </Route>
            <Route exact path="/projects/template">
              <ProjectsTemplate handleOpen={_handleOpen} />
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

            <Route path="/projects">
              <CustomTableWrapper>
                <CustomLayoutProvider>
                  <LayoutDetail
                    handleExpand={_handleExpand}
                    expand={isCollapsed}
                    handleClose={_handleClose}
                    handleOpen={_handleOpen}
                  >
                    <Switch>
                      <Route exact path="/projects">
                        <AllProjectTable
                          expand={isCollapsed}
                          handleExpand={_handleExpand}
                          setTest={setTest}
                        />
                      </Route>
                      <Route
                        exact
                        path="/projects/task-table/:projectId/:memberId?"
                        render={(props) => (
                          <AllTaskTable
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/task-kanban/:projectId/:memberId?"
                        render={(props) => (
                          <KanbanPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/task-gantt/:projectId/:memberId?"
                        render={(props) => (
                          <GranttPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/task-chat/:projectId/:memberId?"
                        render={(props) => (
                          <ChatPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/dashboard/:projectId/:memberId?"
                        render={(props) => (
                          <DashboardPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            doDetailStatus={doDetailStatus}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/projects/report/:projectId/:memberId?"
                        render={(props) => (
                          <ReportPage
                            expand={isCollapsed}
                            handleExpand={_handleExpand}
                            {...props}
                          />
                        )}
                      />
                    </Switch>
                  </LayoutDetail>
                </CustomLayoutProvider>
              </CustomTableWrapper>
            </Route>
          </Switch>
        </Scrollbars>
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
  mainContentOverflow: {
    height: "100%",
    overflowY: "auto",
  },
});
