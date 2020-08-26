import { listProject } from 'actions/project/listProject';
import { deleteProjectGroup } from 'actions/projectGroup/deleteProjectGroup';
import { detailProjectGroup } from 'actions/projectGroup/detailProjectGroup';
import { useTimes } from 'components/CustomPopover';
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP, SORT_PROJECT } from 'constants/events.js';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CreateProjectGroup from '../../Modals/CreateProjectGroup';
import DeleteProjectGroup from '../../Modals/DeleteProjectGroup';
import MembersDetail from '../../Modals/MembersDetail';
import { localOptionSelector, routeSelector, viewPermissionsSelector } from '../../selectors';
import ProjectGroupDetailPresenter from './presenters';
import {groupSelector} from './selectors';

function ProjectGroupDetail({
  group, route, viewPermissions,
  doDeleteProjectGroup,
  doListProject,
  doDetailProjectGroup,
  doMemberProjectGroup,
  localOption, members,
}) {

  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    });
  }, [timeType]);

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
    }
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
      CustomEventListener(SORT_PROJECT, reloadListProject);
      return () => {
        CustomEventDispose(SORT_PROJECT, reloadListProject);
      }
    }
  }, [id, timeRange]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(route);
    };
    CustomEventListener(DELETE_PROJECT_GROUP.SUCCESS, historyPushHandler);
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP.SUCCESS, historyPushHandler);
    };
  }, []);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [createProps, setCreateProps] = React.useState({});
  const [openMember, setOpenMember] = React.useState(false);
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
        projectGroupId={id}
      />
      <DeleteProjectGroup
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
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProjectGroup: ({ projectGroupId }) => dispatch(deleteProjectGroup({ projectGroupId })),
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectGroupDetail);
