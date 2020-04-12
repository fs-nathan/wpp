import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function RoleManager({
  open, setOpen,
  userRoles,
  handleDeleteUserRole, handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('DMH.VIEW.DP.MODAL.ROLE.TITLE')}
      confirmRender={null}
      cancleRender={() => t('DMH.VIEW.DP.MODAL.ROLE.EXIT')}
      loading={userRoles.loading}
    >
      {userRoles.error !== null
        ? <ErrorBox />
        : <SimpleManagerTable
          data={userRoles.userRoles}
          pendings={userRoles.pendings}
          handleAdd={() => handleOpenModal('CREATE')}
          handleEdit={userRole => handleOpenModal('UPDATE', {
            updatedUserRole: userRole,
          })}
          handleDelete={userRole => handleOpenModal('ALERT', {
            content: t('DMH.VIEW.DP.MODAL.ROLE.ALERT'),
            onConfirm: () => handleDeleteUserRole(userRole),
          })}
        />
      }
    </CustomModal>
  )
}

export default RoleManager;
