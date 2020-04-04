import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { listIcon } from '../../actions/icon/listIcon';
import { listDeletedProject } from '../../actions/project/listDeletedProject';
import { listProject } from '../../actions/project/listProject';
import { detailStatus } from '../../actions/project/setting/detailStatus';
import { detailDefaultGroup } from '../../actions/projectGroup/detailDefaultGroup';
import { detailProjectGroup } from '../../actions/projectGroup/detailProjectGroup';
import { listProjectGroup } from '../../actions/projectGroup/listProjectGroup';
import { memberProjectGroup } from '../../actions/projectGroup/memberProjectGroup';
import TwoColumnsLayout from '../../components/TwoColumnsLayout';
import {
  //DELETE_PROJECT_GROUP, EDIT_PROJECT_GROUP,
  //CREATE_ICON, DELETE_ICON,
  CREATE_PROJECT, CustomEventDispose, CustomEventListener, DELETE_PROJECT,
  //HIDE_PROJECT, SHOW_PROJECT, 
  SORT_PROJECT,
  //CREATE_PROJECT_GROUP, 
  SORT_PROJECT_GROUP, UPDATE_PROJECT
} from '../../constants/events';
import { Routes } from '../../constants/routes';
import { useLocalStorage } from '../../hooks';
import DefaultGroupDetail from './LeftPart/DefaultGroupDetail';
import ProjectGroupDetail from './LeftPart/ProjectGroupDetail';
import ProjectGroupList from './LeftPart/ProjectGroupList';
import AllProjectTable from './RightPart/AllProjectTable';
import DeletedProjectTable from './RightPart/DeletedProjectTable';

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
}) {

  const [localOptions, setLocalOptions] = useLocalStorage('LOCAL_PROJECT_OPTIONS', {
    filterType: 1,
    timeType: 5,
  });

  React.useEffect(() => {
    doListIcon();

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
  }, [doListIcon]);

  React.useEffect(() => {
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
  }, [doListProjectGroup]);

  const [projectGroupId, setProjectGroupId] = React.useState();

  React.useEffect(() => {
    if (projectGroupId === 'deleted' || projectGroupId === 'default') return;
    if (projectGroupId) {
      doDetailProjectGroup({ projectGroupId });

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
  }, [projectGroupId, doDetailProjectGroup]);

  React.useEffect(() => {
    doDetailDefaultGroup();
  }, [doDetailDefaultGroup]);

  React.useEffect(() => {
    if (projectGroupId === 'deleted' || projectGroupId === 'default') return;
    if (projectGroupId) {
      doMemberProjectGroup({ projectGroupId });

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
  }, [projectGroupId, doMemberProjectGroup]);

  const [timeRange, setTimeRange] = React.useState({});

  React.useEffect(() => {
    if (projectGroupId === 'deleted') return;
    doListProject({
      groupProject: projectGroupId,
      timeStart: get(timeRange, 'timeStart') ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD') : undefined,
      timeEnd: get(timeRange, 'timeEnd') ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD') : undefined,
    });

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
    //CustomEventListener(COPY_PROJECT, reloadListProject);

    return () => {
      //CustomEventDispose(CREATE_PROJECT, reloadListProject);
      CustomEventDispose(UPDATE_PROJECT, reloadListProject);
      //CustomEventDispose(DELETE_PROJECT, reloadListProject);
      //CustomEventDispose(HIDE_PROJECT, reloadListProject);
      //CustomEventDispose(SHOW_PROJECT, reloadListProject);
      CustomEventDispose(SORT_PROJECT, reloadListProject);
      //CustomEventDispose(COPY_PROJECT, reloadListProject);
    }
  }, [projectGroupId, timeRange, doListProject]);

  React.useEffect(() => {
    doListDeletedProject({});

    const reloadListDeletedProject = () => {
      doListDeletedProject({});
    }

    CustomEventListener(DELETE_PROJECT, reloadListDeletedProject);

    return () => {
      CustomEventDispose(DELETE_PROJECT, reloadListDeletedProject);
    }
  }, [doListDeletedProject]);

  const [statusProjectId, setStatusProjectId] = React.useState(null);

  React.useEffect(() => {
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
  }, [statusProjectId, doDetailStatus]);

  return (
    <Provider value={{
      setProjectGroupId,
      setStatusProjectId,
      setTimeRange,
      localOptions, setLocalOptions,
    }}>
      <Route
        path={Routes.PROJECTS}
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
              path={`${url}/default`}
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
              path={`${url}/:projectGroupId`}
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
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doListDeletedProject: (options, quite) => dispatch(listDeletedProject(options, quite)),
    doDetailDefaultGroup: (quite) => dispatch(detailDefaultGroup(quite)),
    doDetailStatus: ({ projectId }, quite) => dispatch(detailStatus({ projectId }, quite)),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(ProjectGroupPage);
