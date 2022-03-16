import { createGroupTask } from 'actions/groupTask/createGroupTask';
import { updateGroupTask } from 'actions/groupTask/updateGroupTask';
import { useTimes } from 'components/CustomPopover';
import { get, isNil } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { localOptionSelector } from '../../selectors';
import CreateNewOrUpdateGroupTaskPresenter from './presenters';

function CreateNewOrUpdateGroupTask({
  open,
  setOpen,
  curGroupTask = null,
  setOpenModal = () => null,
  doUpdateGroupTask,
  doCreateGroupTask,
  doReload,
  localOption,
  project_id = null,
}) {
  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return {
      timeStart,
      timeEnd,
    };
    // eslint-disable-next-line
  }, [timeType]);

  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  return (
    <CreateNewOrUpdateGroupTaskPresenter
      open={open}
      setOpen={setOpen}
      setOpenModal={setOpenModal}
      curGroupTask={curGroupTask}
      projectId={projectId}
      timeRange={timeRange}
      doReload={() =>
        setOpen(false)
      }
      handleCreateOrUpdateGroupTask={(name, description) =>
        curGroupTask
          ? doUpdateGroupTask({
            groupTaskId: get(curGroupTask, "id"),
            name,
            description,
          })
          : doCreateGroupTask({
            projectId,
            name,
            description,
          })
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doReload: (options, projectId) => {
      // dispatch(listGroupTask({ projectId }, true));
      // dispatch(getAllGroupTask(true));
      // dispatch(listTask(options, true));
    },
    doCreateGroupTask: ({ projectId, name, description }) =>
      dispatch(createGroupTask({ projectId, name, description })),
    doUpdateGroupTask: ({ groupTaskId, name, description }) =>
      dispatch(updateGroupTask({ groupTaskId, name, description })),
  };
};

export default connect(
  (state) => ({
    localOption: localOptionSelector(state),
  }),
  mapDispatchToProps
)(CreateNewOrUpdateGroupTask);
