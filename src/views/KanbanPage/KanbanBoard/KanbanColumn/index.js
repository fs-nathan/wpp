import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { get } from 'lodash';
import KanbanItem from '../KanbanItem';
import Scrollbars from 'components/Scrollbars';
import './style.scss'

const Container = ({ className = '', isDragging, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanColumn___container${isDragging ? '-dragging' : ''} ${className}`} 
    {...props} 
  />;

const ItemList = ({ className = '', isDraggingOver, innerRef, ...props }) =>
  <div 
    ref={innerRef} 
    className={`view_KanbanColumn___item-list${isDraggingOver ? '-dragging-over' : ''} ${className}`}
    {...props} 
  />;

const ListScroll = ({ className = '', ...props }) =>
  <Scrollbars 
    className={`view_KanbanColumn___list-scroll ${className}`}
    {...props} 
  />;
 
const GroupName = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanColumn___group-name ${className}`}
    {...props} 
  />;

function KanbanColumn({ groupTask, index }) {

  return (
    <Draggable 
      draggableId={get(groupTask, 'id', '')} 
      key={get(groupTask, 'id', '')}
      index={index}
    >
      {(dragProvided, dragSnapshot) => (
        <Container
          innerRef={dragProvided.innerRef}
          isDragging={dragSnapshot.isDragging}
          {...dragProvided.draggableProps}
        >
          <GroupName
            {...dragProvided.dragHandleProps}
          >{get(groupTask, 'name', '')}</GroupName>
          <ListScroll
            autoHide
            autoHideTimeout={500}
          >
            <Droppable
              droppableId={`d-${get(groupTask, 'id', '')}`}
              type='ITEM'
            >
              {(dropProvided, dropSnapshot) => (
                <ItemList
                  isDraggingOver={dropSnapshot.isDraggingOver}
                  {...dropProvided.droppableProps}
                  innerRef={dropProvided.innerRef}
                >
                  {get(groupTask, 'tasks', []).map((task, index) => (
                    <KanbanItem 
                      task={task}
                      index={index}
                      key={index}
                    />
                  ))}
                  {dropProvided.placeholder}
                </ItemList>
              )}
            </Droppable>
          </ListScroll>
        </Container>
      )}
    </Draggable>
  );
}

export default KanbanColumn;