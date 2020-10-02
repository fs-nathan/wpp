import React from "react";
import { listTask } from 'actions/kanban/listTask';
import { tasksSelector } from './selectors';
import { connect } from 'react-redux';
import KanbanBoardPresenter from './presenters';
import { isNil, findIndex } from 'lodash';

function KanbanBoard({
  projectId,
  tasks, doKanbanListTask,
}) {

  const [tasksArr, setTasksArr] = React.useState(tasks.tasks)

  React.useEffect(() => {
    doKanbanListTask({ projectId });
  }, [projectId]);

  React.useEffect(() => {
    setTasksArr(tasks.tasks);
  }, [tasks]);

  const reorder = (list, startIndex, endIndex) => {
    const newList = Array.from(list);
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);
    return newList;
  };  

  const moving = (source, destination, startIndex, endIndex) => {
    const newSource = Array.from(source);
    const newDestination = Array.from(destination);
    const [removed] = newSource.splice(startIndex, 1);
    newDestination.splice(endIndex, 0, removed);
    return [newSource, newDestination];
  }

  const handleSortGroupTask = result => {
    const { source, destination } = result;
    if (source.index === destination.index) return;
    const newTasksArr = reorder(tasksArr, source.index, destination.index);
    setTasksArr(newTasksArr);
  };

  const handleSortTask = result => {
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      const taskIndex = findIndex(tasksArr, { id: source.droppableId.slice(2) });
      const newSubTasksArr = reorder(tasksArr[taskIndex].tasks, source.index, destination.index);
      const newTasksArr = Array.from(tasksArr);
      newTasksArr[taskIndex].tasks = newSubTasksArr;
      setTasksArr(newTasksArr);
    } else {
      const sourceIndex = findIndex(tasksArr, { id: source.droppableId.slice(2) });
      const destinationIndex = findIndex(tasksArr, { id: destination.droppableId.slice(2) });
      const [newSourceSubTaskArr, newDestinationSubTaskArr] = moving(tasksArr[sourceIndex].tasks, tasksArr[destinationIndex].tasks, source.index, destination.index);
      const newTasksArr = Array.from(tasksArr);
      newTasksArr[sourceIndex].tasks = newSourceSubTaskArr;
      newTasksArr[destinationIndex].tasks = newDestinationSubTaskArr;
      setTasksArr(newTasksArr);
    }
  };

  const handleDragEnd = result => {
    if (isNil(result.destination)) return;
    switch (result.type) {
      case 'COLUMN': 
        handleSortGroupTask(result);
        return;
      case 'ITEM':
        handleSortTask(result);
        return;
      default:
        return;
    }
  };

  return (
    <KanbanBoardPresenter 
      tasks={tasksArr}
      handleSortTasks={handleDragEnd}
    />
  );
}

const mapStateToProps = state => {
  return {
    tasks: tasksSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doKanbanListTask: (option, quite = false) => dispatch(listTask(option, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanBoard);
