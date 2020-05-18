import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import { useTranslation } from 'react-i18next';
import JobDetailModalWrap from '../JobDetailModalWrap';

export default function ModalDeleteConfirm({
  isOpen,
  handleCloseModalDelete,
  confirmDelete,
}) {
  const { t } = useTranslation();

  const onConfirm = () => {
    confirmDelete()
    handleCloseModalDelete()
  }

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_THONG_BAO_HE_THONG')}
      open={isOpen}
      setOpen={handleCloseModalDelete}
      confirmRender={() => t('LABEL_CHAT_TASK_DONG_Y')}
      onConfirm={onConfirm}
      cancleRender={() => t('LABEL_CHAT_TASK_HUY')}
      maxWidth='sm'
      className="modal_height_20vh"
    >
      <DialogContentText >{t('LABEL_CHAT_TASK_BAN_CO_CHAC_MUON_XOA_KHONG')}</DialogContentText>
    </JobDetailModalWrap>
  );
}