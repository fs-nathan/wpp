import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';
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
  &:nth-child(3) > div, &:nth-child(7) > div, &:nth-child(10) > div {
    justify-content: start;
  }
`;

function TableHeaderRow() {

  const { t } = useTranslation();

  return (
    <StyledTableHeadRow>
      <StyledTableHeadCell>
        <Icon path={mdiDragVertical} size={1} color={'rgb(102, 102, 102)'}/>
      </StyledTableHeadCell>
      <StyledTableHeadCell>
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.name_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.position_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.birthday_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.gender_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.email_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.phone_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.role_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
        {t('views.user_page.right_part.users_table.table_main.table_header_row.status_cell')}
      </StyledTableHeadCell>
      <StyledTableHeadCell>
      </StyledTableHeadCell>
    </StyledTableHeadRow>
  )
}

export default TableHeaderRow;
