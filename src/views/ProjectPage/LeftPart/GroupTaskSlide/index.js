import { deleteGroupTask } from 'actions/groupTask/deleteGroupTask';
import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { sortGroupTask } from 'actions/groupTask/sortGroupTask';
import { listTask } from 'actions/task/listTask';
import { CustomEventDispose, CustomEventListener, SORT_GROUP_TASK } from 'constants/events';
import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateGroupTask from '../../Modals/CreateGroupTask';
import CreateNewGroupTask from '../../Modals/CreateNewGroupTask';
import DeleteGroupTask from '../../Modals/DeleteGroupTask';
import { viewPermissionsSelector } from '../../selectors';
import GroupTaskSlidePresenter from './presenters';
import { groupTasksSelector } from './selectors';
import {projectSelector} from "../../RightPart/AllTaskTable/selectors";

function GroupTaskSlide({
  handleSubSlide,
  groupTasks, project,
  doSortGroupTask, doDeleteGroupTask,
  doListGroupTask,
  viewPermissions,
}) {

  const [id, setId] = React.useState(null);
  const { projectId } = useParams();

  React.useEffect(() => {
    setId(projectId);
  }, [projectId]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (id !== null) {
      doListGroupTask({ projectId: id });
      const reloadListGroupTask = () => {
        doListGroupTask({ projectId: id });
      }
      CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
      }
    }
    // eslint-disable-next-line
  }, [id, viewPermissions]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroupTasks = {
    ...groupTasks,
    groupTasks: filter(
      groupTasks.groupTasks,
      groupTask => get(groupTask, 'name').toLowerCase().includes(searchPatern.toLowerCase()),
    )
  }

  const [openCreateOrCopy, setOpenCreateOrCopy] = React.useState(false);
  const [openCreateOrUpdate, setOpenCreateOrUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCreateOrCopy(true);
        return;
      }
      case 'UPDATE': {
        setOpenCreateOrUpdate(true);
        setUpdateProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <GroupTaskSlidePresenter
        handleSubSlide={handleSubSlide}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        groupTasks={newGroupTasks}
        handleSortGroupTask={(groupTaskId, sortIndex) =>
          doSortGroupTask({ groupTaskId, sortIndex })
        }
        handleDeleteGroupTask={groupTask =>
          doDeleteGroupTask({ groupTaskId: get(groupTask, 'id') })
        }
        handleOpenModal={doOpenModal}
        permissions={get(viewPermissions.permissions, [id, 'update_project'], false)}
        project={project}
      />
      <DeleteGroupTask
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
      <CreateGroupTask
        open={openCreateOrCopy}
        setOpen={setOpenCreateOrCopy}
      />
      <CreateNewGroupTask
        open={openCreateOrUpdate}
        setOpen={setOpenCreateOrUpdate}
        {...updateProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    groupTasks: groupTasksSelector(state),
    project: projectSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSortGroupTask: ({ groupTaskId, sortIndex }) => dispatch(sortGroupTask({ groupTaskId, sortIndex })),
    doDeleteGroupTask: ({ groupTaskId }) => dispatch(deleteGroupTask({ groupTaskId })),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupTaskSlide);
