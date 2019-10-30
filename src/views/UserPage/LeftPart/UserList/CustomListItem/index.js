import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import { Avatar, ListItemText } from '@material-ui/core';
import _ from 'lodash';

const CustomStyledListItem = styled(StyledListItem)`
  padding: 15px;
`;

function CustomListItem({ user, index }) {

  const location = useLocation();
  const { userId } = useParams();
  
  return (
    <CustomStyledListItem 
      component={Link}
      to={`${location.pathname.replace(`${userId}`, `${_.get(user, 'id', '')}`)}`}
    >
      <Avatar style={{ width: 40, height: 40, }} src={_.get(user, 'avatar', '')} alt='avatar' />
      <ListItemText 
        primary={
          <Primary>{_.get(user, 'name', '')}</Primary>  
        }
        secondary={
          <Secondary></Secondary>
        }
      />
    </CustomStyledListItem>
  )
}

export default CustomListItem;
