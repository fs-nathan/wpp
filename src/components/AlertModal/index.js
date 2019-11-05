import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, ButtonBase,
} from '@material-ui/core';
import { 
  lighten,
} from '@material-ui/core/styles';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js'; 
import ColorTypo from '../ColorTypo';
import colorPal from '../../helpers/colorPalette';

const StyledDialogContent = styled(DialogContent)`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #f5f8fc;
  padding: 6px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  padding: 15px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const ActionsAcceptButton = styled(ButtonBase)`
  padding: 8px 16px;
  background-color: ${colorPal['green'][1]};
  &:hover {
    background-color: ${lighten(colorPal['green'][0], 0.9)};
  }
  color: ${colorPal['green'][0]};
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 5px;
  & > span:last-child {
    display: none;
  }
`;

const ActionsCancleButton = styled(ButtonBase)`
  padding: 8px 16px;
  background-color: #fff;
  &:hover {
    background-color: #eee;
  }
  color: #222;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 5px;
  & > span:last-child {
    display: none;
  }
`;

const StyledDialog = styled(Dialog)`
  & > div:nth-child(3) > div {
    min-width: 300px;
  }
`;

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
    <StyledDialog
      maxWidth='sm'
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>Thông báo hệ thống</ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {content}
      </StyledDialogContent>
      <StyledDialogActions>
        <ActionsAcceptButton onClick={() => handleConfirm()}>
          Đồng ý
        </ActionsAcceptButton>
        <ActionsCancleButton onClick={() => handleCancle()}>
          Hủy
        </ActionsCancleButton>
      </StyledDialogActions>
    </StyledDialog>
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
