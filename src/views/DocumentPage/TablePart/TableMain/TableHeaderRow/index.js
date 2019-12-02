import React from 'react';
import styled from 'styled-components';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';
// import Icon from '@mdi/react';
// import {
// mdiDragVertical,
//   mdiSortDescending, mdiSortAscending
// } from '@mdi/js';
import { getActiveTab } from '../../../commonFunction';

const StyledTableHeadRow = styled(TableRow)`
  background-color: rgba(0, 0, 0, 0);
`;

const StyledTableHeadCell = styled(({ children, ...rest }) => (
  <TableCell {...rest} onClick={() => console.log('LALLA')}>
    <div>{children}</div>
  </TableCell>
))`
  color: gray;
  padding: 11px;
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
  const activeTab = getActiveTab(props.activeTabId);

  return (
    <StyledTableHeadRow>
      <StyledTableHeadCell>
        <Checkbox />
      </StyledTableHeadCell>

      {activeTab.columns.map((col, idx) => (
        <StyledTableHeadCell
          key={`header ${idx}`}
          align={col.align}
          style={col.additionStyle}
        >
          {col.name}
        </StyledTableHeadCell>
      ))}
    </StyledTableHeadRow>
  );
}

export default TableHeaderRow;
