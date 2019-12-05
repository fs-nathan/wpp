import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, ButtonBase,
} from '@material-ui/core';
import { 
  lighten,
} from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorTypo from '../ColorTypo';
import colorPal from '../../helpers/colorPalette';
import PropTypes from 'prop-types';

const StyledScrollbars = styled(Scrollbars)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  min-height: 450px;
  & > div:nth-child(3) {
    z-index: 999;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
  & > input[type=file] {
    display: none;
  }
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
`;

const ActionsAcceptButton = styled(({ disabled, ...props }) => <ButtonBase disabled={disabled} {...props} />)`
  padding: 8px 16px;
  background-color: ${colorPal['green'][1]};
  &:hover {
    background-color: ${lighten(colorPal['green'][0], 0.9)};
  }
  color: ${props => props.disabled ? `${lighten(colorPal['green'][0], 0.5)}` : `${colorPal['green'][0]}`};
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
  background-color: ${colorPal['gray'][1]};
  &:hover {
    background-color: ${lighten(colorPal['gray'][0], 0.9)};
  }
  color: ${colorPal['gray'][0]};
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
    overflow: hidden;
    min-width: 600px;
  }
`;

const TwoColumnsContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 3fr;
  & > * {
    &:first-child {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

function OneColumn({ children, }) {
  return (
    <StyledScrollbars
      autoHide
      autoHideTimeout={500}
    >
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledScrollbars>
  );
}

function TwoColumns({ left, right }) {
  return (
    <TwoColumnsContainer>
      <StyledScrollbars
        autoHide
        autoHideTimeout={500}
      >
        <StyledDialogContent>
          {left}
        </StyledDialogContent>
      </StyledScrollbars>
      <StyledScrollbars
        autoHide
        autoHideTimeout={500}
      >
        <StyledDialogContent>
          {right}
        </StyledDialogContent>
      </StyledScrollbars>
    </TwoColumnsContainer>
  );
}

function CustomModal({ 
  title, 
  columns = 1, 
  children = null, left = null, right = null, 
  canConfirm = true, 
  onConfirm = () => null, onCancle = () => null, 
  open, setOpen, 
  maxWidth='md', fullWidth = false,
}) {

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
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>{title}</ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
        </IconButton>
      </StyledDialogTitle>
      {columns === 1 && (
        <OneColumn children={children} />
      )}
      {columns === 2 && (
        <TwoColumns left={left} right={right} />
      )}
      <StyledDialogActions>
        <ActionsCancleButton onClick={() => handleCancle()}>
          Hủy
        </ActionsCancleButton>
        <ActionsAcceptButton disabled={!canConfirm} onClick={() => handleConfirm()}>
          Hoàn thành
        </ActionsAcceptButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

CustomModal.propTypes = {
  title: PropTypes.string.isRequired, 
  columns: PropTypes.number,
  children: PropTypes.node,
  left: PropTypes.node,
  right: PropTypes.node, 
  onConfirm: PropTypes.func, 
  onCancle: PropTypes.func, 
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired,
};

export default CustomModal;
