import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getListTaskDetail } from '../../actions/taskDetail/taskDetailActions';
import { getPermissionViewDetailProject } from '../../actions/viewPermissions';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import { useLocalStorage } from '../../hooks';
import GroupTaskSlide from './LeftPart/GroupTaskSlide';
import ProjectDetail from './LeftPart/ProjectDetail';
import ProjectMemberSlide from './LeftPart/ProjectMemberSlide';
import AllTaskTable from './RightPart/AllTaskTable';
import { routeSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectPage({
  doGetListTaskDetail,
  doGetPermissionViewDetailProject,
  route,
}) {

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_OPTIONS', {
    filterType: 1,
    timeType: 5,
  });

  const [timeRange, setTimeRange] = React.useState({});

  return (
    <Provider value={{
      setTimeRange, timeRange,
      localOptions, setLocalOptions,
      doGetPermissionViewDetailProject, doGetListTaskDetail,
    }}>
      <Route
        path={route}
        render={({ match: { url, } }) => (
          <>
            <Route
              path={`${url}/:projectId`}
              exact
              render={props => {

                return (
                  <TwoColumnsLayout
                    leftRenders={[
                      () => <ProjectDetail {...props} />,
                      ({ handleSubSlide }) => <ProjectMemberSlide {...props} handleSubSlide={handleSubSlide} />,
                      ({ handleSubSlide }) => <GroupTaskSlide {...props} handleSubSlide={handleSubSlide} />,
                    ]}
                    rightRender={
                      ({ expand, handleExpand, handleSubSlide, }) =>
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
          </>
        )}
      />
    </Provider>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doGetListTaskDetail: ({ projectId }) => dispatch(getListTaskDetail({ project_id: projectId })),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  }
};

export default connect(
  state => ({
    route: routeSelector(state),
  }),
  mapDispatchToProps,
)(ProjectPage);
