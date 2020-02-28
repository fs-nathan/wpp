import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { listProjectGroup } from '../../actions/projectGroup/listProjectGroup';
import { detailProject } from '../../actions/project/detailProject';
import { memberProject } from '../../actions/project/memberProject';
import { listTask } from '../../actions/task/listTask';
import { listGroupTask } from '../../actions/groupTask/listGroupTask';
import { getAllGroupTask } from '../../actions/groupTask/getAllGroupTask';
import { listUserRole } from '../../actions/userRole/listUserRole';
import ProjectDetail from './LeftPart/ProjectDetail';
import ProjectMemberSlide from './LeftPart/ProjectMemberSlide';
import GroupTaskSlide from './LeftPart/GroupTaskSlide';
import AllTaskTable from './RightPart/AllTaskTable';
import { 
  CustomEventListener, CustomEventDispose,
  CREATE_PROJECT_GROUP, SORT_PROJECT_GROUP, DELETE_PROJECT_GROUP, EDIT_PROJECT_GROUP,
  CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT,
  CREATE_GROUP_TASK, COPY_GROUP_TASK, UPDATE_GROUP_TASK, SORT_GROUP_TASK, DELETE_GROUP_TASK,
  ADD_MEMBER_PROJECT, REMOVE_MEMBER_PROJECT,
  UPDATE_STATE_JOIN_TASK,
  ASSIGN_MEMBER_TO_ALL_TASK,
  ADD_PROJECT_ROLE_TO_MEMBER, REMOVE_PROJECT_ROLE_FROM_MEMBER,
  CREATE_TASK, DELETE_TASK, SORT_TASK,
  SHOW_PROJECT, HIDE_PROJECT,
  CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE,
} from '../../constants/events';
import { get } from 'lodash';
import moment from 'moment';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectPage({
  doListProjectGroup,
  doDetailProject,
  doMemberProject,
  doListTask,
  doListGroupTask, doGetAllGroupTask,
  doListUserRole,
}) {

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

  const [projectId, setProjectId] = React.useState();

  React.useEffect(() => {
    if (projectId) {
      doDetailProject({ projectId });
      
      const reloadDetailProject = () => {
        doDetailProject({ projectId }, true);
      }
      
      CustomEventListener(UPDATE_PROJECT, reloadDetailProject);
      CustomEventListener(SHOW_PROJECT, reloadDetailProject);
      CustomEventListener(HIDE_PROJECT, reloadDetailProject);
      CustomEventListener(ADD_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
      CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
      
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadDetailProject);
        CustomEventDispose(SHOW_PROJECT, reloadDetailProject);
        CustomEventDispose(HIDE_PROJECT, reloadDetailProject);
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
        CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
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
      CustomEventListener(SHOW_PROJECT, reloadMemberProject);
      CustomEventListener(HIDE_PROJECT, reloadMemberProject);
      CustomEventListener(ADD_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
      CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
      CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
      CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
      
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadMemberProject);
        CustomEventDispose(SHOW_PROJECT, reloadMemberProject);
        CustomEventDispose(HIDE_PROJECT, reloadMemberProject);
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
        CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
        CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
        CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
      }
    }
  }, [projectId, doMemberProject]);

  const [timeRange, setTimeRange] = React.useState({});

  console.log(timeRange);

  React.useEffect(() => {
    if (projectId) {
      doListTask({ 
        projectId,
        timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
        timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
      });
    }

    const reloadListTask = () => {
      doListTask({ 
        projectId,
        timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
        timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
      }, true);
    }

    CustomEventListener(CREATE_GROUP_TASK, reloadListTask);
    CustomEventListener(COPY_GROUP_TASK, reloadListTask);
    CustomEventListener(UPDATE_GROUP_TASK, reloadListTask);
    CustomEventListener(DELETE_GROUP_TASK, reloadListTask);
    CustomEventListener(SORT_GROUP_TASK, reloadListTask);
    CustomEventListener(CREATE_TASK, reloadListTask);
    CustomEventListener(DELETE_TASK, reloadListTask);
    CustomEventListener(SORT_TASK, reloadListTask);

    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, reloadListTask);
      CustomEventDispose(COPY_GROUP_TASK, reloadListTask);
      CustomEventDispose(UPDATE_GROUP_TASK, reloadListTask);
      CustomEventDispose(DELETE_GROUP_TASK, reloadListTask);
      CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
      CustomEventDispose(CREATE_TASK, reloadListTask);
      CustomEventDispose(DELETE_TASK, reloadListTask);
      CustomEventDispose(SORT_TASK, reloadListTask);
    }
  }, [projectId, doListTask, timeRange]);

  React.useEffect(() => {
    if (projectId) {
      doListGroupTask({ projectId });
    }

    const reloadListGroupTask = () => {
      doListGroupTask({ projectId }, true);
    }

    CustomEventListener(CREATE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(COPY_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(UPDATE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(DELETE_GROUP_TASK, reloadListGroupTask);
    CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);

    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(COPY_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(UPDATE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(DELETE_GROUP_TASK, reloadListGroupTask);
      CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
    }
  }, [projectId, doListGroupTask]);

  React.useEffect(() => {
    
    doGetAllGroupTask();

    const reloadGetAllGroupTask = () => {
      doGetAllGroupTask(true);
    }

    CustomEventListener(CREATE_GROUP_TASK, reloadGetAllGroupTask);
    CustomEventListener(COPY_GROUP_TASK, reloadGetAllGroupTask);
    CustomEventListener(UPDATE_GROUP_TASK, reloadGetAllGroupTask);
    CustomEventListener(DELETE_GROUP_TASK, reloadGetAllGroupTask);
    CustomEventListener(SORT_GROUP_TASK, reloadGetAllGroupTask);

    return () => {
      CustomEventDispose(CREATE_GROUP_TASK, reloadGetAllGroupTask);
      CustomEventDispose(COPY_GROUP_TASK, reloadGetAllGroupTask);
      CustomEventDispose(UPDATE_GROUP_TASK, reloadGetAllGroupTask);
      CustomEventDispose(DELETE_GROUP_TASK, reloadGetAllGroupTask);
      CustomEventDispose(SORT_GROUP_TASK, reloadGetAllGroupTask);
    }
  }, [doGetAllGroupTask]);

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

  return (
    <Provider value={{
      setProjectId,
      setTimeRange,
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
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doMemberProject: ({ projectId }, quite) => dispatch(memberProject({ projectId }, quite)),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
    doGetAllGroupTask: (quite) => dispatch(getAllGroupTask(quite)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectPage);
