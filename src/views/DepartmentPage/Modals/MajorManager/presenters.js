import CustomModal from 'components/CustomModal';
import SimpleManagerTable from 'components/SimpleManagerTable';
import React from 'react';
import { useTranslation } from 'react-i18next';

function MajorManager({
  open, setOpen,
  majors,
  handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title={t('DMH.VIEW.DP.MODAL.MAJOR.TITLE')}
        confirmRender={null}
        cancleRender={() => t('DMH.VIEW.DP.MODAL.MAJOR.EXIT')}
        loading={majors.loading}
      >
        <SimpleManagerTable
          data={majors.majors}
          pendings={majors.pendings}
          handleAdd={() => handleOpenModal('CREATE')}
          handleEdit={major => handleOpenModal('UPDATE', {
            updatedMajor: major,
          })}
          handleDelete={major => handleOpenModal('ALERT', {
            selectedMajor: major,
          })}
        />
      </CustomModal>
    </React.Fragment>
  )
}

export default MajorManager;
