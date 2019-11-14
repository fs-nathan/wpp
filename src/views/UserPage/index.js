import React from 'react';
import styled from 'styled-components';
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
import { detailUser } from '../../actions/user/detailUser';
import {
  CustomEventListener, CustomEventDispose,
  SORT_ROOM, CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM,
  SORT_USER, INVITE_USER_JOIN_GROUP, BAN_USER_FROM_GROUP, PUBLIC_MEMBER, PRIVATE_MEMBER, UPLOAD_DOCUMENTS_USER, UPDATE_USER,
  CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION,
  CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE,
  CREATE_ICON, DELETE_ICON,
} from '../../constants/events';
import DepartmentList from './LeftPart/DepartmentList';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import AddUser from './LeftPart/AddUser';
import UserList from './LeftPart/UserList';
import AllUsersTable from './RightPart/AllUsersTable';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';
import UserInfo from './RightPart/UserInfo';

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
  doListRoom,
  doDetailRoom,
  doGetUserOfRoom,
  doListPosition,
  doListMajor,
  doListLevel,
  doListUserRole,
  doListIcon,
  doListUserOfGroup,
  doDetailUser,
}) {

  React.useEffect(() => {
    doListRoom();

    const reloadListRoom = () => {
      doListRoom(true);
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
  }, [doListRoom]); 

  const [departmentId, setDepartmentId] = React.useState();

  React.useEffect(() => {
    if (departmentId && departmentId !== 'default') {
      doDetailRoom({ roomId: departmentId });
      
      const reloadDetailRoom = () => {
        doDetailRoom({ roomId: departmentId }, true);
      }  

      CustomEventListener(UPDATE_ROOM, reloadDetailRoom);
      
      return () => {
        CustomEventDispose(UPDATE_ROOM, reloadDetailRoom);
      }
    }
  }, [departmentId, doDetailRoom]);

  React.useEffect(() => {
    if (departmentId) {
      doGetUserOfRoom({ roomId: departmentId });

      const reloadGetUserOfRoom = () => {
        doGetUserOfRoom({ roomId: departmentId }, true);
      }

      CustomEventListener(UPDATE_USER, reloadGetUserOfRoom);
      CustomEventListener(SORT_USER, reloadGetUserOfRoom);
      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
      CustomEventListener(BAN_USER_FROM_GROUP, reloadGetUserOfRoom);
      CustomEventListener(PUBLIC_MEMBER, reloadGetUserOfRoom);
      CustomEventListener(PRIVATE_MEMBER, reloadGetUserOfRoom);
      
      return () => {
        CustomEventDispose(UPDATE_USER, reloadGetUserOfRoom);
        CustomEventDispose(SORT_USER, reloadGetUserOfRoom);
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
        CustomEventDispose(BAN_USER_FROM_GROUP, reloadGetUserOfRoom)
        CustomEventDispose(PUBLIC_MEMBER, reloadGetUserOfRoom);
        CustomEventDispose(PRIVATE_MEMBER, reloadGetUserOfRoom);
      }
    }
  }, [departmentId, doGetUserOfRoom]);

  React.useEffect(() => {
    doListPosition();

    const reloadListPosition = () => {
      doListPosition(true);
    };

    CustomEventListener(CREATE_POSITION, reloadListPosition);
    CustomEventListener(UPDATE_POSITION, reloadListPosition);
    CustomEventListener(DELETE_POSITION, reloadListPosition);

    return () => {
      CustomEventDispose(CREATE_POSITION, reloadListPosition);
      CustomEventDispose(UPDATE_POSITION, reloadListPosition);
      CustomEventDispose(DELETE_POSITION, reloadListPosition);
    }
  }, [doListPosition]);

  React.useEffect(() => {
    doListMajor();
  }, [doListMajor]);

  React.useEffect(() => {
    doListLevel();
  }, [doListLevel]);

  React.useEffect(() => {
    doListUserRole();

    const reloadListUserRole = () => {
      doListUserRole(true);
    };

    CustomEventListener(CREATE_USER_ROLE, reloadListUserRole);
    CustomEventListener(UPDATE_USER_ROLE, reloadListUserRole);
    CustomEventListener(DELETE_USER_ROLE, reloadListUserRole);

    return () => {
      CustomEventDispose(CREATE_USER_ROLE, reloadListUserRole);
      CustomEventDispose(UPDATE_USER_ROLE, reloadListUserRole);
      CustomEventDispose(DELETE_USER_ROLE, reloadListUserRole);
    }
  }, [doListUserRole]);

  React.useEffect(() => {
    doListIcon();

    const reloadListIcon = () => {
      doListIcon(true);
    };

    CustomEventListener(CREATE_ICON, reloadListIcon);
    CustomEventListener(DELETE_ICON, reloadListIcon);

    return () => {
      CustomEventDispose(CREATE_ICON, reloadListIcon);
      CustomEventDispose(DELETE_ICON, reloadListIcon);
    }
  }, [doListIcon]);

  React.useEffect(() => {
    doListUserOfGroup();

    const reloadListUserOfGroup = () => {
      doListUserOfGroup(true);
    }

    CustomEventListener(CREATE_ROOM, reloadListUserOfGroup);
    CustomEventListener(UPDATE_ROOM, reloadListUserOfGroup);
    CustomEventListener(DELETE_ROOM, reloadListUserOfGroup);
    CustomEventListener(SORT_ROOM, reloadListUserOfGroup);
    CustomEventListener(UPDATE_USER, reloadListUserOfGroup);
    CustomEventListener(SORT_USER, reloadListUserOfGroup);
    CustomEventListener(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
    CustomEventListener(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
    CustomEventListener(PUBLIC_MEMBER, reloadListUserOfGroup);
    CustomEventListener(PRIVATE_MEMBER, reloadListUserOfGroup);

    return () => {
      CustomEventDispose(CREATE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(UPDATE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(DELETE_ROOM, reloadListUserOfGroup);
      CustomEventDispose(SORT_ROOM, reloadListUserOfGroup);
      CustomEventDispose(UPDATE_USER, reloadListUserOfGroup);
      CustomEventDispose(SORT_USER, reloadListUserOfGroup);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
      CustomEventDispose(BAN_USER_FROM_GROUP, reloadListUserOfGroup);
      CustomEventDispose(PUBLIC_MEMBER, reloadListUserOfGroup);
      CustomEventDispose(PRIVATE_MEMBER, reloadListUserOfGroup);
    }
  }, [doListUserOfGroup]); 

  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    doDetailUser({ userId });
    
    const reloadDetailUserHandler = () => doDetailUser({ userId }, true);

    CustomEventListener(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
    CustomEventListener(UPDATE_USER, reloadDetailUserHandler);

    return () => {
      CustomEventDispose(UPLOAD_DOCUMENTS_USER, reloadDetailUserHandler);
      CustomEventDispose(UPDATE_USER, reloadDetailUserHandler);
    }
  }, [doDetailUser, userId]);
  
  const [expand, setExpand] = React.useState(false);
  const [subSlide, setSubSlide] = React.useState(false);

  function handleExpand(expand) {
    setExpand(expand);
  }

  function handleSubSlide(subSlide) {
    setSubSlide(subSlide);
  }

  return (
    <Provider value={{
      setDepartmentId,
      setUserId,
    }}>
      <Container expand={expand}>
        <Route 
          path='/departments'
          render={({ match: { url, } }) => (
            <LeftDiv expand={expand}>
              <Route path={`${url}/`} 
                render={props => 
                  <DepartmentList 
                    {...props} 
                    subSlide={subSlide} 
                    handleSubSlide={handleSubSlide} 
                    subSlideComp={AddUser} 
                  />
                } 
                exact />
              <Route path={`${url}/:departmentId`} 
                render={props => 
                  <DepartmentInfo 
                    {...props} 
                    subSlide={subSlide} 
                    handleSubSlide={handleSubSlide} 
                    subSlideComp={AddUser} 
                  />
                } 
                exact />
              <Route path={`${url}/members/:userId`} component={UserList} />
            </LeftDiv>
          )}
        />
        <Route 
          path='/departments'
          render={({ match: { url, } }) => (
            <RightDiv>
              <Route path={`${url}/`} 
                render={props => 
                  <AllUsersTable 
                    {...props} 
                    expand={expand}
                    handleExpand={handleExpand} 
                    handleSubSlide={handleSubSlide}
                  />
                } 
                exact 
              />
              <Route path={`${url}/:departmentId`} 
                render={props => 
                  <DepartmentUsersTable 
                    {...props} 
                    expand={expand}
                    handleExpand={handleExpand} 
                    handleSubSlide={handleSubSlide}
                  />
                }
                exact 
              />
              <Route path={`${url}/members/:userId`} 
                render={props => 
                  <UserInfo 
                    {...props} 
                    expand={expand}
                    handleExpand={handleExpand}
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
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(UserPage);
