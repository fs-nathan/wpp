import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import RoleCreateAndUpdateModal from './RoleCreateAndUpdate';
import { listUserRole } from '../../../../actions/userRole/listUserRole';
import { deleteUserRole } from '../../../../actions/userRole/deleteUserRole';
import { connect } from 'react-redux'; 
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { get } from 'lodash';

function RoleManager({ open, setOpen, listUserRole, doDeleteUserRole }) {

  const { data: { userRoles }, loading, error } = listUserRole;
  const [openCAU, setOpenCAU] = React.useState(0);
  const [updatedUserRole, setUpdatedUserRole] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [delUserRole, setDelUserRole] = React.useState();

  function handleSelectedUserRole(selectedRole) {
    setUpdatedUserRole(selectedRole);
    setOpenCAU(selectedRole ? 1 : 2);
  }

  function handleDeleteUserRole(userRole) {
    doDeleteUserRole({
      userRoleId: get(userRole, 'id'),
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
          <SimpleManagerTable 
            data={userRoles}
            handleAdd={() => handleSelectedUserRole(null)}
            handleEdit={userRole => handleSelectedUserRole(userRole)}
            handleDelete={userRole => {
              setDelUserRole(userRole)
              setAlert(true)
            }}
          />
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
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doDeleteUserRole: ({ userRoleId }) => dispatch(deleteUserRole({ userRoleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleManager);
