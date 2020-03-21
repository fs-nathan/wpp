import React from 'react';
import clsx from 'clsx';
import { IconButton, Dialog, Button, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress';
import ColorTypo from 'components/ColorTypo';

import './styles.scss';
import { useTranslation } from 'react-i18next';

function DialogWrap({
  title,
  isOpen,
  isLoading,
  handleClickClose,
  onClickSuccess,
  successLabel = 'Hoàn Thành',
  children,
  maxWidth,
  isDisableSubmit,
  className,
}) {
  const { t } = useTranslation();
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  return (
    <Dialog maxWidth={maxWidth} className={clsx("dialogWrap", className)} aria-labelledby="customized-dialog-title" open={isOpen} >
      <DialogTitle disableTypography >
        <ColorTypo className="dialogWrap--title" >{title}</ColorTypo>
        <IconButton aria-label="close" className="dialogWrap--closeButton" onClick={handleClickClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialogWrap--content" >
        {children}
      </DialogContent>
      <DialogActions>
        <Button className={clsx("dialogWrap--button", "dialogWrap--button__cancel")} autoFocus onClick={handleClickClose} style={{}} >
          {t('IDS_WP_CANCEL')}
        </Button>
        <Button
          className={clsx("dialogWrap--button", { "dialogWrap--button__disabled": isDisableSubmit })}
          onClick={onClickSuccess}
          disabled={isDisableSubmit}
          style={{ color: groupActiveColor }}>
          {isLoading && (
            <CircularProgress size={20} className="margin-circular" />
          )}
          {successLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogWrap;