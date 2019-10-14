import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, ListItem, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';

const Container = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

function CustomListItem({ room, index }) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={_.get(room, 'id', '')}
      index={index}  
    >
      {(provided) => (
        <Container 
          button
          component={Link}
          to={`${location.pathname}/thong-tin/${_.get(room, 'id', '')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <Avatar src={room.icon} alt='avatar' />
          <ListItemText 
            primary={
              <ColorTypo component='span'>{_.get(room, 'name', '')}</ColorTypo>  
            }
            secondary={
              <ColorTypo component='small' color='green' variant='caption'>{_.get(room, 'number_member', 0)} thành viên</ColorTypo>
            }
          />
        </Container>
      )}
    </Draggable>
  )
}

export default CustomListItem;
