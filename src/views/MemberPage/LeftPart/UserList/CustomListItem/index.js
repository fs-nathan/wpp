import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledListItem, Primary, Secondary } from '../../../../../components/CustomList';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { ListItemText } from '@material-ui/core';
import { get } from 'lodash';

const CustomStyledListItem = styled(StyledListItem)`
  padding: 15px;
`;

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
