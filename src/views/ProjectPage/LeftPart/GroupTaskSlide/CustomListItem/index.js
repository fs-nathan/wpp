import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { ListItemText } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';

function CustomListItem({ taskGroup, index }) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={get(taskGroup, 'id')}
      index={index}  
    >
      {(provided) => (
        <StyledListItem 
          component={Link}
          to={`#`}
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
              <Primary>{get(taskGroup, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{get(taskGroup, 'tasks', []).length} việc</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
