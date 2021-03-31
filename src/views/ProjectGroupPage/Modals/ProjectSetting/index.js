import { listProject } from 'actions/project/listProject';
import { detailStatus } from 'actions/project/setting/detailStatus';
import { updateStatusCopy } from 'actions/project/setting/updateStatusCopy';
import { updateStatusDate } from 'actions/project/setting/updateStatusDate';
import { updateStatusView } from 'actions/project/setting/updateStatusView';
import { updateNotificationSetting } from "actions/project/setting/updateNotificationSetting";
import { getPermissionViewDetailProject } from 'actions/viewPermissions';
import { useTimes } from 'components/CustomPopover';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { localOptionSelector } from '../../selectors';
import ProjectSettingPresenter from './presenters';
import { permissionSelector, statusSelector } from './selectors';
import './style.scss';
import {updatePinBoardSetting} from "../../../../actions/project/setting/updatePinBoardSetting";

function ProjectSetting({
  curProject = null, permission,
  open, setOpen,
  status, doUpdatePinBoardSetting,
  doDetailStatus,
  doUpdateStatusCopy, doUpdateStatusDate, doUpdateStatusView,
  doGetPermissionViewDetailProject,
  doReload, doUpdateNotificationSetting,
  projectGroupId = undefined,
  localOption,
}) {

  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    });
    // eslint-disable-next-line
  }, [timeType]);

  React.useLayoutEffect(() => {
    if (get(curProject, 'id')) doGetPermissionViewDetailProject({ projectId: get(curProject, 'id') });
    // eslint-disable-next-line
  }, [curProject])

  React.useEffect(() => {
    if (curProject) {
      doDetailStatus({
        projectId: get(curProject, 'id'),
      });
    }
    // eslint-disable-next-line
  }, [curProject]);

  return (
    <ProjectSettingPresenter
      open={open} setOpen={setOpen}
      curProject={curProject}
      projectGroupId={projectGroupId}
      timeRange={timeRange}
      doReload={() => doReload({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      }, get(curProject, 'id'))}
      status={status}
      canChange={{
        date: get(permission, [get(curProject, 'id'), 'update_project'], false),
        copy: get(permission, [get(curProject, 'id'), 'update_project'], false),
        update: get(permission, [get(curProject, 'id'), 'update_project'], false),
        view: true,
      }}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusView={status => doUpdateStatusView({ projectId: get(curProject, 'id'), status })}
      handleUpdateNotificationSetting={status => doUpdateNotificationSetting({ projectId: get(curProject, 'id'), status })}
      handleOnChangePinBoard={status => doUpdatePinBoardSetting({projectId: get(curProject, 'id'), status})}
    />
  )
}

const mapStateToProps = state => {
  return {
    status: statusSelector(state),
    permission: permissionSelector(state),
    localOption: localOptionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options, projectId) => {
      dispatch(detailStatus({ projectId }, true));
      options !== null && dispatch(listProject(options, true));
    },
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
    doUpdateStatusDate: ({ projectId, status }) => dispatch(updateStatusDate({ projectId, status, })),
    doUpdateStatusCopy: ({ projectId, status }) => dispatch(updateStatusCopy({ projectId, status, })),
    doUpdateStatusView: ({ projectId, status }) => dispatch(updateStatusView({ projectId, status, })),
    doUpdateNotificationSetting: ({ projectId, status }) => dispatch(updateNotificationSetting({ projectId, status, })),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
    doUpdatePinBoardSetting: ({projectId, status}) => dispatch(updatePinBoardSetting({projectId, status}))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSetting);