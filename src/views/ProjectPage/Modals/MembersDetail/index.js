import React from 'react';
import styled from 'styled-components';
import { 
  TableCell, Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import colorPal from '../../../../helpers/colorPalette';
import { get } from 'lodash';

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
`;

const UserTableCell = styled(TableCell)`
  & > span {
    color: ${colorPal['green'][0]};
  }
  & > small {
    color: ${colorPal['gray'][0]};
  }
`;

function MembersDetail({ open, setOpen, members, }) {

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Thành viên nhóm'
        onCancle={() => setOpen(false)}
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Thành viên</TableCell>
              <TableCell>Chức danh</TableCell>
              <TableCell>Mô tả</TableCell>
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {members.map(member => (
              <TableRow key={get(member, 'id')}>
                <TableCell>
                  <CustomAvatar src={get(member, 'avatar')} alt='avatar' />
                </TableCell>
                <UserTableCell>
                  <span>{get(member, 'name', '')}</span>
                  <small>{get(member, 'email', '')}</small>  
                </UserTableCell>
                <TableCell>{get(member, 'position', '')}</TableCell>
                <TableCell>{get(member, 'description', '')}</TableCell>
              </TableRow>
            ))}
          </StyledTableBody>
        </Table>
      </CustomModal>
    </React.Fragment>
  )
}

export default MembersDetail;
