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
        updatePendings={userRoles.updatePendings}
        deletePendings={userRoles.deletePendings}
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
      <SimpleManagerTable
        data={userRoles.userRoles}
        updatePendings={userRoles.updatePendings}
        deletePendings={userRoles.deletePendings}
        handleAdd={() => handleOpenModal("CREATE")}
        handleEdit={(userRole) =>
          handleOpenModal("UPDATE", {
            updatedUserRole: userRole,
          })
        }
        handleDelete={(userRole) =>
          handleOpenModal("ALERT", {
            selectedUserRole: userRole,
          })
        }
      />
    </CustomModal>
  );
}

export default RoleManagerModalWrapper;
