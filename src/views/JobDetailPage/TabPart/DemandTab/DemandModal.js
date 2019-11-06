import React from 'react';
import { IconButton, Button, Dialog, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

const currencies = [
    {
        value: 'USD',
        label: 'Quyết định',
    },
    {
        value: 'EUR',
        label: 'Chỉ đạo',
    }
];

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  

const TexTitle = styled(Typography)`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 0;
`

const TitleText = styled(Typography)`
  font-size: 15px;
  margin: 20px 0
`

const HelperText = styled(TextField)`
  & > *:last-child {
    font-size: 12px;
    margin: 8px 0 0;
    & > select {
      font-size: 14px;
    }
  }
`
const Text = styled(TextField)`
  & > *:first-child {
    margin-bottom: 20px;
    & > input {
      font-size: 16px;
      margin-bottom: 100px;
    }
  }
`

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const DemandModal = (props) => {

  // bien menu item
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };
    return (
    <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            Chỉ đạo, quyết định
        </DialogTitle>
        <DialogContent dividers>
            <TexTitle >Chọn loại</TexTitle>
            <HelperText component="span"
                select
                value={currency}
                onChange={handleChange}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                fullWidth
            >
                {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </HelperText>
            <TitleText component="div">Nội dung</TitleText>
            <Text component="span"
                id="outlined-full-width"
                placeholder="Nhập nội dung nhắc hẹn"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={props.handleClose} color="primary">
                Tạo mới
          </Button>
        </DialogActions>
    </Dialog>

    )
}

export default DemandModal