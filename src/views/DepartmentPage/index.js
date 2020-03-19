import React from 'react';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { listRoom } from '../../actions/room/listRoom';
import { detailRoom } from '../../actions/room/detailRoom';
import { getUserOfRoom } from '../../actions/room/getUserOfRoom';
import { listPosition } from '../../actions/position/listPosition';
import { listUserRole } from '../../actions/userRole/listUserRole';
import { listMajor } from '../../actions/major/listMajor';
import { listLevel } from '../../actions/level/listLevel';
import { listIcon } from '../../actions/icon/listIcon';
import { listUserOfGroup } from '../../actions/user/listUserOfGroup';
import {
  CustomEventListener, CustomEventDispose,
  SORT_ROOM, CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM,
  SORT_USER, INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, 
  //PUBLIC_MEMBER, PRIVATE_MEMBER, UPDATE_USER,
  //CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION,
  //CREATE_LEVEL, UPDATE_LEVEL, DELETE_LEVEL,
  //CREATE_MAJOR, UPDATE_MAJOR, DELETE_MAJOR,
  //CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE,
  //CREATE_ICON, DELETE_ICON,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP,
} from '../../constants/events';
import DepartmentList from './LeftPart/DepartmentList';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import AllUsersTable from './RightPart/AllUsersTable';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';

export const Context = React.createContext();
const { Provider } = Context;

function UserPage({
  doListRoom,
  doDetailRoom,
  doGetUserOfRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doListUserRole,
  doListIcon,
  doListUserOfGroup,
}) {

  React.useEffect(() => {
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
  }, [doListRoom]); 

  const [departmentId, setDepartmentId] = React.useState();

  React.useEffect(() => {
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
  }, [departmentId, doDetailRoom]);

  React.useEffect(() => {
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
  }, [departmentId, doGetUserOfRoom]);

  React.useEffect(() => {
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
  }, [doListPosition]);

  React.useEffect(() => {
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
  }, [doListMajor]);

  React.useEffect(() => {
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
  }, [doListLevel]);

  React.useEffect(() => {
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
  }, [doListUserRole]);

  React.useEffect(() => {
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
  }, [doListIcon]);

  React.useEffect(() => {
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
  }, [doListUserOfGroup]);

  return (
    <Provider value={{
      setDepartmentId,
    }}>
      <Route
        path='/departments'
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
              path={`${url}/:departmentId`}
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
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(UserPage);
