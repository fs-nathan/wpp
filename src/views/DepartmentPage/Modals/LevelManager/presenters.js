import CustomModal from 'components/CustomModal';
import SimpleManagerTable from 'components/SimpleManagerTable';
import React from 'react';
import { useTranslation } from 'react-i18next';

function LevelManager({
  open, setOpen,
  levels,
  handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('DMH.VIEW.DP.MODAL.LEVEL.TITLE')}
      confirmRender={null}
      cancleRender={() => t('DMH.VIEW.DP.MODAL.LEVEL.EXIT')}
      loading={levels.loading}
    >
      <SimpleManagerTable
        data={levels.levels}
        pendings={levels.pendings}
        handleAdd={() => handleOpenModal('CREATE')}
        handleEdit={level => handleOpenModal('UPDATE', {
          updatedLevel: level,
        })}
        handleDelete={level => handleOpenModal('ALERT', {
          selectedLevel: level,
        })}
      />
    </CustomModal>
  )
};

export default LevelManager;
