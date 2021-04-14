import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getPermissionViewUser } from '../../actions/viewPermissions';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import DepartmentList from './LeftPart/DepartmentList';
import AllUsersTable from './RightPart/AllUsersTable';
import MemberRequiredStart from './RightPart/MemberRequired';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';
import { routeSelector } from './selectors';

function UserPage({
  route,
  doGetPermissionViewUser,
}) {

  React.useLayoutEffect(() => {
    doGetPermissionViewUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      path={route}
      render={({ match: { url }, }) => (
        <>
          <Route
            path={`${url}`}
            exact
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <DepartmentList
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <AllUsersTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
          <Route
            path={`${url}/room/:departmentId`}
            exact
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <DepartmentInfo
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <DepartmentUsersTable
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
          <Route
            path={`${url}/member-required`}
            exact
            render={props => (
              <TwoColumnsLayout
                leftRenders={[
                  () =>
                    <DepartmentList
                      {...props}
                    />,
                ]}
                rightRender={
                  ({ expand, handleExpand }) =>
                    <MemberRequiredStart
                      {...props}
                      expand={expand}
                      handleExpand={handleExpand}
                    />
                }
              />
            )}
          />
        </>
      )}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
  };
};

export default connect(
  state => ({
    route: routeSelector(state),
  }),
  mapDispatchToProps,
)(UserPage);
