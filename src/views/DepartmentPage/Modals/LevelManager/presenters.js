import React from 'react';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function LevelManager({
  open, setOpen,
  levels,
  handleDeleteLevel,
  handleOpenModal,
}) {

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Quản lý trình độ'
      confirmRender={null}
      cancleRender={() => 'Thoát'}
      loading={levels.loading}
    >
      {levels.error !== null
        ? <ErrorBox />
        : <SimpleManagerTable
          data={levels.levels}
          pendings={levels.pendings}
          handleAdd={() => handleOpenModal('CREATE')}
          handleEdit={level => handleOpenModal('UPDATE', {
            updatedLevel: level,
          })}
          handleDelete={level => handleOpenModal('ALERT', {
            content: 'Bạn chắc chắn muốn xóa trình độ?',
            onConfirm: () => handleDeleteLevel(level),
          })}
        />
      }
    </CustomModal>
  )
};

export default LevelManager;
