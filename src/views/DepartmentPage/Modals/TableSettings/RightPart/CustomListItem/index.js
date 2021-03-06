import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ListItem, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import ColorTypo from '../../../../../../components/ColorTypo';

const Container = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

function CustomListItem({ task, index }) {

  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={task.id}
      index={index}  
    >
      {(provided) => (
        <Container 
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <ListItemText 
            primary={
              <ColorTypo component='span'>Tên công việc {task.id}</ColorTypo>  
            }
          />
        </Container>
      )}
    </Draggable>
  )
}

export default CustomListItem;
