import {ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';

function CustomListItem({
  room, index, handleLink, canDrag,
}) {

  const [isHover, setIsHover] = React.useState(false);
  const { t } = useTranslation();

  if (canDrag)
    return (
      <Draggable
        draggableId={get(room, 'id')}
        index={index}
      >
        {(provided) => (
          <StyledListItem
            component={Link}
            to={'#'}
            onClick={evt => handleLink(get(room, 'id'))}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <CustomAvatar style={{ height: 35, width: 35, }} src={room.icon} alt='avatar' />
            <ListItemText
              primary={
                <Primary style={{ marginLeft: "10px"}}>{get(room, 'name', '')}</Primary>
              }
              secondary={
                <Secondary style={{ marginLeft: "10px"}}>{t('DMH.VIEW.DP.LEFT.LIST.NUM_MEM', { members: get(room, 'number_member', 0) })}</Secondary>
              }
            />
            <ListItemSecondaryAction>
              <div {...provided.dragHandleProps}>
                <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
              </div>
            </ListItemSecondaryAction>
          </StyledListItem>
        )}
      </Draggable>
    )
  else
    return (
      <StyledListItem
        component={Link}
        to={'#'}
        onClick={evt => handleLink(get(room, 'id'))}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
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
    )
}
export default CustomListItem;
