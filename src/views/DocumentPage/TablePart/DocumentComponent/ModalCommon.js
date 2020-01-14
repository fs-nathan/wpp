import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import '../DocumentPage.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ColorTypo from '../../../../components/ColorTypo';
import { DialogTitle } from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const DialogTitleCus = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <ColorTypo uppercase>{children}</ColorTypo>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ModalCommon = props => {
  const { t } = useTranslation();
  const isPrimary = props.footerAction.length === 1;
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <Dialog
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={props.maxWidth || 'sm'}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitleCus
        id="customized-dialog-title"
        onClose={props.onClose}
        className="modal-cus"
      >
        {props.title}
      </DialogTitleCus>
      {props.children}
      {props.footerAction && (
        <DialogActions>
          <Button
            onClick={props.onClose}
            disableRipple
            className="common-btn-modal"
          >
            {t('IDS_WP_CANCEL')}
          </Button>
          {props.footerAction.map((el, idx) => (
            <Button
              autoFocus
              onClick={el.action}
              // color={idx % 2 !== 0 || isPrimary ? 'primary' : ''}
              className="common-btn-modal"
              style={{
                color: idx % 2 !== 0 || isPrimary ? bgColor.color : '#222'
              }}
              key={idx}
              disabled={el.disabled}
            >
              {el.name}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(ModalCommon);
