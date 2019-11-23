import React from 'react';
import { get } from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { ListItemText } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';

function CustomListItem({ room, index }) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={get(room, 'id')}
      index={index}  
    >
      {(provided) => (
        <StyledListItem 
          component={Link}
          to={`${location.pathname}/${get(room, 'id')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <CustomAvatar style={{ height: 50, width: 50, }} src={room.icon} alt='avatar' />
          <ListItemText 
            primary={
              <Primary>{get(room, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{get(room, 'number_member', 0)} thành viên</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
