import React from 'react';
import StageSettingPresenter from './presenters';
import { connect } from 'react-redux';
import { getManager } from 'actions/kanban/getManager';
import { managersSelector } from './selectors';
import { get, isNil } from 'lodash';

function StageSetting({
  open, setOpen,
  stageName,
  groupTask,
  doGetManager, managers,
}) {

  React.useEffect(() => {
    if (!isNil(groupTask)) {
      doGetManager({
        groupId: get(groupTask, 'id', '')
      });
    }
    // eslint-disable-next-line
  }, [groupTask]);

  return (
    <StageSettingPresenter 
      open={open} setOpen={setOpen}
      stageName={stageName}
      groupTask={groupTask}
      managers={managers.managers}
    />
  );
}

const mapStateToProps = state => ({
  managers: managersSelector(state),
});


const mapDispatchToProps = dispatch => ({
  doGetManager: (option, quite) => dispatch(getManager(option, quite))
})

export default connect(mapStateToProps, mapDispatchToProps)(StageSetting);