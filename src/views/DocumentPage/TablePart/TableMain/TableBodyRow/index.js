import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow, Avatar, Checkbox } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
} from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 8px;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:nth-child(4) > * {
    justify-content: flex-start;
  }
`;

function TableBodyRow({ task, index }) {

  return (
    <Draggable 
      draggableId={task.id}
      index={index}  
    >
      {(provided) => (
        <StyledTableBodyRow 
          innerRef={provided.innerRef}
          {...provided.draggableProps} 
        >
          <StyledTableBodyCell>
            <div {...provided.dragHandleProps}>
              <Icon path={mdiDragVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <Checkbox />
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <div>
              <Avatar src={avatar} alt='avatar' />
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, aliquam?</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo>Văn thư</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo>02/02/2012</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <div>
              <Avatar src={avatar} alt='avatar' />
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo>15.01 MB</ColorTypo>
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      )}
    </Draggable>
  );
}

export default TableBodyRow;
