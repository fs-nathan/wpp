import React from 'react';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

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
        loading={majors.loading}
      >
        {majors.error !== null
          ? <ErrorBox />
          : <SimpleManagerTable
            data={majors.majors}
            pendings={majors.pendings}
            handleAdd={() => handleOpenModal('CREATE')}
            handleEdit={major => handleOpenModal('UPDATE', {
              updatedMajor: major,
            })}
            handleDelete={major => handleOpenModal('ALERT', {
              content: 'Bạn chắc chắn muốn xóa chuyên ngành?',
              onConfirm: () => handleDeleteMajor(major)
            })}
          />
        }
      </CustomModal>
    </React.Fragment>
  )
}

export default MajorManager;
