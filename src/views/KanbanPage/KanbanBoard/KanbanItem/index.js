import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomAvatar from 'components/CustomAvatar';
import { get } from 'lodash';
import './style.scss'

const Container = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___container${isDragging ? '-dragging' : ''} ${className}`} {...props} />;

const Name = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___name ${className}`} {...props} />;
  
const Body = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___body ${className}`} {...props} />;

const User = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___user ${className}`} {...props} />;

const Chat = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___chat ${className}`} {...props} />;
 
const Footer = ({ className = '', isDragging, innerRef, ...props }) =>
  <div ref={innerRef} className={`view_KanbanItem___footer ${className}`} {...props} />;

function KanbanItem({ task, index }) {

  return (
    <Draggable draggableId={get(task, 'id', '')} index={index} key={get(task, 'id', '')} >
      {(dragProvided, dragSnapshot) => (
        <Container
          innerRef={dragProvided.innerRef}
          isDragging={dragSnapshot.isDragging}
          {...dragProvided.draggableProps}
        >
          <Name {...dragProvided.dragHandleProps}>{get(task, 'name', '')}</Name>
          <Body>
            <User>
              <CustomAvatar 
                src={get(task, 'chat.user_create_avatar', '')}
                alt="user's avatar"
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <span>{get(task, 'chat.user_create_name', '')}</span>
            </User>
            <Chat>{get(task, 'chat.content', '')}</Chat>
          </Body>
          <Footer>
            <span>{`${get(task, 'duration.value', 0)} ${get(task, 'duration.unit', 'Ngày')}`}</span>
            <span>{get(task, 'status_name', 'Dừng lại')}</span>
            <AvatarCircleList 
              users={get(task, 'members', [])}
              display={3}
            />
          </Footer>
        </Container>
      )}
    </Draggable>
  );
}

export default KanbanItem;

