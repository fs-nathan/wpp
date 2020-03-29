import { ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ColorTypo from '../ColorTypo';
import './style.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});

function AlertModal({
  open, setOpen,
  content = '', onConfirm = () => null, onCancle = () => null,
  colors
}) {

  const { t } = useTranslation();
  const bgColor = colors.find(item => item.selected === true);

  function handleCancle() {
    setOpen(false);
    onCancle();
  }

  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <Dialog
      className='comp_AlertModal___dialog'
      maxWidth='sm'
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
    >
      <DialogTitle className='comp_AlertModal___dialog-title' id="alert-dialog-slide-title">
        <ColorTypo uppercase>{t('DMH.COMP.ALERT_MODAL.TITLE')}</ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
        </IconButton>
      </DialogTitle>
      <DialogContent className='comp_AlertModal___dialog-content'>
        {content}
      </DialogContent>
      <DialogActions className='comp_AlertModal___dialog-actions'>
        <ButtonBase className='comp_AlertModal___cancle-button' onClick={() => handleCancle()}>
          {t('DMH.COMP.ALERT_MODAL.CANCLE_BTN')}
        </ButtonBase>
        <ButtonBase style={{ color: bgColor.color }} className='comp_AlertModal___accept-button' onClick={() => handleConfirm()}>
          {t('DMH.COMP.ALERT_MODAL.ACCEPT_BTN')}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  )
}

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  onConfirm: PropTypes.func,
  onCancle: PropTypes.func,
};

export default connect(state => ({
  colors: state.setting.colors
}),
  {},
)(AlertModal);