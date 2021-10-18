import { makeStyles } from "@material-ui/styles";
import { getPermissionViewProjects } from "actions/viewPermissions";
import TwoColumnsLayout from "components/TwoColumnsLayout";
import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import {
  checkHasRecentlyProjects,
  countPersonalProjectsBoard,
} from "../../actions/project/listProject";
import GroupTaskSlide from "../ProjectPage/LeftPart/GroupTaskSlide";
import ProjectDetail from "../ProjectPage/LeftPart/ProjectDetail";
import ProjectMemberSlide from "../ProjectPage/LeftPart/ProjectMemberSlide";
import AllTaskTable from "../ProjectPage/RightPart/AllTaskTable";
import ProjectGroupDetail from "./LeftPart/ProjectGroupDetail";
import ProjectGroupList from "./LeftPart/ProjectGroupList";
import ProjectGroupListDeleted from "./LeftPart/ProjectGroupListDeleted";
import AllProjectTable from "./RightPart/AllProjectTable";
import DeletedProjectTable from "./RightPart/DeletedProjectTable";
import ProjectsStart from "./RightPart/ProjectsStart";
import { routeSelector } from "./selectors";

const useStyles = makeStyles({
  wrapper: { display: "flex" },
  leftSidebar: { width: 300 },
  mainContent: { width: "calc(100% - 300px)" },
});

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
  countPersonalProjectsBoard,
  checkHasRecentlyProjects,
}) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const isDeletedPage = pathname.split("/")[2] === "deleted";

  useLayoutEffect(() => {
    doGetPermissionViewProjects();
    checkHasRecentlyProjects();
    countPersonalProjectsBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route path={route}>
      <div className={classes.wrapper}>
        <div className={classes.leftSidebar}>
          {isDeletedPage ? <ProjectGroupListDeleted /> : <ProjectGroupList />}
        </div>
        <div className={classes.mainContent}>
          <Switch>
            <Route exact path="/projects/recently">
              <AllProjectTable type_data={1} />
            </Route>
            <Route exact path="/projects/start">
              <ProjectsStart />
            </Route>
            <Route exact path="/personal-board">
              <AllProjectTable type_data={2} />
            </Route>
            <Route exact path="/projects/group/:projectGroupId">
              <AllProjectTable />
            </Route>
            <Route exact path="/projects/deleted">
              <DeletedProjectTable />
            </Route>
            <Route exact path="/projects/task-table/:projectId/:memberId?">
              <AllTaskTable />
            </Route>
            <Route exact path="/projects">
              <AllProjectTable />
            </Route>
          </Switch>
        </div>
      </div>
    </Route>
  );

  return (
    <Route
      path={route}
      render={({ match: { url } }) => (
        <Switch>
          <Route
            path={`${url}`}
            exact
            render={(props) => {
              console.log(props);
              return (
                <TwoColumnsLayout
                  leftRenders={[() => <ProjectGroupList {...props} />]}
                  rightRender={({ expand, handleExpand }) => (
                    <AllProjectTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                  )}
                />
              );
            }}
          />
          <Route
            path={`${url}/recently`}
            exact
            render={(props) => (
              <TwoColumnsLayout
                leftRenders={[() => <ProjectGroupList {...props} />]}
                rightRender={({ expand, handleExpand }) => (
                  <AllProjectTable
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                    type_data={1}
                  />
                )}
              />
            )}
          />
          <Route
            path={`${url}/start`}
            exact
            render={(props) => (
              <TwoColumnsLayout
                leftRenders={[() => <ProjectGroupList {...props} />]}
                rightRender={({ expand, handleExpand }) => (
                  <ProjectsStart
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                  />
                )}
              />
            )}
          />
          <Route
            path={`${url}/personal-board`}
            exact
            render={(props) => (
              <TwoColumnsLayout
                leftRenders={[() => <ProjectGroupList {...props} />]}
                rightRender={({ expand, handleExpand }) => (
                  <AllProjectTable
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                    type_data={2}
                  />
                )}
              />
            )}
          />
          <Route
            path={`${url}/deleted`}
            exact
            render={(props) => (
              <TwoColumnsLayout
                leftRenders={[() => <ProjectGroupListDeleted {...props} />]}
                rightRender={({ expand, handleExpand }) => (
                  <DeletedProjectTable
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                  />
                )}
              />
            )}
          />
          <Route
            path={`${url}/group/:projectGroupId`}
            render={(props) => (
              <TwoColumnsLayout
                leftRenders={[() => <ProjectGroupDetail {...props} />]}
                rightRender={({ expand, handleExpand }) => (
                  <AllProjectTable
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                  />
                )}
              />
            )}
          />
          <Route
            path={`${url}/task-table/:projectId/:memberId?`}
            exact
            render={(props) => {
              return (
                <TwoColumnsLayout
                  leftRenders={[
                    () => <ProjectDetail {...props} />,
                    ({ handleSubSlide }) => (
                      <ProjectMemberSlide
                        {...props}
                        handleSubSlide={handleSubSlide}
                      />
                    ),
                    ({ handleSubSlide }) => (
                      <GroupTaskSlide
                        {...props}
                        handleSubSlide={handleSubSlide}
                      />
                    ),
                  ]}
                  rightRender={({ expand, handleExpand, handleSubSlide }) => (
                    <AllTaskTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                      handleSubSlide={handleSubSlide}
                    />
                  )}
                />
              );
            }}
          />
        </Switch>
      )}
    />
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
