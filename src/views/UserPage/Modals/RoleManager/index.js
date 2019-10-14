import React from 'react';
import styled from 'styled-components';
import { 
  Slide, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, TableCell,
  Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import ColorChip from '../../../../components/ColorChip';
import RoleCreateAndUpdateModal from './RoleCreateAndUpdate';
import { listUserRole } from '../../../../actions/userRole/listUserRole';
import { deleteUserRole } from '../../../../actions/userRole/deleteUserRole';
import { connect } from 'react-redux'; 
import { CustomEventListener, CustomEventDispose, CREATE_USER_ROLE, UPDATE_USER_ROLE, DELETE_USER_ROLE } from '../../../../constants/events';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import _ from 'lodash';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
}); 

function RoleManager({ open, setOpen, listUserRole, doListUserRole, deleteUserRole, doDeleteUserRole }) {

  const { data: { userRoles }, loading: listUserRoleLoading, error: listUserRoleError } = listUserRole;
  const { loading: deleteUserRoleLoading, error: deleteUserRoleError } = deleteUserRole;
  const loading = listUserRoleLoading || deleteUserRoleLoading;
  const error = listUserRoleError || deleteUserRoleError;
  const [openCAU, setOpenCAU] = React.useState(0);
  const [updatedUserRole, setUpdatedUserRole] = React.useState(null);

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
      <Dialog
        maxWidth='sm'
        fullWidth
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
      >
        <StyledDialogTitle id="alert-dialog-slide-title">
          <ColorTypo uppercase>Quản lý vai trò</ColorTypo>
          <IconButton onClick={() => setOpen(0)}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
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
                        <ColorChip onClick={() => handleSelectedUserRole(userRole)} label='Sửa' color='green' size='small' badge />
                        <ColorChip onClick={() => handleDeleteUserRole(userRole)} label='Xóa' color='red' size='small' badge />
                      </div>
                    </TableCellChipsWrapper>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          )}
        </StyledDialogContent>
        <DialogActions>
          <ColorButton onClick={() => setOpen(0)} variant='text' variantColor='green'>
            Xong
          </ColorButton>
        </DialogActions>
      </Dialog>
      <RoleCreateAndUpdateModal updatedUserRole={updatedUserRole} open={openCAU !== 0} setOpen={setOpenCAU} />
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
