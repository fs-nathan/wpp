import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import DepartmentList from './LeftPart/DepartmentList';
import DepartmentInfo from './LeftPart/DepartmentInfo';
import AddUser from './LeftPart/AddUser';
import UserList from './LeftPart/UserList';
import AllUsersTable from './RightPart/AllUsersTable';
import DepartmentUsersTable from './RightPart/DepartmentUsersTable';
import UserInfo from './RightPart/UserInfo';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(800px, 3fr);
  grid-template-areas:
    "left right";
`;

function UserPage() {
  return (
    <Container> 
      <Route 
        path='/thanh-vien'
        render={({ match: { url, } }) => (
          <React.Fragment>
            <Route path={`${url}/`} component={DepartmentList} exact />
            <Route path={`${url}/them-thanh-vien`} component={AddUser} />
            <Route path={`${url}/thong-tin/:departmentId`} component={DepartmentInfo} exact />
            <Route path={`${url}/thong-tin/:departmentId/them-thanh-vien`} component={AddUser} />
            <Route path={`${url}/thong-tin/:departmentId/nguoi-dung/:userId`} component={UserList} />
          </React.Fragment>
        )}
      />
      <Route 
        path='/thanh-vien'
        render={({ match: { url, } }) => (
          <React.Fragment>
            <Route path={`${url}/`} component={AllUsersTable} exact />
            <Route path={`${url}/them-thanh-vien`} component={AllUsersTable} />
            <Route path={`${url}/thong-tin/:departmentId`} component={DepartmentUsersTable} exact />
            <Route path={`${url}/thong-tin/:departmentId/them-thanh-vien`} component={DepartmentUsersTable} />
            <Route path={`${url}/thong-tin/:departmentId/nguoi-dung/:userId`} component={UserInfo} />
          </React.Fragment>
        )}
      />
    </Container>
  )
}

export default UserPage;
