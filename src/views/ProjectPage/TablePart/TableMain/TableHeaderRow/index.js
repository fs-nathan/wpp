import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
  mdiAccountOutline,
  mdiSettingsOutline,
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
  &:nth-child(2) > div {
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
        Dự án
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Trạng thái
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Hoàn thành
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Tiến độ
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Ưu tiên
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        <Icon path={mdiAccountOutline} size={1} color={'rgb(102, 102, 102)'} />
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        <Icon path={mdiSettingsOutline} size={1} color={'rgb(102, 102, 102)'} />
      </StyledTableHeadCell>
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
