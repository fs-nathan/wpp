import { deleteUserRole } from "actions/userRole/deleteUserRole";
import { listUserRole } from "actions/userRole/listUserRole";
import AlertModal from "components/AlertModal";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { RoleManagerContent, RoleManagerContext, RoleManagerModalWrapper } from "./presenters";
import RoleCreateAndUpdateModal from "./RoleCreateAndUpdate";
import { userRolesSelector } from "./selectors";

function RoleManager({ open, setOpen, userRoles, doDeleteUserRole, doListUserRole, children }) {

  React.useEffect(() => {
    if (open) doListUserRole();
    // eslint-disable-next-line
  }, [open]);

  const [openCAU, setOpenCAU] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case "CREATE": {
        setOpenCAU(true);
        setCAUProps({});
        return;
      }
      case "UPDATE": {
        setOpenCAU(true);
        setCAUProps(props);
        return;
      }
      case "ALERT": {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default:
        return;
    }
  }

  return (
    <>
      <RoleManagerContext.Provider
        value={{
          open,
          setOpen,
          userRoles,
          handleDeleteUserRole: (userRole) =>
            doDeleteUserRole({
              userRoleId: get(userRole, "id"),
            }),
          handleOpenModal: doOpenModal,
        }}
      >
        {children}
      </RoleManagerContext.Provider>
      <RoleCreateAndUpdateModal
        open={openCAU}
        setOpen={setOpenCAU}
        {...CAUProps}
      />
      <AlertModal open={openAlert} setOpen={setOpenAlert} {...alertProps} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userRoles: userRolesSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doDeleteUserRole: ({ userRoleId }) =>
      dispatch(deleteUserRole({ userRoleId })),
    doListUserRole: (quite) =>
      dispatch(listUserRole(quite)),
  };
};
export const RoleManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleManager);
export default (props) => (
  <RoleManagerContainer {...props}>
    <RoleManagerModalWrapper>
      <RoleManagerContent />
    </RoleManagerModalWrapper>
  </RoleManagerContainer>
);
