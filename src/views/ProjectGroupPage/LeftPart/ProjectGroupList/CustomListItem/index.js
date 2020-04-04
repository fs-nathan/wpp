import { ListItemText } from '@material-ui/core';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';

function CustomListItem({ projectGroup, index, route }) {
  const [isHover, setIsHover] = React.useState(false);
  const { t } = useTranslation();

  return (
    <Draggable
      draggableId={get(projectGroup, 'id')}
      index={index}
    >
      {(provided) => (
        <StyledListItem
          component={Link}
          to={`${route}/group/${get(projectGroup, 'id', '')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
          </div>
          <CustomAvatar style={{ height: 50, width: 50, }} src={get(projectGroup, 'icon')} alt='avatar' />
          <ListItemText
            primary={
              <Primary>{get(projectGroup, 'name', '')}</Primary>
            }
            secondary={
              <Secondary>{t("DMH.VIEW.PGP.LEFT.LIST.NUM_MEM", { projectGroups: get(projectGroup, 'number_project', 0) })}</Secondary>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
