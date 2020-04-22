import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { listLevel, listLevelReset } from '../../actions/level/listLevel';
import { listMajor, listMajorReset } from '../../actions/major/listMajor';
import { listPosition, listPositionReset } from '../../actions/position/listPosition';
import { listRoom, listRoomReset } from '../../actions/room/listRoom';
import { detailUser, detailUserReset } from '../../actions/user/detailUser';
import { listUserOfGroup, listUserOfGroupReset } from '../../actions/user/listUserOfGroup';
import { getPermissionViewUser } from '../../actions/viewPermissions';
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
  doListRoom, doListRoomReset,
  doListPosition, doListPositionReset,
  doListMajor, doListMajorReset,
  doListLevel, doListLevelReset,
  doListUserOfGroup, doListUserOfGroupReset,
  doDetailUser, doDetailUserReset,
  doGetPermissionViewUser
}) {

  React.useEffect(() => {
    doGetPermissionViewUser()
  }, [doGetPermissionViewUser]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListRoomReset();
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
  }, [doListRoom, doListRoomReset, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListPositionReset();
      doListPosition();
    }
  }, [doListPosition, doListPositionReset, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListMajorReset();
      doListMajor();
    }
  }, [doListMajor, doListMajorReset, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListLevelReset();
      doListLevel();
    }
  }, [doListLevel, doListLevelReset, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListUserOfGroupReset();
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
  }, [doListUserOfGroup, doListUserOfGroupReset, viewPermissions]);

  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doDetailUserReset();
    }
  }, [doDetailUser, doDetailUserReset, viewPermissions]);

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
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListRoomReset: () => dispatch(listRoomReset()),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListPositionReset: () => dispatch(listPositionReset()),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListMajorReset: () => dispatch(listMajorReset()),
    doListLevel: (quite) => dispatch(listLevel(quite)),
    doListLevelReset: () => dispatch(listLevelReset()),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doListUserOfGroupReset: () => dispatch(listUserOfGroupReset()),
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
    doDetailUserReset: () => dispatch(detailUserReset()),
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
