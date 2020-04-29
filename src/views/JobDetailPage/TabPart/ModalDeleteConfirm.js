import { useTranslation } from 'react-i18next';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDeleteConfirm({
  isOpen,
  handleCloseModalDelete,
  confirmDelete,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseModalDelete}
      >
        <DialogTitle>{"Thông báo hệ thống"}</DialogTitle>
        <DialogContent>
          <DialogContentText >{t('LABEL_CHAT_TASK_BAN_CO_CHAC_MUON_XOA_KHONG')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} style={{ color: "#222" }}>{t('LABEL_CHAT_TASK_HUY')}</Button>
          <Button
            color="primary" autoFocus
            onClick={() => {
              confirmDelete()
              handleCloseModalDelete()
            }} >{t('LABEL_CHAT_TASK_XOA')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}