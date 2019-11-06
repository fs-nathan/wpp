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

function UserPage() {

  const [expand, setExpand] = React.useState(false);
  const [subSlide, setSubSlide] = React.useState(false);

  function handleExpand(expand) {
    setExpand(expand);
  }

  function handleSubSlide(subSlide) {
    setSubSlide(subSlide);
  }

  return (
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
  )
}

export default UserPage;
