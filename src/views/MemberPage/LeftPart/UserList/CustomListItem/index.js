import { ListItemText } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';
import './style.scss';

const CustomStyledListItem = ({ className = '', ...props }) =>
  <StyledListItem
    className={`view_Member_UserListItem___list-item ${className}`}
    {...props}
  />;

function CustomListItem({ user, handleLink, }) {
  const history = useHistory();
  return (
    <CustomStyledListItem
      component={Link}
      to='#'
      onClick={() => handleLink(get(user, 'id', ''))}
      className={history.location.pathname.includes(get(user, 'id')) ? "item-actived" : ""}
    >
      <CustomAvatar style={{ width: 40, height: 40, }} src={get(user, 'avatar', '')} alt='avatar' />
      <ListItemText
        primary={
          <Primary>{get(user, 'name', '')}</Primary>
        }
        secondary={
          <Secondary></Secondary>
        }
      />
    </CustomStyledListItem>
  )
}

export default CustomListItem;
