import React from 'react';
import { Link } from 'react-router-dom';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { ListItemText } from '@material-ui/core';
import { get } from 'lodash';
import './style.scss';

const CustomStyledListItem = ({ className = '', ...props }) => 
  <StyledListItem 
    className={`view_Member_UserListItem___list-item ${className}`}
    {...props}
  />;

function CustomListItem({ user, handleLink, }) {

  return (
    <CustomStyledListItem 
      component={Link}
      to='#'
      onClick={() => handleLink(get(user, 'id', ''))}
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
