import React from "react";
import { listTask } from 'actions/kanban/listTask';
import { sortTask } from 'actions/kanban/sortTask';
import { sortGroupTask } from 'actions/kanban/sortGroupTask';
import { tasksSelector } from './selectors';
import { connect } from 'react-redux';
import KanbanBoardPresenter from './presenters';
import { findIndex, isNil } from 'lodash';
import { CustomEventDispose, CustomEventListener, KANBAN } from 'constants/events';

function KanbanBoard({
  projectId,
  tasks, doKanbanListTask,
  doKanbanSortGroupTask,
  doKanbanSortTask,
  handleOpenModal,
}) {

  const [placeholderProps, setPlaceholderProps] = React.useState({});
  const board = React.useMemo(() => document.querySelector(`[aria-custom-label='kanban-board']`));

  React.useEffect(() => {
    doKanbanListTask({ projectId });
    const doKanbanListTaskHandler = () => {
      doKanbanListTask({ projectId });
    };
    CustomEventListener(KANBAN.SORT_TASK.SUCCESS, doKanbanListTaskHandler);
    CustomEventListener(KANBAN.SORT_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    return () => {
      CustomEventDispose(KANBAN.SORT_TASK.SUCCESS, doKanbanListTaskHandler);
      CustomEventDispose(KANBAN.SORT_GROUP_TASK.SUCCESS, doKanbanListTaskHandler);
    }
  }, [projectId]);

  const getDom = (id, isDrag = true) => {
    const dragAttr = "data-rbd-draggable-id";
    const dropAttr = "data-rbd-droppable-id";
    let domQuery = '';
    if (isDrag) {
      domQuery = `[${dragAttr}='${id}']`;
    } else {
      domQuery = `[${dropAttr}='${id}']`;
    }
    const dom = document.querySelector(domQuery);
    return dom;
  };

  const handleSortGroupTask = result => {
    const { source, destination, draggableId } = result;
    if (source.index === destination.index) return;
    doKanbanSortGroupTask({
      groupTaskId: draggableId,
      sortIndex: destination.index,
      dragEndResult: result,
    });
  };

  const handleSortTask = result => {
    const { source, destination, draggableId } = result;
    if ((source.droppableId === destination.droppableId) && (source.index === destination.index)) return;
    doKanbanSortTask({
      taskId: draggableId,
      groupTask: destination.droppableId.slice(2),
      projectId,
      sortIndex: destination.index,
      dragEndResult: result,
    })
  };

  function handleScrollBoardHorizontal(evt) {
    console.log(evt.offsetX);
  }

  const handleDragStart = event => {
    const draggedDOM = getDom(event.draggableId);
    const dragFromDOM = getDom(event.source.droppableId, false);
    if (isNil(draggedDOM) || isNil(dragFromDOM)) {
      return;
    }
    const { type } = event;
    if (type === 'COLUMN') {
      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = event.source.index;
      let clientX = 
        parseFloat(window.getComputedStyle(dragFromDOM).paddingLeft) + 
        parseFloat(window.getComputedStyle(draggedDOM).marginLeft) + 
        Array.from(dragFromDOM.children)
          .slice(0, sourceIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginLeft = parseFloat(style.marginLeft);
            const borderLeft = parseFloat(style.borderLeft);
            const borderRight = parseFloat(style.borderRight);
            const marginRight = parseFloat(style.marginRight);
            return total + marginLeft + borderLeft + curr.clientWidth + borderRight + marginRight;
          }, 0);
      let clientY =
        parseFloat(window.getComputedStyle(dragFromDOM).paddingTop) +
        parseFloat(window.getComputedStyle(draggedDOM).marginTop);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientX,
        clientY,
        type,
      });
    } else {
      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = event.source.index;
      const sourceColumnIndex = findIndex(dragFromDOM.parentNode, dragFromDOM);
      let clientX = 
        parseFloat(window.getComputedStyle(dragFromDOM.parentNode).paddingLeft) + 
        parseFloat(window.getComputedStyle(dragFromDOM).marginLeft) + 
        Array.from(dragFromDOM.parentNode.children)
          .slice(0, sourceColumnIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginLeft = parseFloat(style.marginLeft);
            const borderLeft = parseFloat(style.borderLeft);
            const borderRight = parseFloat(style.borderRight);
            const marginRight = parseFloat(style.marginRight);
            return total + marginLeft + borderLeft + curr.clientWidth + borderRight + marginRight;
          }, 0) +
        parseFloat(window.getComputedStyle(dragFromDOM).paddingLeft) +
        parseFloat(window.getComputedStyle(draggedDOM).marginLeft);
      let clientY =
        parseFloat(window.getComputedStyle(dragFromDOM).paddingTop) +
        parseFloat(window.getComputedStyle(draggedDOM).marginTop) +
        Array.from(dragFromDOM.children)
          .slice(0, sourceIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginTop = parseFloat(style.marginTop);
            const borderTop = parseFloat(style.borderTop);
            const borderBottom = parseFloat(style.borderBottom);
            const marginBottom = parseFloat(style.marginBottom);
            return total + marginTop + borderTop + curr.clientHeight + borderBottom + marginBottom;
          }, 0);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientX,
        clientY,
        type,
      });
    }
  };

  const handleDragUpdate = event => {
    if (!event.destination) {
      return;
    }
    const draggedDOM = getDom(event.draggableId);
    const dragFromDOM = getDom(event.source.droppableId, false);
    const dragToDom = getDom(event.destination.droppableId, false);
    if (isNil(draggedDOM) || isNil(dragFromDOM) || isNil(dragToDom)) {
      return;
    }
    const { type } = event;
    if (type === 'COLUMN') {
      const { clientHeight, clientWidth } = draggedDOM;
      const destinationIndex = event.destination.index;
      const sourceIndex = event.source.index;
      const destinationArray = Array.from(dragToDom.children);
      const sourceArray = Array.from(dragFromDOM.children);
      const movedItem = sourceArray[sourceIndex];
      sourceArray.splice(sourceIndex, 1);
      destinationArray.splice(destinationIndex, 0, movedItem);
      let clientX = 
        parseFloat(window.getComputedStyle(dragToDom).paddingLeft) +
        parseFloat(window.getComputedStyle(draggedDOM).marginLeft) + 
        destinationArray
          .slice(0, destinationIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginLeft = parseFloat(style.marginLeft);
            const borderLeft = parseFloat(style.borderLeft);
            const borderRight = parseFloat(style.borderRight);
            const marginRight = parseFloat(style.marginRight);
            return total + marginLeft + borderLeft + curr.clientWidth + borderRight + marginRight;
          }, 0);
      let clientY =
        parseFloat(window.getComputedStyle(dragToDom).paddingTop) +
        parseFloat(window.getComputedStyle(draggedDOM).marginTop);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientX,
        clientY,
        type,
      });
    } else {
      const { clientHeight, clientWidth } = draggedDOM;
      const destinationIndex = event.destination.index;
      const sourceIndex = event.source.index;
      const destinationColumnIndex = findIndex(dragToDom.parentNode, dragToDom);
      const destinationArray = Array.from(dragToDom.children);
      const sourceArray = Array.from(dragFromDOM.children);
      const movedItem = sourceArray[sourceIndex];
      sourceArray.splice(sourceIndex, 1);
      destinationArray.splice(destinationIndex, 0, movedItem);
      let clientX = 
        parseFloat(window.getComputedStyle(dragToDom.parentNode).paddingLeft) +
        parseFloat(window.getComputedStyle(dragToDom).marginLeft) + 
        Array.from(dragToDom.parentNode.children)
          .slice(0, destinationColumnIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginLeft = parseFloat(style.marginLeft);
            const borderLeft = parseFloat(style.borderLeft);
            const borderRight = parseFloat(style.borderRight);
            const marginRight = parseFloat(style.marginRight);
            return total + marginLeft + borderLeft + curr.clientWidth + borderRight + marginRight;
          }, 0) +
        parseFloat(window.getComputedStyle(dragToDom).paddingLeft) +
        parseFloat(window.getComputedStyle(draggedDOM).marginLeft);
      let clientY =
        parseFloat(window.getComputedStyle(dragToDom).paddingTop) +
        parseFloat(window.getComputedStyle(draggedDOM).marginTop) + 
        destinationArray
          .slice(0, destinationIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginTop = parseFloat(style.marginTop);
            const borderTop = parseFloat(style.borderTop);
            const borderBottom = parseFloat(style.borderBottom);
            const marginBottom = parseFloat(style.marginBottom);
            return total + marginTop + borderTop + curr.clientHeight + borderBottom + marginBottom;
          }, 0);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientX,
        clientY,
        type,
      });
    }
  };

  const handleDragEnd = result => {
    setPlaceholderProps({});
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
      tasks={tasks.tasks}
      loading={tasks.loading}
      handleSortTasks={handleDragEnd}
      handleDragStart={handleDragStart}
      handleDragUpdate={handleDragUpdate}
      handleOpenModal={handleOpenModal}
      placeholderProps={placeholderProps}
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
    doKanbanSortTask: (option, quite = false) => dispatch(sortTask(option, quite)),
    doKanbanSortGroupTask: (option, quite = false) => dispatch(sortGroupTask(option, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanBoard);
