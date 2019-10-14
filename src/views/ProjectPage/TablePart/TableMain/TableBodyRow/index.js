import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TableCell, TableRow, Avatar, IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiPlusCircleOutline,
  mdiDotsVertical,
} from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import SimpleSmallProgressBar from '../../../../../components/SimpleSmallProgressBar';
import ColorChip from '../../../../../components/ColorChip';
import AvatarCircleList from '../../../../../components/AvatarCircleList';
import avatar from '../../../../../assets/avatar.jpg';

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
  &:nth-child(3), &:nth-child(5), &:nth-child(6) {
    text-align: center;
  }
  &:nth-child(7) > div {
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
            <ColorTypo>Phân tích ứng dụng đặt tua du lịch tự động</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorTypo color='red'>• Quá hạn</ColorTypo>
            <ColorTypo variant='caption'>4 ngày</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <SimpleSmallProgressBar color={'#3edcdb'} percentDone={task.content} />
          </StyledTableBodyCell>
          <StyledTableBodyCell>  
            <ColorTypo color='orange'>250 ngày</ColorTypo>
            <ColorTypo variant='caption'>02/02/2012 - 08/08/2018</ColorTypo>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <ColorChip label={'Trung bình'} color={'blue'} badge size='small'/>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <div>
              <AvatarCircleList total={5} display={2} />
              <IconButton size='small'>
                <Icon path={mdiPlusCircleOutline} size={1} color='rgba(0, 0, 0, 0.7)'/>
              </IconButton>
            </div>
          </StyledTableBodyCell>
          <StyledTableBodyCell>
            <IconButton size='small'>
              <Icon path={mdiDotsVertical} size={1}/>
            </IconButton>
          </StyledTableBodyCell>
        </StyledTableBodyRow>
      )}
    </Draggable>
  );
}

export default TableBodyRow;
