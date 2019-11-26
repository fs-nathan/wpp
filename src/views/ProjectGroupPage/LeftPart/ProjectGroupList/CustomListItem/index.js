import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { get } from 'lodash';

function CustomListItem({ projectGroup, index }) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={get(projectGroup, 'id')}
      index={index}  
    >
      {(provided) => (
        <StyledListItem 
          component={Link}
          to={`${location.pathname}/${get(projectGroup, 'id', '')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <CustomAvatar style={{ height: 50, width: 50, }} src={get(projectGroup, 'icon')} alt='avatar' />
          <ListItemText 
            primary={
              <Primary>{get(projectGroup, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{get(projectGroup, 'number_project', 0)} dự án</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;