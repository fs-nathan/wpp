import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiDragVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import { StyledListItem } from '../../../../../components/CustomList';
import { get } from 'lodash';

const Container = styled(StyledListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const TextSpan = styled.div`
  display: flex;
  align-items: baseline;
`;

function CustomListItem({ projectGroup, index }) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <Draggable 
      draggableId={get(projectGroup, 'id')}
      index={index}  
    >
      {(provided) => (
        <Container 
          component={Link}
          to={`${location.pathname}/detail/${get(projectGroup, 'id', '')}`}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}  
        >
          <div {...provided.dragHandleProps}>
            <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'}/>
          </div>
          <Avatar src={get(projectGroup, 'icon')} alt='avatar' />
          <TextSpan>
            <ColorTypo>{get(projectGroup, 'name', '')}</ColorTypo>
            &nbsp;
            <ColorTypo variant='caption'>({get(projectGroup, 'number_project', 0)} dự án)</ColorTypo>
          </TextSpan>
        </Container>
      )}
    </Draggable>
  )
}

export default CustomListItem;
