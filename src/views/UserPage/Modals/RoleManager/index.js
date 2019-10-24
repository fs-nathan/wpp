import React from 'react';
import styled from 'styled-components';
import { 
  TableCell, Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import ColorButton from '../../../../components/ColorButton';
import CustomModal from '../../../../components/CustomModal';
import PillButton from '../../../../components/PillButton';
import AlertModal from '../../../../components/AlertModal';
import colorPal from '../../../../helpers/colorPalette';
import RoleCreateAndUpdateModal from './RoleCreateAndUpdate';
import { listUserRole } from '../../../../actions/userRole/listUserRole';
import { deleteUserRole } from '../../../../actions/userRole/deleteUserRole';
import { connect } from 'react-redux'; 
import { CustomEventListener, CustomEventDispose, CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE } from '../../../../constants/events';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import _ from 'lodash';

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
  && > *:last-child {
    border-bottom: none;
  }
`;

const TableCellChipsWrapper = styled(TableCell)`
  & > div {
    display: flex;
    align-items: center;
    & > *:last-child {
      margin-left: 8px;
    }
  }
`;

function RoleManager({ open, setOpen, listUserRole, doListUserRole, deleteUserRole, doDeleteUserRole }) {

  const { data: { userRoles }, loading: listUserRoleLoading, error: listUserRoleError } = listUserRole;
  const { loading: deleteUserRoleLoading, error: deleteUserRoleError } = deleteUserRole;
  const loading = listUserRoleLoading || deleteUserRoleLoading;
  const error = listUserRoleError || deleteUserRoleError;
  const [openCAU, setOpenCAU] = React.useState(0);
  const [updatedUserRole, setUpdatedUserRole] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [delUserRole, setDelUserRole] = React.useState();

  React.useEffect(() => {
    doListUserRole();
  }, [doListUserRole]);

  React.useEffect(() => {
    const doListUserRoleHandler = () => {
      doListUserRole();
    };

    CustomEventListener(CREATE_USER_ROLE, doListUserRoleHandler);
    CustomEventListener(UPDATE_USER_ROLE, doListUserRoleHandler);
    CustomEventListener(DELETE_USER_ROLE, doListUserRoleHandler);

    return () => {
      CustomEventDispose(CREATE_USER_ROLE, doListUserRoleHandler);
      CustomEventDispose(UPDATE_USER_ROLE, doListUserRoleHandler);
      CustomEventDispose(DELETE_USER_ROLE, doListUserRoleHandler);
    }
  }, [doListUserRole]);

  function handleSelectedUserRole(selectedRole) {
    setUpdatedUserRole(selectedRole);
    setOpenCAU(selectedRole ? 1 : 2);
  }

  function handleDeleteUserRole(userRole) {
    doDeleteUserRole({
      userRoleId: _.get(userRole, 'id'),
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Quản lý vai trò'
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>Tên vai trò</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>
                  <ColorButton variantColor='orange' size='small' variant='contained'
                    onClick={() => handleSelectedUserRole(null)}
                  >
                    + Thêm mới
                  </ColorButton>
                </TableCell>
              </TableRow>
            </StyledTableHead>
            <StyledTableBody>
              {userRoles.map(userRole => (
                <TableRow key={_.get(userRole, 'id')}>
                  <TableCell>{_.get(userRole, 'name', '')}</TableCell>
                  <TableCell>{_.get(userRole, 'description', '')}</TableCell>
                  <TableCellChipsWrapper>
                    <div>
                      <PillButton 
                        onClick={() => handleSelectedUserRole(userRole)}
                        background={colorPal['green'][0]}
                        text={colorPal['green'][1]}
                        size='small' 
                      >
                        Sửa
                      </PillButton>
                      <PillButton 
                        onClick={() => {
                          setDelUserRole(userRole)
                          setAlert(true)
                        }}
                        background={colorPal['red'][0]}
                        text={colorPal['red'][1]}
                        size='small' 
                      >
                        Xóa
                      </PillButton>
                    </div>
                  </TableCellChipsWrapper>
                </TableRow>
              ))}
            </StyledTableBody>
          </Table>
        )}
      </CustomModal>
      <RoleCreateAndUpdateModal updatedUserRole={updatedUserRole} open={openCAU !== 0} setOpen={setOpenCAU} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa vai trò?'
        onConfirm={() => handleDeleteUserRole(delUserRole)}
      />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listUserRole: state.userRole.listUserRole,
    deleteUserRole: state.userRole.deleteUserRole,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListUserRole: () => dispatch(listUserRole()),
    doDeleteUserRole: ({ userRoleId }) => dispatch(deleteUserRole({ userRoleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleManager);
