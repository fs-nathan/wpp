import React from 'react';
import ManagerPresenter from './presenters';
import { connect } from 'react-redux';
import { getManager, getManagerReset } from 'actions/kanban/getManager';
import { managersSelector } from './selectors';
import { get, isNil } from 'lodash';

function Manager({
  open, setOpen,
  groupTask,
  projectId = null,
  doGetManager, managers,
  doReset,
  name,
}) {

  React.useLayoutEffect(() => {
    doReset();
  }, [groupTask, projectId]);
  
  React.useEffect(() => {
    if (!isNil(groupTask)) {
      doGetManager({
        groupId: get(groupTask, 'id', '')
      });
    }
    // eslint-disable-next-line
  }, [groupTask]);

  return (
    <ManagerPresenter 
      open={open} setOpen={setOpen}
      managers={managers.managers}
      loading={managers.loading}
      name={name}
    />
  );
}

const mapStateToProps = state => ({
  managers: managersSelector(state),
});


const mapDispatchToProps = dispatch => ({
  doGetManager: (option, quite) => dispatch(getManager(option, quite)),
  doReset: () => dispatch(getManagerReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager);