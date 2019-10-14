import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, ListItem, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import _ from 'lodash';

const Container = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

function CustomListItem({ user, index }) {

  const location = useLocation();
  const { userId } = useParams();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={_.get(user, 'id', '')}
      index={index}  
    >
      {(provided) => (
        <Container 
          component={Link}
          to={`${location.pathname.replace(`${userId}`, `${_.get(user, 'id', '')}`)}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <Avatar src={_.get(user, 'avatar', '')} alt='avatar' />
          <ListItemText 
            primary={
              <ColorTypo component='span'>{_.get(user, 'name', '')}</ColorTypo>  
            }
            secondary={
              <ColorTypo component='small' color='green' variant='caption'>{_.get(user, 'room', '')}</ColorTypo>
            }
          />
        </Container>
      )}
    </Draggable>
  )
}

export default CustomListItem;
