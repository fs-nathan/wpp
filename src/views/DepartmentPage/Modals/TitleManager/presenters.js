import React from 'react';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function TitleManager({
  open, setOpen,
  positions,
  handleDeletePosition, handleOpenModal
}) {

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Quản lý chức danh'
      confirmRender={null}
      cancleRender={() => 'Thoát'}
      loading={positions.loading}
    >
      {positions.error !== null
        ? <ErrorBox />
        : <SimpleManagerTable
          data={positions.positions}
          pendings={positions.pendings}
          handleAdd={() => handleOpenModal('CREATE')}
          handleEdit={position => handleOpenModal('UPDATE', {
            updatedPosition: position,
          })}
          handleDelete={position => handleOpenModal('ALERT', {
            content: 'Bạn chắc chắn muốn xóa chức danh?',
            onConfirm: () => handleDeletePosition(position),
          })}
        />
      }
    </CustomModal>
  )
}

export default TitleManager;
