import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { getPermissionViewUser } from '../../actions/viewPermissions';
import UserList from './LeftPart/UserList';
import UserInfo from './RightPart/UserInfo';
import { routeSelector } from './selectors';

const Container = styled(({ expand, ...rest }) => <div {...rest} />)`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => props.expand ? 'auto' : 'minmax(300px, 1fr) minmax(800px, 3fr)'};
`;

const LeftDiv = styled(({ expand, ...rest }) => <div {...rest} />)`
  display: ${props => props.expand ? 'none' : 'inherit'};
`;

const RightDiv = styled.div`
  border-left: 1px solid rgba(0, 0, 0, .1);
`;

function UserPage({
  route,
  doGetPermissionViewUser
}) {

  React.useLayoutEffect(() => {
    doGetPermissionViewUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Route
        path={route}
        render={({ match: { url, } }) => (
          <LeftDiv>
            <Route path={`${url}/`} component={UserList} />
          </LeftDiv>
        )}
      />
      <Route
        path={route}
        render={({ match: { url, } }) => (
          <RightDiv>
            <Route path={`${url}/:userId`}
              render={props =>
                <UserInfo
                  {...props}
                />
              }
              exact
            />
          </RightDiv>
        )}
      />
    </Container>
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
