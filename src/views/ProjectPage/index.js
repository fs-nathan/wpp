import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupTable from './RightPart/AllProjectTable';

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

function ProjectPage() {

  const [expand, setExpand] = React.useState(false);
  
  function handleExpand(expand) {
    setExpand(expand);
  }

  return (
    <Container expand={expand}>
      <Route 
        path='/projects'
        render={({ match: { url, } }) => (
          <LeftDiv expand={expand}>
            <Route path={`${url}/`} 
              render={props => 
                <ProjectGroupList {...props} />
              } 
              exact 
            />
            <Route path={`${url}/:projectGroupId`} 
              render={props => 
                <ProjectGroupDetail {...props} />
              } 
              exact 
            />
          </LeftDiv>
        )}
      />
      <Route 
        path='/projects'
        render={({ match: { url, } }) => (
          <RightDiv>
            <Route path={`${url}/`} 
              render={props => 
                <ProjectGroupTable 
                  {...props}
                  expand={expand}
                  handleExpand={handleExpand} 
                />
              } 
              exact 
            />
            <Route path={`${url}/:projectGroupId`} 
              render={props => 
                <ProjectGroupTable 
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

export default ProjectPage;
