import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import { Avatar, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import _ from 'lodash';

function CustomListItem({ user, index }) {

  const location = useLocation();
  const { userId } = useParams();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={_.get(user, 'id', '')}
      index={index}  
    >
      {(provided) => (
        <StyledListItem 
          component={Link}
          to={`${location.pathname.replace(`${userId}`, `${_.get(user, 'id', '')}`)}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <Avatar style={{ width: 50, height: 50, }} src={_.get(user, 'avatar', '')} alt='avatar' />
          <ListItemText 
            primary={
              <Primary>{_.get(user, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{_.get(user, 'room', '')}</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
