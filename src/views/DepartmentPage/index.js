import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { listIcon } from '../../actions/icon/listIcon';
import { listLevel } from '../../actions/level/listLevel';
import { listMajor } from '../../actions/major/listMajor';
import { listPosition } from '../../actions/position/listPosition';
import { detailRoom } from '../../actions/room/detailRoom';
import { getUserOfRoom } from '../../actions/room/getUserOfRoom';
import { listRoom } from '../../actions/room/listRoom';
import { listUserOfGroup } from '../../actions/user/listUserOfGroup';
import { listUserRole } from '../../actions/userRole/listUserRole';
import { getPermissionViewUser } from '../../actions/viewPermissions';
import LoadingOverlay from '../../components/LoadingOverlay';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import {
  //PUBLIC_MEMBER, PRIVATE_MEMBER, UPDATE_USER,
  //CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION,
  //CREATE_LEVEL, UPDATE_LEVEL, DELETE_LEVEL,
  //CREATE_MAJOR, UPDATE_MAJOR, DELETE_MAJOR,
  //CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE,
  //CREATE_ICON, DELETE_ICON,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, CREATE_ROOM, CustomEventDispose, CustomEventListener, DELETE_ROOM, INVITE_USER_JOIN_GROUP, SORT_ROOM, SORT_USER, UPDATE_ROOM
} from '../../constants/events';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import DepartmentList from './LeftPart/DepartmentList';
import AllUsersTable from './RightPart/AllUsersTable';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';
import { routeSelector, viewPermissionsSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function UserPage({
  route, viewPermissions,
  doListRoom,
  doDetailRoom,
  doGetUserOfRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doListUserRole,
  doListIcon,
  doListUserOfGroup,
  doGetPermissionViewUser,
}) {

  React.useEffect(() => {
    doGetPermissionViewUser()
  }, [doGetPermissionViewUser]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListRoom();

      const reloadListRoom = () => {
        doListRoom();
      }

      //CustomEventListener(CREATE_ROOM, reloadListRoom);
      //CustomEventListener(UPDATE_ROOM, reloadListRoom);
      //CustomEventListener(DELETE_ROOM, reloadListRoom);
      CustomEventListener(SORT_ROOM, reloadListRoom);

      return () => {
        //CustomEventDispose(CREATE_ROOM, reloadListRoom);
        //CustomEventDispose(UPDATE_ROOM, reloadListRoom);
        //CustomEventDispose(DELETE_ROOM, reloadListRoom);
        CustomEventDispose(SORT_ROOM, reloadListRoom);
      }
    }
  }, [doListRoom, viewPermissions]);

  const [departmentId, setDepartmentId] = React.useState();

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (departmentId && departmentId !== 'default') {
        doDetailRoom({ roomId: departmentId });
        /*
        const reloadDetailRoom = () => {
          doDetailRoom({ roomId: departmentId });
        }  

        CustomEventListener(UPDATE_ROOM, reloadDetailRoom);
        
        return () => {
          CustomEventDispose(UPDATE_ROOM, reloadDetailRoom);
        }
        */
      }
    }
  }, [departmentId, doDetailRoom, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (departmentId) {
        doGetUserOfRoom({ roomId: departmentId });

        const reloadGetUserOfRoom = () => {
          doGetUserOfRoom({ roomId: departmentId });
        }

        //CustomEventListener(UPDATE_USER, reloadGetUserOfRoom);
        CustomEventListener(SORT_USER, reloadGetUserOfRoom);
        CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
        CustomEventListener(BAN_USER_FROM_GROUP, reloadGetUserOfRoom);
        //CustomEventListener(PUBLIC_MEMBER, reloadGetUserOfRoom);
        //CustomEventListener(PRIVATE_MEMBER, reloadGetUserOfRoom);

        return () => {
          //CustomEventDispose(UPDATE_USER, reloadGetUserOfRoom);
          CustomEventDispose(SORT_USER, reloadGetUserOfRoom);
          CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
          CustomEventDispose(BAN_USER_FROM_GROUP, reloadGetUserOfRoom)
          //CustomEventDispose(PUBLIC_MEMBER, reloadGetUserOfRoom);
          //CustomEventDispose(PRIVATE_MEMBER, reloadGetUserOfRoom);
        }
      }
    }
  }, [departmentId, doGetUserOfRoom, viewPermissions]);

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
    if (viewPermissions.permissions !== null) {
      doListMajor();

      /*
      const reloadListMajor = () => {
        doListMajor();
      };

      CustomEventListener(CREATE_MAJOR, reloadListMajor);
      CustomEventListener(UPDATE_MAJOR, reloadListMajor);
      CustomEventListener(DELETE_MAJOR, reloadListMajor);

      return () => {
        CustomEventDispose(CREATE_MAJOR, reloadListMajor);
        CustomEventDispose(UPDATE_MAJOR, reloadListMajor);
        CustomEventDispose(DELETE_MAJOR, reloadListMajor);
      }
      */
    }
  }, [doListMajor, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListLevel();

      /*
      const reloadListLevel = () => {
        doListLevel();
      };

      CustomEventListener(CREATE_LEVEL, reloadListLevel);
      CustomEventListener(UPDATE_LEVEL, reloadListLevel);
      CustomEventListener(DELETE_LEVEL, reloadListLevel);

      return () => {
        CustomEventDispose(CREATE_LEVEL, reloadListLevel);
        CustomEventDispose(UPDATE_LEVEL, reloadListLevel);
        CustomEventDispose(DELETE_LEVEL, reloadListLevel);
      }
      */
    }
  }, [doListLevel, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListUserRole();

      /*
      const reloadListUserRole = () => {
        doListUserRole();
      };

      CustomEventListener(CREATE_USER_ROLE, reloadListUserRole);
      CustomEventListener(UPDATE_USER_ROLE, reloadListUserRole);
      CustomEventListener(DELETE_USER_ROLE, reloadListUserRole);

      return () => {
        CustomEventDispose(CREATE_USER_ROLE, reloadListUserRole);
        CustomEventDispose(UPDATE_USER_ROLE, reloadListUserRole);
        CustomEventDispose(DELETE_USER_ROLE, reloadListUserRole);
      }
      */
    }
  }, [doListUserRole, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListIcon();

      /*
      const reloadListIcon = () => {
        doListIcon();
      };

      CustomEventListener(CREATE_ICON, reloadListIcon);
      CustomEventListener(DELETE_ICON, reloadListIcon);

      return () => {
        CustomEventDispose(CREATE_ICON, reloadListIcon);
        CustomEventDispose(DELETE_ICON, reloadListIcon);
      }
      */
    }
  }, [doListIcon, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListUserOfGroup();

      const reloadListUserOfGroup = () => {
        doListUserOfGroup();
      }

      CustomEventListener(CREATE_ROOM, reloadListUserOfGroup);
      CustomEventListener(UPDATE_ROOM, reloadListUserOfGroup);
      CustomEventListener(DELETE_ROOM, reloadListUserOfGroup);
      CustomEventListener(SORT_ROOM, reloadListUserOfGroup);
      //CustomEventListener(UPDATE_USER, reloadListUserOfGroup);
      CustomEventListener(SORT_USER, reloadListUserOfGroup);
      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
      CustomEventListener(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
      //CustomEventListener(PUBLIC_MEMBER, reloadListUserOfGroup);
      //CustomEventListener(PRIVATE_MEMBER, reloadListUserOfGroup);
      CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);

      return () => {
        CustomEventDispose(CREATE_ROOM, reloadListUserOfGroup);
        CustomEventDispose(UPDATE_ROOM, reloadListUserOfGroup);
        CustomEventDispose(DELETE_ROOM, reloadListUserOfGroup);
        CustomEventDispose(SORT_ROOM, reloadListUserOfGroup);
        //CustomEventDispose(UPDATE_USER, reloadListUserOfGroup);
        CustomEventDispose(SORT_USER, reloadListUserOfGroup);
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
        CustomEventDispose(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
        //CustomEventDispose(PUBLIC_MEMBER, reloadListUserOfGroup);
        //CustomEventDispose(PRIVATE_MEMBER, reloadListUserOfGroup);
        CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);
      }
    }
  }, [doListUserOfGroup, viewPermissions]);

  return (
    <LoadingOverlay
      active={viewPermissions.loading}
    >
      <Provider value={{
        setDepartmentId,
      }}>
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
            </>
          )}
        />
      </Provider>
    </LoadingOverlay>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
  };
};

export default connect(
  state => ({
    viewPermissions: viewPermissionsSelector(state),
    route: routeSelector(state),
  }),
  mapDispatchToProps,
)(UserPage);
