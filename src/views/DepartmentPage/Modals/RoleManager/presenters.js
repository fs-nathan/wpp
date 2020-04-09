import React, { useContext } from "react";
import CustomModal from "../../../../components/CustomModal";
import ErrorBox from "../../../../components/ErrorBox";
import SimpleManagerTable from "../../../../components/SimpleManagerTable";
export const RoleManagerContext = React.createContext({});
export const RoleManagerContent = () => {
  const { userRoles, handleOpenModal, handleDeleteUserRole } = useContext(
    RoleManagerContext
  );
  return userRoles.error !== null ? (
    <ErrorBox />
  ) : (
    <SimpleManagerTable
      data={userRoles.userRoles}
      pendings={userRoles.pendings}
      handleAdd={() => handleOpenModal("CREATE")}
      handleEdit={(userRole) =>
        handleOpenModal("UPDATE", {
          updatedUserRole: userRole,
        })
      }
      handleDelete={(userRole) =>
        handleOpenModal("ALERT", {
          content: "Bạn chắc chắn muốn xóa vai trò?",
          onConfirm: () => handleDeleteUserRole(userRole),
        })
      }
    />
  );
};
export function RoleManagerModalWrapper({ children }) {
  const { open, userRoles, setOpen } = useContext(RoleManagerContext);
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Quản lý vai trò"
      confirmRender={null}
      cancleRender={() => "Thoát"}
      loading={userRoles.loading}
    >
      {children}
    </CustomModal>
  );
}

export default RoleManagerModalWrapper;
