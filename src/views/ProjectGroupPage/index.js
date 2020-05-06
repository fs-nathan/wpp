import { getPermissionViewProjects } from 'actions/viewPermissions';
import TwoColumnsLayout from 'components/TwoColumnsLayout';
import { useLocalStorage } from 'hooks';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import AllProjectTable from './RightPart/AllProjectTable';
import DeletedProjectTable from './RightPart/DeletedProjectTable';
import { routeSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectGroupPage({
  doGetPermissionViewProjects,
  route,
}) {

  React.useLayoutEffect(() => {
    doGetPermissionViewProjects();
    // eslint-disable-next-line
  }, []);

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_GROUP_OPTIONS', {
    filterType: 1,
    timeType: 5,
  });

  const [timeRange, setTimeRange] = React.useState({});

  return (
    <Provider value={{
      setTimeRange, timeRange,
      localOptions, setLocalOptions,
    }}>
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
                      <ProjectGroupList
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
          </Switch>
        )}
      />
    </Provider>
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
