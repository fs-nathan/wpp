import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { listIcon } from '../../actions/icon/listIcon';
import { listDeletedProject, listDeletedProjectReset } from '../../actions/project/listDeletedProject';
import { listProject, listProjectReset } from '../../actions/project/listProject';
import { detailStatus } from '../../actions/project/setting/detailStatus';
import { detailDefaultGroup, detailDefaultGroupReset } from '../../actions/projectGroup/detailDefaultGroup';
import { detailProjectGroup, detailProjectGroupReset } from '../../actions/projectGroup/detailProjectGroup';
import { listProjectGroup } from '../../actions/projectGroup/listProjectGroup';
import { memberProjectGroup, memberProjectGroupReset } from '../../actions/projectGroup/memberProjectGroup';
import { getPermissionViewProjects } from '../../actions/viewPermissions';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import {
  //DELETE_PROJECT_GROUP, EDIT_PROJECT_GROUP,
  //CREATE_ICON, DELETE_ICON,
  CREATE_PROJECT, CustomEventDispose, CustomEventListener, DELETE_PROJECT, RESTORE_TRASH_PROJECT,
  //HIDE_PROJECT, SHOW_PROJECT, 
  SORT_PROJECT,
  //CREATE_PROJECT_GROUP, 
  SORT_PROJECT_GROUP, UPDATE_PROJECT
} from '../../constants/events';
import { useLocalStorage } from '../../hooks';
import DefaultGroupDetail from './LeftPart/DefaultGroupDetail';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import AllProjectTable from './RightPart/AllProjectTable';
import DeletedProjectTable from './RightPart/DeletedProjectTable';
import { routeSelector, viewPermissionsSelector } from './selectors';

export const Context = React.createContext();
const { Provider } = Context;

