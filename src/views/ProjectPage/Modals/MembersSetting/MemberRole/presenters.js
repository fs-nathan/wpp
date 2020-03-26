import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { find, get } from 'lodash';
import React from 'react';
import CustomModal from '../../../../../components/CustomModal';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead
    className={`view_ProjectPage_MemberRoleModal___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = ({ className = '', ...props }) =>
  <TableBody
    className={`view_ProjectPage_MemberRoleModal___table-body ${className}`}
    {...props}
  />;

const StyledTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_ProjectPage_MemberRoleModal___table-cell ${className}`}
    {...props}
  />;

const StyledTable = ({ className = '', ...props }) =>
  <Table
    className={`view_ProjectPage_MemberRoleModal___table ${className}`}
    {...props}
  />;

function MemberRole({
  open, setOpen,
  curMemberId,
  bgColor, userRoles, updateMemberRole, members,
  handleUpdateRoleOfMember, handleOpenModal,
}) {

  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    if (curMemberId) setRoles(get(find(members.members, { id: curMemberId }), 'roles', []));
  }, [curMemberId, members]);

  return (
    <CustomModal
      title={`Vai trò thành viên`}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={evt => "Thoát"}
      loading={userRoles.loading || updateMemberRole.loading || members.loading}
    >
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <TableCell></TableCell>
            <StyledTableCell width='30%'>Tên vai trò</StyledTableCell>
            <StyledTableCell width='50%'>Mô tả vai trò</StyledTableCell>
            <TableCell width='20%'>
              <Button
                style={{
                  backgroundColor: bgColor.color,
                  color: 'white',
                }}
                onClick={evt => handleOpenModal('ROLE')}
                fullWidth
              >
                Quản lý
              </Button>
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {userRoles.userRoles.map(userRole => (
            <TableRow key={get(userRole, 'id')}>
              <TableCell>
                <Checkbox
                  checked={
                    roles
                      .map(role => get(role, 'id'))
                      .includes(get(userRole, 'id'))
                  }
                  onChange={evt => handleUpdateRoleOfMember(userRole)}
                  value={get(userRole, 'name', '')}
                />
              </TableCell>
              <StyledTableCell>
                {get(userRole, 'name')}
              </StyledTableCell>
              <TableCell>
                {get(userRole, 'description')}
              </TableCell>
              <TableCell />
            </TableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </CustomModal>
  )
}

export default MemberRole;