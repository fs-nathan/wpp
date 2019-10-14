import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDragVertical,
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
  &:nth-child(4) > div {
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
        <Checkbox />
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Loại
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Tên tài liệu
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Nơi lưu trữ
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Ngày tạo
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Người tạo
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Kích cỡ
      </StyledTableHeadCell>
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