function ProjectGroupPage({
  doListIcon,
  doListProjectGroup,
  doDetailProjectGroup,
  doMemberProjectGroup,
  doListProject,
  doListDeletedProject,
  doDetailDefaultGroup,
  doDetailStatus,
  doGetPermissionViewProjects,
  route, viewPermissions,
  doResetDetail, doResetList, doResetProjects,
}) {

  React.useEffect(() => {
    doGetPermissionViewProjects();
  }, [doGetPermissionViewProjects]);

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_OPTIONS', {
    filterType: 1,
    timeType: 5,
  });

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doListIcon(true);

      /*
      const reloadListIcon = () => {
        doListIcon(true);
      };

      CustomEventListener(CREATE_ICON, reloadListIcon);
      CustomEventListener(DELETE_ICON, reloadListIcon);

      return () => {
        CustomEventDispose(CREATE_ICON, reloadListIcon);
        CustomEventDispose(DELETE_ICON, reloadListIcon);
      }
      */
    }
  }, [doListIcon, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doResetList();
      doListProjectGroup(true);

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
  }, [doListProjectGroup, doResetList, viewPermissions]);

  const [projectGroupId, setProjectGroupId] = React.useState();

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (projectGroupId === 'deleted' || projectGroupId === 'default') return;
      if (projectGroupId) {
        doResetDetail();
        doDetailProjectGroup({ projectGroupId }, true);

        const reloadDetailProjectGroup = () => {
          doDetailProjectGroup({ projectGroupId });
        }

        //CustomEventListener(EDIT_PROJECT_GROUP, reloadDetailProjectGroup);
        CustomEventListener(CREATE_PROJECT, reloadDetailProjectGroup);
        CustomEventListener(UPDATE_PROJECT, reloadDetailProjectGroup);
        CustomEventListener(DELETE_PROJECT, reloadDetailProjectGroup);

        return () => {
          //CustomEventDispose(EDIT_PROJECT_GROUP, reloadDetailProjectGroup);
          CustomEventDispose(CREATE_PROJECT, reloadDetailProjectGroup);
          CustomEventDispose(UPDATE_PROJECT, reloadDetailProjectGroup);
          CustomEventDispose(DELETE_PROJECT, reloadDetailProjectGroup);
        }
      }
    }
  }, [projectGroupId, doDetailProjectGroup, viewPermissions, doResetDetail]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doDetailDefaultGroup(true);
    }
  }, [doDetailDefaultGroup, viewPermissions]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (projectGroupId === 'deleted' || projectGroupId === 'default') return;
      if (projectGroupId) {
        doResetDetail();
        doMemberProjectGroup({ projectGroupId }, true);

        /*
        const reloadMemberProjectGroup = () => {
          doMemberProjectGroup({ projectGroupId }, true);
        }

        CustomEventListener(EDIT_PROJECT_GROUP, reloadMemberProjectGroup);
        
        return () => {
          CustomEventDispose(EDIT_PROJECT_GROUP, reloadMemberProjectGroup);
        }
        */
      }
    }
  }, [projectGroupId, doMemberProjectGroup, viewPermissions, doResetDetail]);

  const [timeRange, setTimeRange] = React.useState({});

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (projectGroupId === 'deleted') return;
      doResetProjects();
      doListProject({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
        timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
      }, true);

      const reloadListProject = () => {
        doListProject({
          groupProject: projectGroupId,
          timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
          timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
        });
      }

      //CustomEventListener(CREATE_PROJECT, reloadListProject);
      CustomEventListener(UPDATE_PROJECT, reloadListProject);
      //CustomEventListener(DELETE_PROJECT, reloadListProject);
      //CustomEventListener(HIDE_PROJECT, reloadListProject);
      //CustomEventListener(SHOW_PROJECT, reloadListProject);
      CustomEventListener(SORT_PROJECT, reloadListProject);
      CustomEventListener(RESTORE_TRASH_PROJECT, reloadListProject);
      //CustomEventListener(COPY_PROJECT, reloadListProject);

      return () => {
        //CustomEventDispose(CREATE_PROJECT, reloadListProject);
        CustomEventDispose(UPDATE_PROJECT, reloadListProject);
        CustomEventDispose(RESTORE_TRASH_PROJECT, reloadListProject);
        //CustomEventDispose(DELETE_PROJECT, reloadListProject);
        //CustomEventDispose(HIDE_PROJECT, reloadListProject);
        //CustomEventDispose(SHOW_PROJECT, reloadListProject);
        CustomEventDispose(SORT_PROJECT, reloadListProject);
        //CustomEventDispose(COPY_PROJECT, reloadListProject);
      }
    }
  }, [projectGroupId, timeRange, doListProject, viewPermissions, doResetProjects]);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      doResetList();
      doListDeletedProject({}, true);

      const reloadListDeletedProject = () => {
        doListDeletedProject({});
      }

      CustomEventListener(DELETE_PROJECT, reloadListDeletedProject);

      return () => {
        CustomEventDispose(DELETE_PROJECT, reloadListDeletedProject);
      }
    }
  }, [doListDeletedProject, doResetList, viewPermissions]);

  const [statusProjectId, setStatusProjectId] = React.useState(null);

  React.useEffect(() => {
    if (viewPermissions.permissions !== null) {
      if (statusProjectId !== null) {
        doDetailStatus({
          projectId: statusProjectId,
        }, true);
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
      setProjectGroupId,
      setStatusProjectId,
      setTimeRange,
      localOptions, setLocalOptions,
    }}>
      <Route
        path={route}
        render={({ match: { url } }) => (
          <Switch>
            <Route
              path={`${url}`}
              exact
              render={props => (
                <TwoColumnsLayout
                  leftRenders={[
                    () =>
                      <ProjectGroupList
                        {...props}
                      />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand }) =>
                      <AllProjectTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                      />
                  }
                />
              )}
            />
            <Route
              path={`${url}/deleted`}
              exact
              render={props => (
                <TwoColumnsLayout
                  leftRenders={[
                    () =>
                      <ProjectGroupList
                        {...props}
                      />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand }) =>
                      <DeletedProjectTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                      />
                  }
                />
              )}
            />
            <Route
              path={`${url}/group/default`}
              exact
              render={props => (
                <TwoColumnsLayout
                  leftRenders={[
                    () =>
                      <DefaultGroupDetail
                        {...props}
                      />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand }) =>
                      <AllProjectTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                        isDefault={true}
                      />
                  }
                />
              )}
            />
            <Route
              path={`${url}/group/:projectGroupId`}
              render={props => (
                <TwoColumnsLayout
                  leftRenders={[
                    () =>
                      <ProjectGroupDetail
                        {...props}
                      />,
                  ]}
                  rightRender={
                    ({ expand, handleExpand }) =>
                      <AllProjectTable
                        {...props}
                        expand={expand}
                        handleExpand={handleExpand}
                      />
                  }
                />
              )}
            />
          </Switch>
        )}
      />
    </Provider>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doResetProjects: () => dispatch(listProjectReset()),
    doResetDetail: () => {
      dispatch(detailDefaultGroupReset());
      dispatch(detailProjectGroupReset());
      dispatch(memberProjectGroupReset());
    },
    doResetList: () => {
      dispatch(listProjectReset());
      dispatch(listDeletedProjectReset());
    },
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListDeletedProject: (options, quite) => dispatch(listDeletedProject(options, quite)),
    doDetailDefaultGroup: (quite) => dispatch(detailDefaultGroup(quite)),
    doDetailStatus: ({ projectId }, quite) => dispatch(detailStatus({ projectId }, quite)),
    doGetPermissionViewProjects: (quite) => dispatch(getPermissionViewProjects(quite)),
  }
};

export default connect(
  state => ({
    viewPermissions: viewPermissionsSelector(state),
    route: routeSelector(state),
  }),
  mapDispatchToProps,
)(ProjectGroupPage);
