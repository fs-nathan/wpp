import React from 'react';
import { 
  TableCell, Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import { get } from 'lodash';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead 
    className={`view_ProjectGroup_MemberDetailModal___table-head ${className}`}
    {...props}
  />;

const UserTableCell = ({ className = '', ...props }) =>
  <TableCell 
    className={`view_ProjectGroup_MemberDetailModal___table-cell ${className}`}
    {...props}
  />;

function MembersDetail({ open, setOpen, members = [], }) {

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Thành viên nhóm'
        confirmRender={null}
        cancleRender={() => 'Thoát'}
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
          <TableBody>
            {members.map(member => (
              <TableRow key={get(member, 'id')}>
                <TableCell>
                  <CustomAvatar style={{ width: 35, height: 35, }} src={get(member, 'avatar')} alt='avatar' />
                </TableCell>
                <UserTableCell>
                  <span>{get(member, 'name', '')}</span>
                  <br />
                  <small>{get(member, 'email', '')}</small>  
                </UserTableCell>
                <TableCell>{get(member, 'position', '')}</TableCell>
                <TableCell>{get(member, 'description', '')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomModal>
    </React.Fragment>
  )
}

export default MembersDetail;
