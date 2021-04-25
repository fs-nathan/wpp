import { ButtonBase, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton, Typography } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import Scrollbars from 'components/Scrollbars';
import { get, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ColorTypo from '../ColorTypo';
import LoadingOverlay from '../LoadingOverlay';
import './style.scss';

const StyledScrollbars = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-main-${height} ${className}`} {...props} />;

const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;

const StyledDialogContent = ({ className = '', ...props }) => <DialogContent className={`comp_CustomModal___dialog-content ${className}`} {...props} />;

const StyledDialogTitle = ({ className = '', ...props }) => <DialogTitle className={`comp_CustomModal___dialog-title ${className}`} {...props} />;

const StyledDialogActions = ({ className = '', ...props }) => <DialogActions className={`comp_CustomModal___dialog-actions ${className}`} {...props} />;

const ActionsAcceptButton = ({ className = '', disabled, ...props }) =>
  <ButtonBase
    disabled={disabled}
    
    className={`${disabled ? 'comp_CustomModal___accept-button-disabled' : 'comp_CustomModal___accept-button'} ${className}`}
    {...props}
  />;

const ActionsCancleButton = ({ className = '', ...props }) => <ButtonBase className={`comp_CustomModal___cancle-button ${className}`} {...props} />;

const StyledDialog = ({ className = '', maxWidth = 'md', ...props }) =>
  <Dialog className={clsx({
    'comp_CustomModal___dialog-lg': maxWidth === 'lg',
    'comp_CustomModal___dialog-md': maxWidth === 'md',
    'comp_CustomModal___dialog-sm': maxWidth === 'sm',
  }, className)}
    {...props}
  />;

const TwoColumnsContainer = ({ maxWidth, className = '', ...rest }) =>
  <div
    className={`${maxWidth === 'lg'
      ? 'comp_CustomModal___two-columns-container-w-lg'
      : 'comp_CustomModal___two-columns-container-w-md'} ${className}`}
    {...rest}
  />;

export const Title = ({ className = '', ...props }) =>
  <Typography
    className={`comp_CustomModal___typo ${className}`}
    {...props}
  />

const LeftHeader = ({ className = '', ...props }) => <ColorTypo bold uppercase className={`comp_CustomModal___header-left ${className}`} {...props} />;

const RightHeader = ({ className = '', ...props }) => <ColorTypo bold uppercase className={`comp_CustomModal___header-right ${className}`} {...props} />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});

function OneColumn({ children, height, }) {
  return (
    <StyledScrollbars
      autoHide
      autoHideTimeout={500}
      height={height}
      className="comp_CustomModal___scroll"
    >
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledScrollbars>
  );
}

function TwoColumns({ maxWidth, left, right, height, }) {
  return (
    <TwoColumnsContainer maxWidth={maxWidth}>
      <div>
        {isFunction(get(left, 'title'))
          ? get(left, 'title')()
          : <LeftHeader>
            {get(left, 'title')}
          </LeftHeader>
        }
        <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={height}
        >
          <div>
            {get(left, 'content', () => '')()}
          </div>
        </StyledScrollbarsSide>
      </div>
      <div>
        {isFunction(get(right, 'title'))
          ? get(right, 'title')()
          : <RightHeader>
            {get(right, 'title')}
          </RightHeader>
        }
        <StyledScrollbarsSide
          autoHide
          autoHideTimeout={500}
          height={height}
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
  loading = false,
  actionLoading = false,
  activeLoading = false,
  title,
  titleRender = null,
  columns = 1,
  children = null, left = null, right = null,
  canConfirm = true,
  confirmRender = undefined, onConfirm = () => null,
  cancleRender = undefined, onCancle = () => null,
  open, setOpen,
  maxWidth = 'md', fullWidth = false,
  height = 'medium',
  className = '',
  manualClose = false,
  type = "button",
  form= null,
}) {
  const colors = useSelector(state => state.setting.colors)

  const { t } = useTranslation();
  const bgColor = colors.find(item => item.selected === true);

  function handleCancle() {
    !manualClose && setOpen(false);
    onCancle && onCancle();
  }

  function handleConfirm() {
    !manualClose && setOpen(false);
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
      className={clsx(className, "comp_CustomModal")}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <StyledDialogTitle className={clsx({ "comp_CustomModal__renderTitle": titleRender !== null })} id="alert-dialog-slide-title">
        {
          titleRender || <ColorTypo uppercase>{title}</ColorTypo>
        }
        <IconButton className="comp_CustomModal___iconButton" onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
        </IconButton>
      </StyledDialogTitle>
      <LoadingOverlay
        active={loading}
        spinner
        fadeSpeed={100}
      >
        {columns === 1 && (
          <OneColumn
            children={children}
            height={height}
          />
        )}
        {columns === 2 && (
          <TwoColumns
            maxWidth={maxWidth}
            left={left}
            right={right}
            height={height}
          />
        )}
      </LoadingOverlay>
      <StyledDialogActions>
        {cancleRender !== null && (
          <ActionsCancleButton onClick={() => handleCancle()}>
            {isFunction(cancleRender) ? cancleRender() : t('DMH.COMP.CUSTOM_MODAL.CANCLE')}
          </ActionsCancleButton>
        )}
        {confirmRender !== null && (
          <ActionsAcceptButton
            style={{ color: bgColor.color, opacity: !canConfirm || actionLoading || activeLoading ? 0.5 : 1 }}
            disabled={!canConfirm || actionLoading || activeLoading}
            onClick={() => handleConfirm()}
            type={type}
            form={form}
          >
            <CircularProgress
              size={16}
              className="margin-circular"
              style={{
                display: (actionLoading || activeLoading) ? 'initial' : 'none'
              }}
            />
            {isFunction(confirmRender) ? confirmRender() : t('DMH.COMP.CUSTOM_MODAL.CONFIRM')}
          </ActionsAcceptButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  )
}

CustomModal.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.number,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  form: PropTypes.string,
  left: PropTypes.shape({
    title: PropTypes.any.isRequired,
    content: PropTypes.func.isRequired,
  }),
  right: PropTypes.shape({
    title: PropTypes.any.isRequired,
    content: PropTypes.func.isRequired,
  }),
  confirmRender: PropTypes.func,
  onConfirm: PropTypes.func,
  cancleRender: PropTypes.func,
  onCancle: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  height: PropTypes.oneOf(['short', 'medium', 'tall', 'mini', 'miniWide']),
};

export default CustomModal;
