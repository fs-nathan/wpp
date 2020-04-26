import { listProject } from 'actions/project/listProject';
import { deleteProjectGroup } from 'actions/projectGroup/deleteProjectGroup';
import { detailProjectGroup } from 'actions/projectGroup/detailProjectGroup';
import { memberProjectGroup } from 'actions/projectGroup/memberProjectGroup';
import AlertModal from 'components/AlertModal';
import { COPY_PROJECT, CREATE_PROJECT, CustomEventDispose, CustomEventListener, DELETE_PROJECT, DELETE_PROJECT_GROUP, SORT_PROJECT, UPDATE_PROJECT } from 'constants/events.js';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Context as ProjectGroupContext } from '../../index';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import MembersDetail from '../../Modals/MembersDetail';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupDetailPresenter from './presenters';
import { groupSelector } from './selectors';

function ProjectGroupDetail({
  group, route, viewPermissions,
  doDeleteProjectGroup,
  doListProject,
  doDetailProjectGroup,
  doMemberProjectGroup,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);
  const { projectGroupId } = useParams();
  const [id, setId] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    setId(projectGroupId);
  }, [projectGroupId]);

  React.useEffect(() => {
    if (id === 'deleted') return;
    if (id !== null) {
      doDetailProjectGroup({ projectGroupId: id });
      const reloadDetailProjectGroup = () => {
        doDetailProjectGroup({ projectGroupId: id });
      }
      CustomEventListener(CREATE_PROJECT, reloadDetailProjectGroup);
      CustomEventListener(UPDATE_PROJECT, reloadDetailProjectGroup);
      CustomEventListener(DELETE_PROJECT, reloadDetailProjectGroup);
      CustomEventListener(COPY_PROJECT, reloadDetailProjectGroup);
      return () => {
        CustomEventDispose(CREATE_PROJECT, reloadDetailProjectGroup);
        CustomEventDispose(UPDATE_PROJECT, reloadDetailProjectGroup);
        CustomEventDispose(DELETE_PROJECT, reloadDetailProjectGroup);
        CustomEventDispose(COPY_PROJECT, reloadDetailProjectGroup);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    if (id === 'deleted') return;
    if (id) doMemberProjectGroup({ projectGroupId: id });
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    if (id === 'deleted') return;
    if (id) {
      doListProject({
        groupProject: id,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListProject = () => {
        doListProject({
          groupProject: id,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        });
      };
      CustomEventListener(UPDATE_PROJECT, reloadListProject);
      CustomEventListener(SORT_PROJECT, reloadListProject);
      CustomEventListener(COPY_PROJECT, reloadListProject);
      return () => {
        CustomEventDispose(UPDATE_PROJECT, reloadListProject);
        CustomEventDispose(SORT_PROJECT, reloadListProject);
        CustomEventDispose(COPY_PROJECT, reloadListProject);
      }
    }
    // eslint-disable-next-line
  }, [id, timeRange]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(route);
    };
    CustomEventListener(DELETE_PROJECT_GROUP, historyPushHandler);
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP, historyPushHandler);
    };
    //eslint-disable-next-line
  }, []);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [createProps, setCreateProps] = React.useState({});
  const [openMember, setOpenMember] = React.useState(false);
  const [memberProps, setMemberProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        if (get(viewPermissions.permissions, 'manage_group_project', false)) {
          setOpenCreate(true);
          setCreateProps(props);
        }
        return;
      }
      case 'MEMBER': {
        setOpenMember(true);
        setMemberProps(props);
        return;
      }
      case 'ALERT': {
        if (get(viewPermissions.permissions, 'manage_group_project', false)) {
          setOpenAlert(true);
          setAlertProps(props);
        }
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectGroupDetailPresenter
        group={group} route={route} canModify={get(viewPermissions.permissions, 'manage_group_project', false)}
        handleDeleteProjectGroup={projectGroup =>
          doDeleteProjectGroup({ projectGroupId: get(projectGroup, 'id') })
        }
        handleOpenModal={doOpenModal}
      />
      <CreateProjectGroup
        open={openCreate}
        setOpen={setOpenCreate}
        {...createProps}
      />
      <MembersDetail
        open={openMember}
        setOpen={setOpenMember}
        {...memberProps}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    group: groupSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProjectGroup: ({ projectGroupId }) => dispatch(deleteProjectGroup({ projectGroupId })),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
    doMemberProjectGroup: ({ projectGroupId }, quite) => dispatch(memberProjectGroup({ projectGroupId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectGroupDetail);
