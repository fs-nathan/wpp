import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function LevelManager({
  open, setOpen,
  levels,
  handleDeleteLevel,
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
            content: t('DMH.VIEW.DP.MODAL.LEVEL.ALERT'),
            onConfirm: () => handleDeleteLevel(level),
          })}
        />
      }
    </CustomModal>
  )
};

export default LevelManager;
