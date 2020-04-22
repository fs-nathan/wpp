import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getAllGroupTask, getAllGroupTaskReset } from '../../actions/groupTask/getAllGroupTask';
import { listGroupTask, listGroupTaskReset } from '../../actions/groupTask/listGroupTask';
import { detailProject, detailProjectReset } from '../../actions/project/detailProject';
import { memberProject, memberProjectReset } from '../../actions/project/memberProject';
import { permissionProject, permissionProjectReset } from '../../actions/project/permissionProject';
import { detailStatus, detailStatusReset } from '../../actions/project/setting/detailStatus';
import { listProjectGroup, listProjectGroupReset } from '../../actions/projectGroup/listProjectGroup';
import { listTask, listTaskReset } from '../../actions/task/listTask';
import { getListTaskDetail } from '../../actions/taskDetail/taskDetailActions';
import { listUserRole, listUserRoleReset } from '../../actions/userRole/listUserRole';
import { getPermissionViewDetailProject } from '../../actions/viewPermissions';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import {
  ADD_MEMBER_PROJECT, ADD_PROJECT_ROLE_TO_MEMBER, ASSIGN_MEMBER_TO_ALL_TASK, COPY_GROUP_TASK,
  //DELETE_PROJECT_GROUP, EDIT_PROJECT_GROUP,
  //CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT,
  CREATE_GROUP_TASK, CREATE_TASK, CustomEventDispose, CustomEventListener, DELETE_GROUP_TASK, DELETE_TASK, REMOVE_MEMBER_PROJECT, REMOVE_PROJECT_ROLE_FROM_MEMBER, SORT_GROUP_TASK,
  //CREATE_PROJECT_GROUP,
  SORT_PROJECT_GROUP, SORT_TASK, UPDATE_GROUP_PERMISSION_MEMBER, UPDATE_GROUP_TASK, UPDATE_STATE_JOIN_TASK
} from '../../constants/events';
import { useLocalStorage } from '../../hooks';
import GroupTaskSlide from './LeftPart/GroupTaskSlide';
import ProjectDetail from './LeftPart/ProjectDetail';
import ProjectMemberSlide from './LeftPart/ProjectMemberSlide';
import AllTaskTable from './RightPart/AllTaskTable';
import { routeSelector, viewPermissionsSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectPage({
  doListProjectGroup, doListProjectGroupReset,
  doDetailProject, doDetailProjectReset,
  doMemberProject, doMemberProjectReset,
  doListTask, doListTaskReset,
  doListGroupTask, doListGroupTaskReset,
  doGetAllGroupTask, doGetAllGroupTaskReset,
  doListUserRole, doListUserRoleReset,
  doDetailStatus, doDetailStatusReset,
  doPermissionProject, doPermissionProjectReset,
  doGetListTaskDetail,
  doGetPermissionViewDetailProject,
  route, viewPermissions,
  doReset,
}) {

  const [projectId, setProjectId] = React.useState();

  React.useEffect(() => {
    if (projectId) doGetPermissionViewDetailProject({ projectId });
  }, [doGetPermissionViewDetailProject, projectId])

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_OPTIONS', {
    filterType: 1,
    timeType: 5,
  });

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListProjectGroupReset();
      doListProjectGroup();

      const reloadListProjectGroup = () => {
        doListProjectGroup(/*true*/);
      }

      //CustomEventListener(CREATE_PROJECT_GROUP, reloadListProjectGroup);
      CustomEventListener(SORT_PROJECT_GROUP, reloadListProjectGroup);
      //CustomEventListener(DELETE_PROJECT_GROUP, reloadListProjectGroup);
      //CustomEventListener(EDIT_PROJECT_GROUP, reloadListProjectGroup);
      //CustomEventListener(CREATE_PROJECT, reloadListProjectGroup);
      //CustomEventListener(DELETE_PROJECT, reloadListProjectGroup);

      return () => {
        //CustomEventDispose(CREATE_PROJECT_GROUP, reloadListProjectGroup);
        CustomEventDispose(SORT_PROJECT_GROUP, reloadListProjectGroup);
        //CustomEventDispose(DELETE_PROJECT_GROUP, reloadListProjectGroup);
        //CustomEventDispose(EDIT_PROJECT_GROUP, reloadListProjectGroup);
        //CustomEventDispose(CREATE_PROJECT, reloadListProjectGroup);
        //CustomEventDispose(DELETE_PROJECT, reloadListProjectGroup);
      }
    }
  }, [doListProjectGroup, doListProjectGroupReset, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doDetailProjectReset();
    }
  }, [viewPermissions, doDetailProjectReset]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (projectId) {
        doDetailProject({ projectId });

        const reloadDetailProject = () => {
          doDetailProject({ projectId });
        }

        //CustomEventListener(UPDATE_PROJECT, reloadDetailProject);
        //CustomEventListener(SHOW_PROJECT, reloadDetailProject);
        //CustomEventListener(HIDE_PROJECT, reloadDetailProject);
        CustomEventListener(ADD_MEMBER_PROJECT, reloadDetailProject);
        CustomEventListener(REMOVE_MEMBER_PROJECT, reloadDetailProject);
        CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
        CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
        CustomEventListener(CREATE_TASK, reloadDetailProject);
        CustomEventListener(DELETE_TASK, reloadDetailProject);

        return () => {
          //CustomEventDispose(UPDATE_PROJECT, reloadDetailProject);
          //CustomEventDispose(SHOW_PROJECT, reloadDetailProject);
          //CustomEventDispose(HIDE_PROJECT, reloadDetailProject);
          CustomEventDispose(ADD_MEMBER_PROJECT, reloadDetailProject);
          CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadDetailProject);
          CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
          CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
          CustomEventDispose(CREATE_TASK, reloadDetailProject);
          CustomEventDispose(DELETE_TASK, reloadDetailProject);
        }
      }
    }
  }, [projectId, doDetailProject, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      doMemberProjectReset();
    }
  }, [viewPermissions, doMemberProjectReset]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      if (projectId) {
        doMemberProject({ projectId });

        const reloadMemberProject = () => {
          doMemberProject({ projectId });
        }

        //CustomEventListener(UPDATE_PROJECT, reloadMemberProject);
        //CustomEventListener(SHOW_PROJECT, reloadMemberProject);
        //CustomEventListener(HIDE_PROJECT, reloadMemberProject);
        CustomEventListener(ADD_MEMBER_PROJECT, reloadMemberProject);
        CustomEventListener(REMOVE_MEMBER_PROJECT, reloadMemberProject);
        CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
        CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
        CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
        CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
        CustomEventListener(UPDATE_GROUP_PERMISSION_MEMBER, reloadMemberProject);

        return () => {
          //CustomEventDispose(UPDATE_PROJECT, reloadMemberProject);
          //CustomEventDispose(SHOW_PROJECT, reloadMemberProject);
          //CustomEventDispose(HIDE_PROJECT, reloadMemberProject);
          CustomEventDispose(ADD_MEMBER_PROJECT, reloadMemberProject);
          CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadMemberProject);
          CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
          CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
          CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
          CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
          CustomEventDispose(UPDATE_GROUP_PERMISSION_MEMBER, reloadMemberProject);
        }
      }
    }
  }, [projectId, doMemberProject, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      doPermissionProjectReset();
      doPermissionProject();
    }
  }, [doPermissionProject, doPermissionProjectReset, viewPermissions]);

  const [timeRange, setTimeRange] = React.useState({});

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListTaskReset();
    }
  }, [viewPermissions, doListTaskReset]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (projectId) {
        doListTask({
          projectId,
          timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
          timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
        });

        const reloadListTask = () => {
          doListTask({
            projectId,
            timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
            timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
          });
        }

        CustomEventListener(CREATE_GROUP_TASK, reloadListTask);
        CustomEventListener(COPY_GROUP_TASK, reloadListTask);
        CustomEventListener(UPDATE_GROUP_TASK, reloadListTask);
        CustomEventListener(DELETE_GROUP_TASK, reloadListTask);
        CustomEventListener(SORT_GROUP_TASK, reloadListTask);
        CustomEventListener(CREATE_TASK, reloadListTask);
        //CustomEventListener(DELETE_TASK, reloadListTask);
        CustomEventListener(SORT_TASK, reloadListTask);

        return () => {
          CustomEventDispose(CREATE_GROUP_TASK, reloadListTask);
          CustomEventDispose(COPY_GROUP_TASK, reloadListTask);
          CustomEventDispose(UPDATE_GROUP_TASK, reloadListTask);
          CustomEventDispose(DELETE_GROUP_TASK, reloadListTask);
          CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
          CustomEventDispose(CREATE_TASK, reloadListTask);
          //CustomEventDispose(DELETE_TASK, reloadListTask);
          CustomEventDispose(SORT_TASK, reloadListTask);
        }
      }
    }
  }, [projectId, doListTask, timeRange, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListGroupTaskReset();
    }
  }, [doListGroupTaskReset, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      if (projectId) {
        doListGroupTask({ projectId });


        const reloadListGroupTask = () => {
          doListGroupTask({ projectId });
        }

        //CustomEventListener(CREATE_GROUP_TASK, reloadListGroupTask);
        //CustomEventListener(COPY_GROUP_TASK, reloadListGroupTask);
        //CustomEventListener(UPDATE_GROUP_TASK, reloadListGroupTask);
        //CustomEventListener(DELETE_GROUP_TASK, reloadListGroupTask);
        CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);

        return () => {
          //CustomEventDispose(CREATE_GROUP_TASK, reloadListGroupTask);
          //CustomEventDispose(COPY_GROUP_TASK, reloadListGroupTask);
          //CustomEventDispose(UPDATE_GROUP_TASK, reloadListGroupTask);
          //CustomEventDispose(DELETE_GROUP_TASK, reloadListGroupTask);
          CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
        }
      }
    }
  }, [projectId, doListGroupTask, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      if (projectId) {
        doGetListTaskDetail({ projectId });

        const reloadGetListTaskDetail = () => {
          doGetListTaskDetail({ projectId });
        }

        CustomEventListener(CREATE_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventListener(COPY_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventListener(UPDATE_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventListener(DELETE_GROUP_TASK, reloadGetListTaskDetail);

        return () => {
          CustomEventDispose(CREATE_GROUP_TASK, reloadGetListTaskDetail);
          CustomEventDispose(COPY_GROUP_TASK, reloadGetListTaskDetail);
          CustomEventDispose(UPDATE_GROUP_TASK, reloadGetListTaskDetail);
          CustomEventDispose(DELETE_GROUP_TASK, reloadGetListTaskDetail);
        }
      }
    }
  }, [projectId, doGetListTaskDetail, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      doGetAllGroupTaskReset();
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
    }
  }, [doGetAllGroupTask, doGetAllGroupTaskReset, viewPermissions]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      doListUserRoleReset();
      doListUserRole();

      /*
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
      */
    }
  }, [doListUserRole, doListUserRoleReset, viewPermissions]);

  const [statusProjectId, setStatusProjectId] = React.useState(null);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      doDetailStatusReset()
    }
  }, [viewPermissions, doDetailStatusReset]);

  React.useEffect(() => {
    if (get(viewPermissions.permissions, 'update_project', false)) {
      if (statusProjectId !== null) {
        doDetailStatus({
          projectId: statusProjectId,
        });

        /*
        const reloadDetailStatus = () => {
          doDetailStatus({
            projectId: statusProjectId,
          }, true);
        }
    
        CustomEventListener(UPDATE_STATUS_COPY, reloadDetailStatus);
        CustomEventListener(UPDATE_STATUS_DATE, reloadDetailStatus);
    
        return () => {
          CustomEventDispose(UPDATE_STATUS_COPY, reloadDetailStatus);
          CustomEventDispose(UPDATE_STATUS_DATE, reloadDetailStatus);
        }
        */
      }
    }
  }, [statusProjectId, doDetailStatus, viewPermissions]);

  return (
    <Provider value={{
      setProjectId,
      setTimeRange,
      setStatusProjectId,
      localOptions, setLocalOptions
    }}>
      <Route
        path={route}
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
    doListProjectGroupReset: () => dispatch(listProjectGroupReset()),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doDetailProjectReset: () => dispatch(detailProjectReset()),
    doMemberProject: ({ projectId }, quite) => dispatch(memberProject({ projectId }, quite)),
    doMemberProjectReset: () => dispatch(memberProjectReset()),
    doPermissionProject: (quite) => dispatch(permissionProject(quite)),
    doPermissionProjectReset: () => dispatch(permissionProjectReset()),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doListTaskReset: () => dispatch(listTaskReset()),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
    doListGroupTaskReset: () => dispatch(listGroupTaskReset()),
    doGetAllGroupTask: (quite) => dispatch(getAllGroupTask(quite)),
    doGetAllGroupTaskReset: () => dispatch(getAllGroupTaskReset()),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doListUserRoleReset: () => dispatch(listUserRoleReset()),
    doDetailStatus: ({ projectId }, quite) => dispatch(detailStatus({ projectId }, quite)),
    doDetailStatusReset: () => dispatch(detailStatusReset()),
    doGetListTaskDetail: ({ projectId }) => dispatch(getListTaskDetail({ project_id: projectId })),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  }
};

export default connect(
  state => ({
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  }),
  mapDispatchToProps,
)(ProjectPage);
