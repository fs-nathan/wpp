import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';

function RoleManager({ 
  open, setOpen, 
  userRoles, 
  handleDeleteUserRole, handleOpenModal,
}) {

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Quản lý vai trò'
      confirmRender={null}
      cancleRender={() => 'Thoát'}
      loading={userRoles.loading}
    >
      {userRoles.error !== null 
        ? <ErrorBox />
        : <SimpleManagerTable 
            data={userRoles.userRoles}
            handleAdd={() => handleOpenModal('CREATE')}
            handleEdit={userRole => handleOpenModal('UPDATE', {
              updatedUserRole: userRole,
            })}
            handleDelete={userRole => handleOpenModal('ALERT', {
              content: 'Bạn chắc chắn muốn xóa vai trò?',
              onConfirm: () => handleDeleteUserRole(userRole),
            })}
          />
      }
    </CustomModal>
  )
}

export default RoleManager;