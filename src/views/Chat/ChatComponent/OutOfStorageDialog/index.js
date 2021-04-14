import { Dialog, IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function OutOfStorageDialog({ isOpen, setOpen }) {
  const { t } = useTranslation();
  const [isOpenDialog, setOpenDialog] = useState(isOpen);

  function onClickClose() {
    setOpenDialog(false)
  }

  return (
    <Dialog
      open={isOpenDialog}
      className="OutOfStorageDialog">
      <IconButton className="OutOfStorageDialog--iconButton"
        onClick={onClickClose}>
        <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
      </IconButton>
      <img
        className="OutOfStorageDialog--image"
        src="/images/wcloud_limit.png" alt='limit'></img>
      <p className="OutOfStorageDialog--text">
        {t('LABEL_CHAT_TASK_DUNG_LUONG_LUU_TRU')}
      </p>
      <p className="OutOfStorageDialog--text">
        {t('LABEL_CHAT_TASK_VUI_LONG_NANG_CAP')}
      </p>
      <div className="OutOfStorageDialog--footer">
        {t('LABEL_CHAT_TASK_LUU_TRU_DAM_MAY')}
      </div>
    </Dialog>
  )
}

export default OutOfStorageDialog