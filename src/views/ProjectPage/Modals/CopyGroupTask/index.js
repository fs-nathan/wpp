import { copyGroupTask } from 'actions/groupTask/copyGroupTask';
import { getAllGroupTask } from 'actions/groupTask/getAllGroupTask';
import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { listTask } from 'actions/task/listTask';
import { useTimes } from 'components/CustomPopover';
import { CustomEventDispose, CustomEventListener, SORT_GROUP_TASK } from 'constants/events';
import { filter, get, isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { localOptionSelector, viewPermissionsSelector } from '../../selectors';
import CopyGroupTaskPresenter from './presenters';
import { groupTasksSelector } from './selectors';

function CopyGroupTask({
  open, setOpen,
  groupTasks,
  doCopyGroupTask,
  doGetAllGroupTask,
  viewPermissions,
  doReload,
  localOption,
  project_id = null,
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

  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  React.useEffect(() => {
    //if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    doGetAllGroupTask();
    const reloadGetAllGroupTask = () => {
      doGetAllGroupTask();
    }
    CustomEventListener(SORT_GROUP_TASK, reloadGetAllGroupTask);
    return () => {
      CustomEventDispose(SORT_GROUP_TASK, reloadGetAllGroupTask);
    }
  }, [projectId, viewPermissions]);

  const [searchPattern, setSearchPattern] = React.useState('');

  const newGroupTasks = {
    ...groupTasks,
    groupTasks: filter(
      groupTasks.groupTasks,
      groupTask => get(groupTask, 'name').toLowerCase().includes(searchPattern.toLowerCase())
    ),
  }

  return (
    <CopyGroupTaskPresenter
      open={open} setOpen={setOpen}
      projectId={projectId}
      timeRange={timeRange}
      doReload={() => doReload({
        projectId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      }, projectId)}
      searchPattern={searchPattern} setSearchPattern={setSearchPattern}
      groupTasks={newGroupTasks}
      handleCopyGroupTask={(groupTasks) =>
        doCopyGroupTask({
          groupTaskId: groupTasks.map(groupTask => get(groupTask, 'id')),
          projectId,
        })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    groupTasks: groupTasksSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options, projectId) => {
      dispatch(listGroupTask({ projectId }, true));
      dispatch(getAllGroupTask(true));
      dispatch(listTask(options, true));
    },
    doCopyGroupTask: ({ groupTaskId, projectId }) => dispatch(copyGroupTask({ groupTaskId, projectId })),
    doGetAllGroupTask: (quite) => dispatch(getAllGroupTask(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyGroupTask);
