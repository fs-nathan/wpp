import React from 'react';
import './style.scss';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, ButtonBase,
} from '@material-ui/core';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js'; 
import ColorTypo from '../ColorTypo';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

function CustomModal({ open, setOpen, content, onConfirm = () => null, onCancle = () => null, }) {

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
        <ColorTypo uppercase>Thông báo hệ thống</ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
        </IconButton>
      </DialogTitle>
      <DialogContent className='comp_AlertModal___dialog-content'>
        {content}
      </DialogContent>
      <DialogActions className='comp_AlertModal___dialog-actions'>
        <ButtonBase className='comp_AlertModal___cancle-button' onClick={() => handleCancle()}>
          Hủy
        </ButtonBase>
        <ButtonBase className='comp_AlertModal___accept-button' onClick={() => handleConfirm()}>
          Đồng ý
        </ButtonBase>
      </DialogActions>
    </Dialog>
  )
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired, 
  content: PropTypes.node.isRequired, 
  onConfirm: PropTypes.func, 
  onCancle: PropTypes.func,
};

export default CustomModal;
