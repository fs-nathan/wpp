import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailProject } from '../../actions/project/detailProject';
import { memberProject } from '../../actions/project/memberProject';
import { listTask } from '../../actions/task/listTask';
import { listGroupTask } from '../../actions/groupTask/listGroupTask';
import ProjectDetail from './LeftPart/ProjectDetail';
import ProjectMemberSlide from './LeftPart/ProjectMemberSlide';
import GroupTaskSlide from './LeftPart/GroupTaskSlide';
import AllTaskTable from './RightPart/AllTaskTable';
import { 
  CustomEventListener, CustomEventDispose,
  UPDATE_PROJECT,
  CREATE_GROUP_TASK, UPDATE_GROUP_TASK, SORT_GROUP_TASK, DELETE_GROUP_TASK,
  ADD_MEMBER_PROJECT, REMOVE_MEMBER_PROJECT,
  UPDATE_STATE_JOIN_TASK,
} from '../../constants/events';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectPage({
  doDetailProject,
  doMemberProject,
  doListTask,
  doListGroupTask,
}) {

  const [projectId, setProjectId] = React.useState();

  React.useEffect(() => {
    if (projectId) {
      doDetailProject({ projectId });
      
      const reloadDetailProject = () => {
        doDetailProject({ projectId }, true);
      }
      
      CustomEventListener(UPDATE_PROJECT, reloadDetailProject);
      CustomEventListener(ADD_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
      
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadDetailProject);
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
      }
    }
  }, [projectId, doDetailProject]);

  React.useEffect(() => {
    if (projectId) {
      doMemberProject({ projectId });
      
      const reloadMemberProject = () => {
        doMemberProject({ projectId }, true);
      }
      
      CustomEventListener(UPDATE_PROJECT, reloadMemberProject);
      CustomEventListener(ADD_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
      
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadMemberProject);
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
      }
    }
  }, [projectId, doMemberProject]);

  React.useEffect(() => {
    if (projectId) {
      doListTask({ projectId });
    }

    const reloadListTask = () => {
      doListTask({ projectId }, true);
    }

    CustomEventListener(CREATE_GROUP_TASK, reloadListTask);
    CustomEventListener(UPDATE_GROUP_TASK, reloadListTask);
    CustomEventListener(DELETE_GROUP_TASK, reloadListTask);
    CustomEventListener(SORT_GROUP_TASK, reloadListTask);

    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, reloadListTask);
      CustomEventDispose(UPDATE_GROUP_TASK, reloadListTask);
      CustomEventDispose(DELETE_GROUP_TASK, reloadListTask);
      CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
    }
  }, [projectId, doListTask]);


  React.useEffect(() => {
    if (projectId) {
      doListGroupTask({ projectId });
    }

    const reloadListGroupTask = () => {
      doListGroupTask({ projectId }, true);
    }

    CustomEventListener(CREATE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(UPDATE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(DELETE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);

    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(UPDATE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(DELETE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
    }
  }, [projectId, doListGroupTask]);

  return (
    <Provider value={{
      setProjectId,
    }}>
      <Route 
        path='/project'
        render={({ match: { url, } }) => (
          <>
            <Route 
              path={`${url}/:projectId`}
              exact
              render={props => (
                <TwoColumnsLayout 
                  leftRenders={[
                    () => <ProjectDetail {...props} />,
                    ({ handleSubSlide }) => <ProjectMemberSlide {...props} handleSubSlide={handleSubSlide} />,
                    ({ handleSubSlide }) => <GroupTaskSlide {...props} handleSubSlide={handleSubSlide} />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand, handleSubSlide, }) => 
                      <AllTaskTable 
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                        handleSubSlide={handleSubSlide}  
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
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doMemberProject: ({ projectId }, quite) => dispatch(memberProject({ projectId }, quite)),
    doListTask: ({ projectId }, quite) => dispatch(listTask({ projectId }, quite)),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectPage);
