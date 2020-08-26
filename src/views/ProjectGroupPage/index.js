import { getPermissionViewProjects } from 'actions/viewPermissions';
import TwoColumnsLayout from 'components/TwoColumnsLayout';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import ProjectGroupListDeleted from './LeftPart/ProjectGroupListDeleted';
import AllProjectTable from './RightPart/AllProjectTable';
import DeletedProjectTable from './RightPart/DeletedProjectTable';
import { routeSelector } from './selectors';
import ProjectDetail from "../ProjectPage/LeftPart/ProjectDetail";
import ProjectMemberSlide from "../ProjectPage/LeftPart/ProjectMemberSlide";
import GroupTaskSlide from "../ProjectPage/LeftPart/GroupTaskSlide";
import AllTaskTable from "../ProjectPage/RightPart/AllTaskTable";

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
}) {

  React.useLayoutEffect(() => {
    doGetPermissionViewProjects();
  }, []);

  return (
    <Route
      path={route}
      render={({ match: { url } }) => (
        <Switch>
          <Route
            path={`${url}`}
            exact
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <ProjectGroupList
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <AllProjectTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
          <Route
            path={`${url}/deleted`}
            exact
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <ProjectGroupListDeleted
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <DeletedProjectTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
          <Route
            path={`${url}/group/:projectGroupId`}
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <ProjectGroupDetail
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <AllProjectTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
          <Route
            path={`${url}/task-table/:projectId/:memberId?`}
            exact
            render={props => {
              return (
                <TwoColumnsLayout
                  leftRenders={[
                    () => <ProjectDetail {...props} />,
                    ({handleSubSlide}) => <ProjectMemberSlide {...props} handleSubSlide={handleSubSlide}/>,
                    ({handleSubSlide}) => <GroupTaskSlide {...props} handleSubSlide={handleSubSlide}/>,
                  ]}
                  rightRender={
                    ({expand, handleExpand, handleSubSlide,}) =>
                      <AllTaskTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                        handleSubSlide={handleSubSlide}
                      />
                  }
                />
              )
            }}
          />
        </Switch>
      )}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doGetPermissionViewProjects: (quite) => dispatch(getPermissionViewProjects(quite)),
  }
};

export default connect(
  state => ({
    route: routeSelector(state),
  }),
  mapDispatchToProps,
)(ProjectGroupPage);
