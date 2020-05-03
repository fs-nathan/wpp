import { copyGroupTask } from 'actions/groupTask/copyGroupTask';
import { getAllGroupTask } from 'actions/groupTask/getAllGroupTask';
import { COPY_GROUP_TASK, CREATE_GROUP_TASK, CustomEventDispose, CustomEventListener, DELETE_GROUP_TASK, SORT_GROUP_TASK, UPDATE_GROUP_TASK } from 'constants/events';
import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewPermissionsSelector } from '../../selectors';
import CopyGroupTaskPresenter from './presenters';
import { activeLoadingSelector, groupTasksSelector } from './selectors';

function CopyGroupTask({
  open, setOpen,
  groupTasks,
  doCopyGroupTask,
  doGetAllGroupTask,
  viewPermissions,
  activeLoading,
}) {

  const { projectId } = useParams();

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (open) {
      doGetAllGroupTask();
      const reloadGetAllGroupTask = () => {
        doGetAllGroupTask();
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
    // eslint-disable-next-line
  }, [projectId, open, viewPermissions]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroupTasks = {
    ...groupTasks,
    groupTasks: filter(
      groupTasks.groupTasks,
      groupTask => get(groupTask, 'name').toLowerCase().includes(searchPatern.toLowerCase())
    ),
  }

  return (
    <CopyGroupTaskPresenter
      open={open} setOpen={setOpen}
      activeLoading={activeLoading}
      searchPatern={searchPatern} setSearchPatern={setSearchPatern}
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
    activeLoading: activeLoadingSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCopyGroupTask: ({ groupTaskId, projectId }) => dispatch(copyGroupTask({ groupTaskId, projectId })),
    doGetAllGroupTask: (quite) => dispatch(getAllGroupTask(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyGroupTask);
