import { IconButton, ListItemText } from '@material-ui/core';
import { mdiDotsVertical, mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { Primary, Secondary, StyledListItem } from 'components/CustomList';
import { get } from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CustomListItem({ taskGroup, index, setAnchorEl, setCurGroupTask, havePermissionManage }) {

  const { t } = useTranslation();

  const [isHover, setIsHover] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
    setCurGroupTask(taskGroup);
  }
  if (havePermissionManage) {
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
              <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
            </div>
            <ListItemText
              primary={
                <Primary>{get(taskGroup, 'name', '')}</Primary>
              }
              secondary={
                <Secondary>{t("DMH.VIEW.PP.LEFT.GT.NUM_TASK", { number_task: get(taskGroup, 'number_task', 0) })}</Secondary>
              }
            />
            {
              taskGroup.can_modify &&
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                disabled={!isHover}
              >
                <Icon path={mdiDotsVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.7)'} />
              </IconButton>
            }
          </StyledListItem>
        )}
      </Draggable>
    )
  } else {
    return (
      <StyledListItem
        component={Link}
        to={`#`}
      >
        <ListItemText
          primary={
            <Primary>{get(taskGroup, 'name', '')}</Primary>
          }
          secondary={
            <Secondary>{t("DMH.VIEW.PP.LEFT.GT.NUM_TASK", { number_task: get(taskGroup, 'number_task', 0) })}</Secondary>
          }
        />
        {
          taskGroup.can_modify &&
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            disabled={!isHover}
          >
            <Icon path={mdiDotsVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.7)'} />
          </IconButton>
        }
      </StyledListItem>
    )
  }
}

export default CustomListItem;
