import React from 'react';
import FilterSliderPresenter from './presenters';
import { connect } from 'react-redux';
import { statusSelector, prioritySelector } from './selectors';
import { actionVisibleDrawerMessage } from "actions/system/system";
import { setStatusFilter, setPriorityFilter } from "actions/kanban/setting";
import { includes, remove } from 'lodash';

function FilterSlider({
  doCloseSlider,
  status, priority,
  doSetStatusFitler, doSetPriorityFitler,
}) {

  const handleStatusChange = value => {
    const newStatus = Array.from(status);
    if (includes(newStatus, value)) {
      remove(newStatus, status => status === value);
    } else {
      newStatus.push(value);
    }
    doSetStatusFitler(newStatus);
  };

  const handlePriorityChange = value => {
    const newPriority = Array.from(priority);
    if (includes(newPriority, value)) {
      remove(newPriority, priority => priority === value);
    } else {
      newPriority.push(value);
    }
    doSetPriorityFitler(newPriority);
  };

  return (
    <FilterSliderPresenter 
      statusFilter={status} setStatusFilter={handleStatusChange}
      priorityFilter={priority} setPriorityFilter={handlePriorityChange}  
      handleCloseClick={doCloseSlider}
    />
  );
}

const mapStateToProps = state => ({
  status: statusSelector(state),
  priority: prioritySelector(state),
});


const mapDispatchToProps = dispatch => ({
  doCloseSlider: () => dispatch(actionVisibleDrawerMessage({ type: "", anchor: 'right' })),
  doSetStatusFitler: status => dispatch(setStatusFilter(status)),
  doSetPriorityFitler: priority => dispatch(setPriorityFilter(priority)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterSlider);