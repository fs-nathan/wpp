import React from "react";
import Scrollbars from 'components/Scrollbars';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanColumn, { ColumnHeader, Container as ColumnContainer } from './KanbanColumn';
import LoadingOverlay from "components/LoadingOverlay";
import { get } from 'lodash';
import './style.scss';

const Container = ({ className = '', isDraggingOver, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanBoard___container ${className}`} 
    {...props} 
  />;

const NewGroupTaskDiv = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanBoard___new-grouptask ${className}`} 
    {...props} 
  />;

function KanbanBoard({
  tasks,
  loading,
  handleSortTasks,
  handleDragStart, handleDragUpdate,
  handleOpenModal,
  placeholderProps,
  projectId,
}) {

  return (
    <LoadingOverlay
      active={loading}
      spinner
      fadeSpeed={0}
      style={{
        height: "100%",
        zIndex: "999",
      }}
    >
      <Scrollbars
        autoHide
        autoHideTimeout={500}
      >
        <DragDropContext 
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
          onDragEnd={handleSortTasks}
        >
          <Droppable
            droppableId='kanban-board'
            type='COLUMN'
            direction="horizontal"
            renderClone={(provided, snapshot, rubric) => (
              <ColumnContainer
                {...provided.draggableProps}
                innerRef={provided.innerRef}
                isDragging={snapshot.isDragging}
                className={'view_KanbanBoard___column-container-clone'}
                style={{
                  ...provided.draggableProps.style,
                  transform: provided.draggableProps.style.transform
                    ? `${provided.draggableProps.style.transform} rotate(15deg)`
                    : null,
                }}
              >
                <ColumnHeader 
                  groupTask={tasks[rubric.source.index]}
                  index={rubric.source.index}
                  dragProvided={provided}
                />
              </ColumnContainer>
            )}
          >
            {(dropProvided, dropSnapshot) => (
              <Container 
                innerRef={dropProvided.innerRef} 
                isDraggingOver={dropSnapshot.isDraggingOver}
                {...dropProvided.droppableProps}
                data-custom-label="kanban-board"
              >
                {tasks.map((groupTask, index) => (
                  <KanbanColumn 
                    groupTask={groupTask}
                    key={index}
                    index={index}
                    handleOpenModal={handleOpenModal}
                    placeholderProps={placeholderProps}
                    projectId={projectId}
                  />)
                )}
                {dropProvided.placeholder}
                {get(placeholderProps, 'type', '') === 'COLUMN' && dropSnapshot.isDraggingOver && (
                  <div
                    className="view_KanbanBoard___dragdrop-placeholder"
                    style={{
                      top: placeholderProps.clientY,
                      left: placeholderProps.clientX,
                      height: placeholderProps.clientHeight,
                      width: placeholderProps.clientWidth,
                    }}
                  />
                )}
                <NewGroupTaskDiv>
                  {'+ Thêm giai đoạn'}
                </NewGroupTaskDiv>
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollbars>
    </LoadingOverlay>
  );
}

export default KanbanBoard;
