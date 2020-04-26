import { ListItemText } from '@material-ui/core';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { get, join } from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';
import './style.scss';

function getDetail(member) {
  let result;
  if (get(member, 'group_permission_name')) {
    if (get(member, 'roles', []).length > 0) {
      result = `${get(member, 'group_permission_name')} - ${join(get(member, 'roles', []).map(role => get(role, 'name', '')), ', ')}`;
    } else {
      result = `${get(member, 'group_permission_name')}`
    }
  } else {
    if (get(member, 'roles', []).length > 0) {
      result = `${join(get(member, 'roles', []).map(role => get(role, 'name', '')), ', ')}`;
    } else {
      result = '';
    }
  }
  return result;
}

const Detail = ({ className = '', isInGroup = false, ...props }) =>
  <span
    className={`view_Project_ProjectMemberSlide_Item___detail${isInGroup ? '-in-group' : ''} ${className}`}
    {...props}
  />

function CustomListItem({ member, index, totalTasks }) {
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
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
          </div>
          <CustomAvatar style={{ width: 40, height: 40, }} src={get(member, 'avatar', '')} alt='avatar' />
          <ListItemText
            primary={
              <Primary>{get(member, 'name', '')}</Primary>
            }
            secondary={
              <div>
                <Secondary>Tham gia {get(member, 'number_task', 0)}/{totalTasks} việc</Secondary>
                <Detail isInGroup={get(member, 'is_in_group', false) === false || get(member, 'is_admin', false)}>
                  {get(member, 'is_in_group', false)
                    ? getDetail(member)
                    : 'Đã rời nhóm'
                  }
                </Detail>
              </div>
            }
          />
        </StyledListItem>
      )}
    </Draggable>
  )
}

export default CustomListItem;
