import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';

function MajorManager({
  open, setOpen,
  majors,
  handleDeleteMajor, handleOpenModal,
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
              content: t('DMH.VIEW.DP.MODAL.MAJOR.ALERT'),
              onConfirm: () => handleDeleteMajor(major)
            })}
          />
        }
      </CustomModal>
    </React.Fragment>
  )
}

export default MajorManager;
