import { ListItemText } from '@material-ui/core';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';

function CustomListItem({
  room, index
}) {

  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);
  const { t } = useTranslation();

  return (
    <Draggable
      draggableId={get(room, 'id')}
      index={index}
    >
      {(provided) => (
        <StyledListItem
          component={Link}
          to={`${location.pathname}/room/${get(room, 'id')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
          </div>
          <CustomAvatar style={{ height: 50, width: 50, }} src={room.icon} alt='avatar' />
          <ListItemText
            primary={
              <Primary>{get(room, 'name', '')}</Primary>
            }
            secondary={
              <Secondary>{t('DMH.VIEW.DP.LEFT.LIST.NUM_MEM', { members: get(room, 'number_member', 0) })}</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
