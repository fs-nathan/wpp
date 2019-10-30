import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  // mdiDragVertical,
  mdiSortDescending, mdiSortAscending
} from '@mdi/js';
import {
  getActiveTab
} from '../../../commonFunction'

const StyledTableHeadRow = styled(TableRow)`
  background-color: rgba(0, 0, 0, 0);
`;

const StyledTableHeadCell = styled(({ children, ...rest }) =>
  <TableCell {...rest} onClick={() => console.log("LALLA")}>
    <div>{children}</div>
  </TableCell>
)`
  color: gray;
  padding: 8px;
  & > div {
    font-size: 1.2rem;
    display: inline-flex;
  }
  & > div > svg {
    margin-left: 4px;
  }
  &:not(:first-child):hover {
    color: black;
    font-weight: bold;
  }
  &:nth-child(4) > div {
    justify-content: start;
  }
  &:last-child {
    padding: 16px;
  }
`;

function TableHeaderRow(props) {
  
  const activeTab = getActiveTab(props.activeTabId)

  return (
    <StyledTableHeadRow>
      {/* <StyledTableHeadCell>
        <Icon path={mdiDragVertical} size={1} color={'rgb(102, 102, 102)'}/>
      </StyledTableHeadCell> */}
      <StyledTableHeadCell>
        <Checkbox />
      </StyledTableHeadCell>

      {activeTab.columns.map((col, idx) => {
        return (
          <StyledTableHeadCell 
            key={`header ${idx}`} 
            align={col.align} 
            style={col.additionStyle}>
            {col.name}
          </StyledTableHeadCell>
        )
      })}
      {/* <StyledTableHeadCell align="center">
        Loại
      </StyledTableHeadCell>
      <StyledTableHeadCell style={{ width: "40%" }}>
        Tên tài liệu
        <Icon
          path={mdiSortAscending} size={1}
        />
      </StyledTableHeadCell>
      <StyledTableHeadCell style={{ width: "18%" }} align="center">
        Nơi lưu trữ
        <Icon
          path={mdiSortDescending} size={1}
        />
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Ngày tạo
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        Người tạo
      </StyledTableHeadCell>
      <StyledTableHeadCell align="right" style={{paddingRight: 16}}>
        Kích thước
      </StyledTableHeadCell> */}




    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
