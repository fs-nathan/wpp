import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { ListItemText, IconButton } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import Icon from '@mdi/react';
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';

function CustomListItem({ taskGroup, index, setAnchorEl, setCurGroupTask }) {
  
  const [isHover, setIsHover] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
    setCurGroupTask(taskGroup);
  }

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
              <Secondary>{get(taskGroup, 'number_task', 0)} việc</Secondary>
            }
          />
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            disabled={!isHover}
          >
            <Icon path={mdiDotsVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.7)'} />
          </IconButton>
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
