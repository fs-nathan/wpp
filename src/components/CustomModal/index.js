import React from 'react';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, ButtonBase,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorTypo from '../ColorTypo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import './style.scss';

const StyledScrollbars = ({ className = '', ...props }) => <Scrollbars className={`comp_CustomModal___scrollbar-main ${className}`} {...props} />;

const StyledScrollbarsSide = ({ className = '', ...props }) => <Scrollbars className={`comp_CustomModal___scrollbar-side ${className}`} {...props} />;

const StyledDialogContent = ({ className = '', ...props }) => <DialogContent className={`comp_CustomModal___dialog-content ${className}`} {...props} />;

const StyledDialogTitle = ({ className = '', ...props }) => <DialogTitle className={`comp_CustomModal___dialog-title ${className}`} {...props} />;

const StyledDialogActions = ({ className = '', ...props }) => <DialogActions className={`comp_CustomModal___dialog-actions ${className}`} {...props} />;

const ActionsAcceptButton = ({ className = '' , disabled, ...props }) => 
  <ButtonBase 
    disabled={disabled}
    className={`${disabled ? 'comp_CustomModal___accept-button-disabled' : 'comp_CustomModal___accept-button'} ${className}`} 
    {...props} 
  />;

const ActionsCancleButton = ({ className = '', ...props }) => <ButtonBase className={`comp_CustomModal___cancle-button ${className}`} {...props} />;

const StyledDialog = ({ className = '', ...props }) => <Dialog className={`comp_CustomModal___dialog ${className}`} {...props} />;

const TwoColumnsContainer = ({ maxWidth, className = '', ...rest }) => 
  <div 
    className={`${maxWidth === 'lg' 
      ? 'comp_CustomModal___two-columns-container-w-lg'
      : 'comp_CustomModal___two-columns-container-w-md'} ${className}`} 
    {...rest} 
  />;

const LeftHeader = ({ className = '', ...props }) => <ColorTypo bold uppercase className={`comp_CustomModal___header-left ${className}`} {...props} />;

const RightHeader = ({ className = '', ...props }) => <ColorTypo bold uppercase className={`comp_CustomModal___header-right ${className}`} {...props} />;

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

function TwoColumns({ maxWidth, left, right }) {
  return (
    <TwoColumnsContainer maxWidth={maxWidth}>
      <div>
        <LeftHeader>
          {get(left, 'title', '')}
        </LeftHeader>
        <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
        >
          <div>
            {get(left, 'content', () => '')()}
          </div>
        </StyledScrollbarsSide>
      </div>
      <div>
        <RightHeader>
          {get(right, 'title', '')}
        </RightHeader>
        <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
        >
          <div>
            {get(right, 'content', () => '')()}
          </div>
        </StyledScrollbarsSide>
      </div>
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
  className = '',
  colors,
}) {

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
    <StyledDialog
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
      className={className}
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
        <TwoColumns maxWidth={maxWidth} left={left} right={right} />
      )}
      <StyledDialogActions>
        <ActionsCancleButton onClick={() => handleCancle()}>
          Hủy
        </ActionsCancleButton>
        <ActionsAcceptButton style={{ color: bgColor.value }} disabled={!canConfirm} onClick={() => handleConfirm()}>
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
  left: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.func.isRequired,
  }),
  right: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.func.isRequired,
  }), 
  onConfirm: PropTypes.func, 
  onCancle: PropTypes.func, 
  open: PropTypes.bool.isRequired, 
  setOpen: PropTypes.func.isRequired
};

export default connect(state => ({
    colors: state.setting.colors
  }),
  {},
)(CustomModal);
