import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const {
    open,
    userRoles,
    setOpen,
    handleOpenModal,
    handleDeleteUserRole,
  } = useContext(RoleManagerContext);
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t("DMH.VIEW.DP.MODAL.ROLE.TITLE")}
      confirmRender={null}
      cancleRender={() => t("DMH.VIEW.DP.MODAL.ROLE.EXIT")}
      loading={userRoles.loading}
    >
      {userRoles.error !== null ? (
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
              content: t("DMH.VIEW.DP.MODAL.ROLE.ALERT"),
              onConfirm: () => handleDeleteUserRole(userRole),
            })
          }
        />
      )}
    </CustomModal>
  );
}

export default RoleManagerModalWrapper;
