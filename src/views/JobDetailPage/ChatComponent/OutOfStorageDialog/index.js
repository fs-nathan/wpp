import { Dialog, IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import './styles.scss';

function OutOfStorageDialog({ isOpen, setOpen }) {

  function onClickClose() {
    setOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      className="OutOfStorageDialog">
      <IconButton className="OutOfStorageDialog--iconButton"
        onClick={onClickClose}>
        <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
      </IconButton>
      <img src="/images/wcloud_limit.png" alt='limit'></img>
      Dung lượng lưu trữ của bạn đã hết
      <br />
        Vui lòng nâng cấp hoặc liên hệ Quản trị viên
      <br />
      <div className="OutOfStorageDialog--footer">
        Lưu trữ đám mây W+ Cloud an toàn và tiết kiệm
        </div>
    </Dialog>
  )
}

export default OutOfStorageDialog