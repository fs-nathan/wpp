import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_GROUP_TASK, GET_ALL_GROUP_TASK, LIST_GROUP_TASK } from 'constants/events';
import React from 'react';

function GroupTaskDelete({
  open, setOpen,
  handleDeleteGroupTask,
  doReload,
  projectId,
  timeRange,
}) {

  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(DELETE_GROUP_TASK.SUCCESS, doReload);
    CustomEventListener(DELETE_GROUP_TASK.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_GROUP_TASK.SUCCESS, doReload);
      CustomEventDispose(DELETE_GROUP_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId, timeRange]);

  React.useEffect(() => {
    const success = bit => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
    CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
    CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
    CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    return () => {
      CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
      CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
      CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
      CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId, timeRange]);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content="Bạn chắc chắn muốn xóa nhóm công việc?"
      onConfirm={() => {
        handleDeleteGroupTask();
        setActiveMask(0);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default GroupTaskDelete;
