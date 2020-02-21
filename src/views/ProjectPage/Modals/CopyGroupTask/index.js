import React from 'react';
import { useParams } from 'react-router-dom';
import { copyGroupTask } from '../../../../actions/groupTask/copyGroupTask';
import { connect } from 'react-redux';
import { get, filter } from 'lodash';
import { groupTasksSelector } from './selectors';
import CopyGroupTaskPresenter from './presenters';

function CopyGroupTask({ 
  open, setOpen, 
  groupTasks, 
  doCopyGroupTask,
 }) {

  const { projectId } = useParams();
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCopyGroupTask: ({ groupTaskId, projectId }) => dispatch(copyGroupTask({ groupTaskId, projectId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyGroupTask);
