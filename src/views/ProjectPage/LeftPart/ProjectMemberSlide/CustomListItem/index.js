import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { ListItemText } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';

function CustomListItem({ member, index }) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={get(member, 'id')}
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
          <CustomAvatar style={{ width: 40, height: 40, }} src={get(member, 'avatar', '')} alt='avatar' />
          <ListItemText 
            primary={
              <Primary>{get(member, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{get(member, 'tasks', []).length} việc</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
