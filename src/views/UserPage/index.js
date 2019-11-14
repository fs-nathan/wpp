import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { listRoom } from '../../actions/room/listRoom';
import { detailRoom } from '../../actions/room/detailRoom';
import { getUserOfRoom } from '../../actions/room/getUserOfRoom';
import { listPosition } from '../../actions/position/listPosition';
import { listUserRole } from '../../actions/userRole/listUserRole';
import { listIcon } from '../../actions/icon/listIcon';
import { listUserOfGroup } from '../../actions/user/listUserOfGroup';
import { detailUser } from '../../actions/user/detailUser';
import DepartmentList from './LeftPart/DepartmentList';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import AddUser from './LeftPart/AddUser';
import UserList from './LeftPart/UserList';
import AllUsersTable from './RightPart/AllUsersTable';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';
import UserInfo from './RightPart/UserInfo';

export const UserPageContext = React.createContext();
const { Provider } = UserPageContext;

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
  listRoom, doListRoom,
  detailRoom, doDetailRoom,
  getUserOfRoom, doGetUserOfRoom,
  listPosition, doListPosition,
  listUserRole, doListUserRole,
  listIcon, doListIcon,
  listUserOfGroup, doListUserOfGroup,
  detailUser, doDetailUser,
}) {

  React.useEffect(() => {
    doListRoom();
    doListPosition();
    doListUserRole();
    doListIcon();
    doListUserOfGroup();
  }, []);
  
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
      listRoom,
      detailRoom, 
      getUserOfRoom, 
      listPosition, 
      listUserRole, 
      listIcon, 
      listUserOfGroup, 
      detailUser,
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

const mapStateToProps = state => {
  return {
    listRoom: state.room.listRoom,
    detailRoom: state.room.detailRoom,
    getUserOfRoom: state.room.getUserOfRoom,
    listPosition: state.position.listPosition,
    listUserRole: state.userRole.listUserRole,
    listIcon: state.icon.listIcon,
    listUserOfGroup: state.user.listUserOfGroup,
    detailUser: state.user.detailUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
