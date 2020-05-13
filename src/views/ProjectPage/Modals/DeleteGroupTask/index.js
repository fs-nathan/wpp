import { deleteGroupTask } from 'actions/groupTask/deleteGroupTask';
import { getAllGroupTask } from 'actions/groupTask/getAllGroupTask';
import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { listTask } from 'actions/task/listTask';
import { useTimes } from 'components/CustomPopover';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { localOptionSelector } from '../../selectors';
import DeleteGroupTaskPresenter from './presenters';

function GroupTaskDelete({
  selectedGroupTask = null,
  open, setOpen,
  doDeleteGroupTask,
  doReload,
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
  const { projectId } = useParams();

  return (
    <DeleteGroupTaskPresenter
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
      open={open} setOpen={setOpen}
      handleDeleteGroupTask={() =>
        doDeleteGroupTask({
          groupTaskId: get(selectedGroupTask, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options, projectId) => {
      dispatch(listGroupTask({ projectId }, true));
      dispatch(getAllGroupTask(true));
      dispatch(listTask(options, true));
    },
    doDeleteGroupTask: ({ groupTaskId }) => dispatch(deleteGroupTask({ groupTaskId })),
  }
};

export default connect(
  state => ({
    localOption: localOptionSelector(state),
  }),
  mapDispatchToProps,
)(GroupTaskDelete);
