import { Button, Dialog, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import ColorTypo from 'components/ColorTypo';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

function DialogWrap({
  title,
  isOpen,
  isLoading,
  handleClickClose,
  onClickSuccess,
  successLabel = 'Hoàn Thành',
  children,
  isDisableSubmit,
  className,
  ...rest
}) {
  const { t } = useTranslation();
  const groupActiveColor = useSelector(currentColorSelector)
  return (
    <Dialog
      fullWidth
      scroll="body"
      {...rest} className={clsx("dialogWrap", className)} aria-labelledby="customized-dialog-title" open={isOpen} >
      <DialogTitle disableTypography >
        <ColorTypo className="dialogWrap--title" >{title}</ColorTypo>
        <IconButton aria-label="close" className="dialogWrap--closeButton" onClick={handleClickClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className="dialogWrap--container">
        {children}
      </div>
    </Dialog >
  )
}

export default DialogWrap;