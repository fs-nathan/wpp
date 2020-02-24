import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';

function MajorManager({ 
  open, setOpen, 
  majors, 
  handleDeleteMajor, handleOpenModal, 
}) {

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Quản lý chuyên ngành'
        confirmRender={null}
        cancleRender={() => 'Thoát'}
        onCancle={() => setOpen(0)}
      >
        {majors.loading && <LoadingBox />}
        {majors.error !== null && <ErrorBox />}
        {!majors.loading && majors.error === null && (
          <SimpleManagerTable 
            data={majors.majors}
            handleAdd={() => handleOpenModal('CREATE')}
            handleEdit={major => handleOpenModal('UPDATE', {
              updatedMajor: major,
            })}
            handleDelete={major => handleOpenModal('ALERT', {
              content: 'Bạn chắc chắn muốn xóa chuyên ngành?',
              onConfirm: () => handleDeleteMajor(major)
            })}
          />
        )}
      </CustomModal>
    </React.Fragment>
  )
}

export default MajorManager;
