import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function TitleManager({
  open, setOpen,
  positions,
  handleOpenModal
}) {

  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('DMH.VIEW.DP.MODAL.TITLE.TITLE')}
      confirmRender={null}
      cancleRender={() => t('DMH.VIEW.DP.MODAL.TITLE.EXIT')}
      loading={positions.loading}
    >
      <SimpleManagerTable
        data={positions.positions}
        updatePendings={positions.updatePendings}
        deletePendings={positions.deletePendings}
        handleAdd={() => handleOpenModal('CREATE')}
        handleEdit={position => handleOpenModal('UPDATE', {
          updatedPosition: position,
        })}
        handleDelete={position => handleOpenModal('ALERT', {
          selectedPosition: position,
        })}
      />
    </CustomModal>
  )
}

export default TitleManager;
