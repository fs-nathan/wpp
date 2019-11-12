import React from 'react';
import _ from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, ListItemText } from '@material-ui/core';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import * as routes from '../../../../../constants/routes'

function CustomListItem({ room, index }) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable
      draggableId={_.get(room, 'id', '')}
      index={index}
    >
      {(provided) => (
        <StyledListItem
          component={Link}
          to={`${location.pathname + routes.information}/${_.get(room, 'id', '')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
          </div>
          <Avatar style={{ height: 50, width: 50, }} src={room.icon} alt='avatar' />
          <ListItemText
            primary={
              <Primary>{_.get(room, 'name', '')}</Primary>
            }
            secondary={
              <Secondary>{_.get(room, 'number_member', 0)} thành viên</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;