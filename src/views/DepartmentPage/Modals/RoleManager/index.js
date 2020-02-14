import React from 'react';
import AlertModal from '../../../../components/AlertModal';
import RoleCreateAndUpdateModal from './RoleCreateAndUpdate';
import { deleteUserRole } from '../../../../actions/userRole/deleteUserRole';
import { connect } from 'react-redux'; 
import { get } from 'lodash';
import { userRolesSelector } from './selectors';
import RoleManagerPresenter from './presenters';

function RoleManager({ open, setOpen, userRoles, doDeleteUserRole }) {

  const [openCAU, setOpenCAU] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCAU(true);
        setCAUProps({});
        return;
      }
      case 'UPDATE': {
        setOpenCAU(true);
        setCAUProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <RoleManagerPresenter
        open={open}
        setOpen={setOpen}
        userRoles={userRoles} 
        handleDeleteUserRole={userRole => 
          doDeleteUserRole({
            userRoleId: get(userRole, 'id'),
          })
        } 
        handleOpenModal={doOpenModal}
      />
      <RoleCreateAndUpdateModal 
        open={openCAU} 
        setOpen={setOpenCAU} 
        {...CAUProps}
      />
      <AlertModal 
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    userRoles: userRolesSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteUserRole: ({ userRoleId }) => dispatch(deleteUserRole({ userRoleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleManager);
