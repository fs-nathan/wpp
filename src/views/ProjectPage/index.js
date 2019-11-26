import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailProject } from '../../actions/project/detailProject';
import { listTask } from '../../actions/task/listTask';
import ProjectDetail from './LeftPart/ProjectDetail';
import AllTaskTable from './RightPart/AllTaskTable';
import { 
  CustomEventListener, CustomEventDispose,
  UPDATE_PROJECT,
} from '../../constants/events';

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

function ProjectPage({
  doDetailProject,
  doListTask,
}) {

  const [projectId, setProjectId] = React.useState();

  React.useEffect(() => {
    if (projectId) {
      doDetailProject({ projectId });
      
      const reloadDetailProject = () => {
        doDetailProject({ projectId }, true);
      }
      
      CustomEventListener(UPDATE_PROJECT, reloadDetailProject);
      
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadDetailProject);
      }
    }
  }, [projectId, doDetailProject]);

  React.useEffect(() => {
    if (projectId) {
      doListTask({ projectId });
    }
  }, [projectId, doListTask]);

  const [expand, setExpand] = React.useState(false);
  
  function handleExpand(expand) {
    setExpand(expand);
  }

  const [subSlide, setSubSlide] = React.useState(false);
  const [SubSlideComp, setSubSlideComp] = React.useState(null);

  function handleSubSlide(subSlide, comp = null) {
    setSubSlide(subSlide);
    setSubSlideComp(comp);
  }

  return (
    <Provider value={{
      setProjectId,
    }}>
      <Container expand={expand}>
        <Route 
          path='/project'
          render={({ match: { url, } }) => (
            <LeftDiv expand={expand}>
              <Route path={`${url}/:projectId`} 
                render={props => 
                  <>
                  {subSlide && 
                    <SubSlideComp
                      handleSubSlide={handleSubSlide}
                    />
                  }
                  {!subSlide && 
                    <ProjectDetail 
                      {...props}
                    />
                  }
                  </>
                } 
                exact 
              />
            </LeftDiv>
          )}
        />
        <Route 
          path='/project'
          render={({ match: { url, } }) => (
            <RightDiv>
              <Route path={`${url}/:projectId`} 
                render={props => 
                  <AllTaskTable 
                    {...props}
                    expand={expand}
                    handleExpand={handleExpand}
                    handleSubSlide={handleSubSlide}  
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
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doListTask: ({ projectId }, quite) => dispatch(listTask({ projectId }, quite)),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectPage);
