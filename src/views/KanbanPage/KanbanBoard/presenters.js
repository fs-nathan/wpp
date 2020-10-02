import React from "react";
import Scrollbars from 'components/Scrollbars';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanColumn from './KanbanColumn';
import './style.scss';

const Container = ({ className = '', isDraggingOver, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanBoard___container${isDraggingOver ? '-dragging-over' : ''} ${className}`} 
    {...props} 
  />;

function KanbanBoard({
  tasks,
  handleSortTasks,
}) {

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={500}
    >
      <DragDropContext onDragEnd={handleSortTasks}>
        <Droppable
          droppableId='kanban-board'
          type='COLUMN'
          direction="horizontal"
          renderClone={(provided, snapshot, rubric) => (
            <div    
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >X</div>
          )}
        >
          {(dropProvided, dropSnapshot) => (
            <Container 
              innerRef={dropProvided.innerRef} 
              isDraggingOver={dropSnapshot.isDraggingOver}
              {...dropProvided.droppableProps}
            >
              {tasks.map((groupTask, index) => (
                <KanbanColumn 
                  groupTask={groupTask}
                  key={index}
                  index={index}
                />)
              )}
              {dropProvided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </Scrollbars>
  );
}

export default KanbanBoard;
