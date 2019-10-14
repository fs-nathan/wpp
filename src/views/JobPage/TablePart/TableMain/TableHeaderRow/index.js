import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiAccountOutline,
  mdiTrashCan,
} from '@mdi/js';

const StyledTableHeadRow = styled(TableRow)`
  background-color: rgba(0, 0, 0, .1);
`;

const StyledTableHeadCell = styled(({children, ...rest}) => 
  <TableCell {...rest}>
    <div>{children}</div>
  </TableCell>
)`
  font-weight: bold;
  color: rgb(102, 102, 102);
  padding: 8px;
  & > div {
    display: flex;
    justify-content: center;
    font-size: 11px;
  }
  &:nth-child(3) > div {
    justify-content: start;
  }
`;

function TableHeaderRow() {
  return (
    <StyledTableHeadRow>
      <StyledTableHeadCell>
        <Icon path={mdiDragVertical} size={1} color={'rgb(102, 102, 102)'}/>
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        <Icon path={mdiTrashCan} size={1} color={'rgb(102, 102, 102)'}/>
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Tên công việc
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Ưu tiên
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Tiến độ
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Bắt đầu
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Kết thúc
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Hoàn thành
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Trạng thái
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        <Icon path={mdiAccountOutline} size={1} color={'rgb(102, 102, 102)'} />
      </StyledTableHeadCell>
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
