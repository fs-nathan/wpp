import { ListItemText } from '@material-ui/core';
import CustomAvatar from 'components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from 'components/CustomList';
import { get, join } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

function CustomListItem({ member, index, onClick }) {
  const [isHover, setIsHover] = React.useState(false);
  const { t } = useTranslation();

  return (
    <StyledListItem
      component={Link}
      to={`#`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <CustomAvatar style={{ width: 40, height: 40, }} src={get(member, 'avatar', '')} alt='avatar' />
      <ListItemText
        primary={
          <Primary>{get(member, 'name', '')}</Primary>
        }
        secondary={
          <div>
            <Secondary>
              {t("DMH.VIEW.PP.LEFT.PM.NUM_TASK", {
                number_task: get(member, 'number_task', 0),
                total_task: get(member, 'all_task', 0),
              })}
            </Secondary>
            <Detail isInGroup={get(member, 'is_in_group', false) === false || get(member, 'is_admin', false)}>
              {get(member, 'is_in_group', false)
                ? getDetail(member)
                : t("DMH.VIEW.PP.LEFT.PM.LEAVE")
              }
            </Detail>
          </div>
        }
      />
    </StyledListItem>
  )
}

export default CustomListItem;
