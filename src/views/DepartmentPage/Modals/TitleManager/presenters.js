import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';

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
    >
      {positions.loading && <LoadingBox />}
      {positions.error !== null && <ErrorBox />}
      {!positions.loading && positions.error === null && (
        <SimpleManagerTable 
          data={positions.positions}
          handleAdd={() => handleOpenModal('CREATE')}
          handleEdit={position => handleOpenModal('UPDATE', {
            updatedPosition: position,
          })}
          handleDelete={position => handleOpenModal('ALERT', {
            content: 'Bạn chắc chắn muốn xóa chức danh?',
            onConfirm: () => handleDeletePosition(position),
          })}
        />
      )}
    </CustomModal>
  )
}

export default TitleManager;
