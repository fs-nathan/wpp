import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { listProjectGroup } from '../../actions/projectGroup/listProjectGroup';
import { detailProjectGroup } from '../../actions/projectGroup/detailProjectGroup';
import { memberProjectGroup } from '../../actions/projectGroup/memberProjectGroup';
import { listIcon } from '../../actions/icon/listIcon';
import { listProject } from '../../actions/project/listProject';
import { 
  CustomEventListener, CustomEventDispose, 
  CREATE_PROJECT_GROUP, SORT_PROJECT_GROUP, DELETE_PROJECT_GROUP, EDIT_PROJECT_GROUP,
  CREATE_ICON, DELETE_ICON,
  CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, HIDE_PROJECT,
} from '../../constants/events';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupTable from './RightPart/AllProjectTable';

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

function ProjectGroupPage({
  doListIcon,
  doListProjectGroup,
  doDetailProjectGroup,
  doMemberProjectGroup,
  doListProject,
}) {

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
    doListProjectGroup();

    const reloadListProjectGroup = () => {
      doListProjectGroup(true);
    }

    CustomEventListener(CREATE_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(DELETE_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(EDIT_PROJECT_GROUP, reloadListProjectGroup);
    CustomEventListener(CREATE_PROJECT, reloadListProjectGroup);
    CustomEventListener(DELETE_PROJECT, reloadListProjectGroup);

    return () => {
      CustomEventDispose(CREATE_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(DELETE_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(EDIT_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventDispose(CREATE_PROJECT, reloadListProjectGroup);
      CustomEventDispose(DELETE_PROJECT, reloadListProjectGroup);
    }
  }, [doListProjectGroup]);

  const [projectGroupId, setProjectGroupId] = React.useState();

  React.useEffect(() => {
    if (projectGroupId) {
      doDetailProjectGroup({ projectGroupId });

      const reloadDetailProjectGroup = () => {
        doDetailProjectGroup({ projectGroupId }, true);
      }

      CustomEventListener(EDIT_PROJECT_GROUP, reloadDetailProjectGroup);
      
      return () => {
        CustomEventDispose(EDIT_PROJECT_GROUP, reloadDetailProjectGroup);
      }
    }
  }, [projectGroupId, doDetailProjectGroup]);

  React.useEffect(() => {
    if (projectGroupId) {
      doMemberProjectGroup({ projectGroupId });

      const reloadMemberProjectGroup = () => {
        doMemberProjectGroup({ projectGroupId }, true);
      }

      CustomEventListener(EDIT_PROJECT_GROUP, reloadMemberProjectGroup);
      
      return () => {
        CustomEventDispose(EDIT_PROJECT_GROUP, reloadMemberProjectGroup);
      }
    }
  }, [projectGroupId, doMemberProjectGroup]);

  React.useEffect(() => {
    doListProject({
      groupProject: projectGroupId,
    });

    const reloadListProject = () => {
      doListProject({
        groupProject: projectGroupId,
      }, true);
    }

    CustomEventListener(CREATE_PROJECT, reloadListProject);
    CustomEventListener(UPDATE_PROJECT, reloadListProject);
    CustomEventListener(DELETE_PROJECT, reloadListProject);
    CustomEventListener(HIDE_PROJECT, reloadListProject);

    return () => {
      CustomEventDispose(CREATE_PROJECT, reloadListProject);
      CustomEventDispose(UPDATE_PROJECT, reloadListProject);
      CustomEventDispose(DELETE_PROJECT, reloadListProject);
      CustomEventDispose(HIDE_PROJECT, reloadListProject);
    }
  }, [projectGroupId, doListProject]);

  const [expand, setExpand] = React.useState(false);
  
  function handleExpand(expand) {
    setExpand(expand);
  }

  return (
    <Provider value={{
      setProjectGroupId,
    }}>
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
    </Provider>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectGroupPage);
