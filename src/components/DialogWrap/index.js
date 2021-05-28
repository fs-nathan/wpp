import {Button, Dialog, Divider, IconButton} from '@material-ui/core';
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
import styled from 'styled-components';

export const StyledDiv = styled.div`
  position: absolute;
  left: 25px;
  .Mui-checked {
    color: ${props => props.selectedColor} !important;
  }
`

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
  isOneButton,
  useScrollbar = true,
  contentMarkShowModal = false,
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
        {useScrollbar && (
          <Scrollbars
            renderView={props => <div {...props} className="dialogWrap--scrollWrap" />}
            autoHide autoHideTimeout={500} autoHideDuration={200}>
            {children}
          </Scrollbars>
        )}
        {!useScrollbar && (
          <>{children}</>
        )}
      </div>
      <Divider/>
      <DialogActions>
        {
          contentMarkShowModal &&
          <StyledDiv selectedColor={groupActiveColor}>
            {contentMarkShowModal()}
          </StyledDiv>
        }
        {!isOneButton && <Button className={clsx("dialogWrap--button", "dialogWrap--button__cancel")} autoFocus onClick={handleClickClose} style={{}} >
          {t('IDS_WP_CANCEL')}
        </Button>}
        <Button
          className={clsx("dialogWrap--button", { "dialogWrap--button__disabled": isDisableSubmit })}
          onClick={onClickSuccess}
          disabled={isDisableSubmit}
          style={{ color: isOneButton ? "#222" : groupActiveColor }}>
          {isLoading && (
            <CircularProgress size={20} className="margin-circular" />
          )}
          {successLabel}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default DialogWrap;