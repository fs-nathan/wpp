import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow, Avatar, IconButton, Checkbox } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiPlusCircleOutline,
} from '@mdi/js';
import ColorTypo from '../../../../../../components//ColorTypo';
import SimpleSmallProgressBar from '../../../../../../components//SimpleSmallProgressBar';
import ColorChip from '../../../../../../components/ColorChip';
import AvatarCircleList from '../../../../../../components/AvatarCircleList';
import avatar from '../../../../../../assets/avatar.jpg';

const StyledTableBodyRow = styled(TableRow)`
  background-color: #fff;
`;

const StyledTableBodyCell = styled(TableCell)`
  padding: 8px;
  &:nth-child(1) > div {
    display: flex;
    justify-content: center;
    width: 37px;
    height: 30px;
    margin-right: 0;
  }
  &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(9) {
    text-align: center;
  }
  &:nth-child(10) > div {
    display: flex;
    align-items: center;
    & > *:last-child {
      margin-left: 2px;
    }
  }
`;

function TableBodyRow({ task, index }) {

  const [isHover, setIsHover] = React.useState(false);

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
          <StyledTableBodyCell
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div {...provided.dragHandleProps}>
              {!isHover && <Avatar style={{width: 30, height: 30}} src={avatar} alt='avatar' />}
              {isHover && <Icon path={mdiDragVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>}
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <Checkbox />
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo>Phân tích ứng dụng đặt tua du lịch tự động</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorChip label={'Cao'} color={'red'} badge size='small'/>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='orange'>3 ngày</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo>08:00</ColorTypo>
            <ColorTypo>02/02/2012</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo>08:00</ColorTypo>
            <ColorTypo>02/02/2019</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <SimpleSmallProgressBar color={'#3edcdb'} percentDone={task.content} />
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='red'>• Quá hạn</ColorTypo>
            <ColorTypo variant='caption'>4 ngày</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <div>
              <AvatarCircleList total={5} display={2} />
              <IconButton size='small'>
                <Icon path={mdiPlusCircleOutline} size={1} color='rgba(0, 0, 0, 0.7)'/>
              </IconButton>
            </div>
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      )}
    </Draggable>
  );
}

export default TableBodyRow;
