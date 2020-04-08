import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { listLevel } from '../../actions/level/listLevel';
import { listMajor } from '../../actions/major/listMajor';
import { listPosition } from '../../actions/position/listPosition';
import { listRoom } from '../../actions/room/listRoom';
import { detailUser } from '../../actions/user/detailUser';
import { listUserOfGroup } from '../../actions/user/listUserOfGroup';
import { getPermissionViewUser } from '../../actions/viewPermissions';
import LoadingOverlay from '../../components/LoadingOverlay';
import {
  CustomEventDispose, CustomEventListener, UPDATE_USER,
  //SORT_ROOM, CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM,
  //SORT_USER, INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, PUBLIC_MEMBER, PRIVATE_MEMBER, 
  UPLOAD_DOCUMENTS_USER
} from '../../constants/events';
import UserList from './LeftPart/UserList';
import UserInfo from './RightPart/UserInfo';
import { routeSelector, viewPermissionsSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

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
  route, viewPermissions,
  doListRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doListUserOfGroup,
  doDetailUser,
  doGetPermissionViewUser
}) {

  React.useEffect(() => {
    doGetPermissionViewUser()
  }, [doGetPermissionViewUser]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListRoom();

      /*
      const reloadListRoom = () => {
        doListRoom();
      }

      CustomEventListener(CREATE_ROOM, reloadListRoom);
      CustomEventListener(UPDATE_ROOM, reloadListRoom);
      CustomEventListener(DELETE_ROOM, reloadListRoom);
      CustomEventListener(SORT_ROOM, reloadListRoom);

      return () => {
        CustomEventDispose(CREATE_ROOM, reloadListRoom);
        CustomEventDispose(UPDATE_ROOM, reloadListRoom);
        CustomEventDispose(DELETE_ROOM, reloadListRoom);
        CustomEventDispose(SORT_ROOM, reloadListRoom);
      }
      */
    }
  }, [doListRoom, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListPosition();

      /*
      const reloadListPosition = () => {
        doListPosition();
      };
  
      CustomEventListener(CREATE_POSITION, reloadListPosition);
      CustomEventListener(UPDATE_POSITION, reloadListPosition);
      CustomEventListener(DELETE_POSITION, reloadListPosition);
  
      return () => {
        CustomEventDispose(CREATE_POSITION, reloadListPosition);
        CustomEventDispose(UPDATE_POSITION, reloadListPosition);
        CustomEventDispose(DELETE_POSITION, reloadListPosition);
      }
      */
    }
  }, [doListPosition, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) doListMajor();
  }, [doListMajor, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) doListLevel();
  }, [doListLevel, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListUserOfGroup();

      const reloadListUserOfGroup = () => {
        doListUserOfGroup();
      }

      //CustomEventListener(CREATE_ROOM, reloadListUserOfGroup);
      //CustomEventListener(UPDATE_ROOM, reloadListUserOfGroup);
      //CustomEventListener(DELETE_ROOM, reloadListUserOfGroup);
      //CustomEventListener(SORT_ROOM, reloadListUserOfGroup);
      CustomEventListener(UPDATE_USER, reloadListUserOfGroup);
      //CustomEventListener(SORT_USER, reloadListUserOfGroup);
      //CustomEventListener(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
      //CustomEventListener(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
      //CustomEventListener(PUBLIC_MEMBER, reloadListUserOfGroup);
      //CustomEventListener(PRIVATE_MEMBER, reloadListUserOfGroup);

      return () => {
        //CustomEventDispose(CREATE_ROOM, reloadListUserOfGroup);
        //CustomEventDispose(UPDATE_ROOM, reloadListUserOfGroup);
        //CustomEventDispose(DELETE_ROOM, reloadListUserOfGroup);
        //CustomEventDispose(SORT_ROOM, reloadListUserOfGroup);
        CustomEventDispose(UPDATE_USER, reloadListUserOfGroup);
        //CustomEventDispose(SORT_USER, reloadListUserOfGroup);
        //CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
        //CustomEventDispose(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
        //CustomEventDispose(PUBLIC_MEMBER, reloadListUserOfGroup);
        //CustomEventDispose(PRIVATE_MEMBER, reloadListUserOfGroup);
      }
    }
  }, [doListUserOfGroup, viewPermissions]);

  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doDetailUser({ userId });


      const reloadDetailUserHandler = () => doDetailUser({ userId }, true);

      CustomEventListener(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
      //CustomEventListener(UPDATE_USER, reloadDetailUserHandler);

      return () => {
        CustomEventDispose(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
        //CustomEventDispose(UPDATE_USER, reloadDetailUserHandler);
      }
    }
  }, [doDetailUser, userId, viewPermissions]);

  return (
    <LoadingOverlay
      active={viewPermissions.loading}
      spinner
      fadeSpeed={100}
    >
      <Provider value={{
        setUserId,
      }}>
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
      </Provider>
    </LoadingOverlay>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
  };
};

export default connect(
  state => ({
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  }),
  mapDispatchToProps,
)(UserPage);
