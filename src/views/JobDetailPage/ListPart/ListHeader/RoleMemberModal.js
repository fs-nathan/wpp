import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Input, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

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

function RoleMemberModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;  

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={props.isOpen}>
        <DialogTitle onClose={handleClose}>
          Vai trò thành viên
        </DialogTitle>
        <DialogContent >
          <Input
            fullWidth
            placeholder='Nhập vai trò...'
            endAdornment={<InputAdornment position="end"><Button variant="contained">Thêm</Button></InputAdornment>}
          />
          <FormControl component="fieldset" className={classes.formControl}>           
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
                label="Gilad Gray"
              />
              <FormControlLabel
                control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
            </FormControl>
        </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
          </Button>
          </DialogActions>
      </Dialog>
    </div>
      );
    }
    
export default RoleMemberModal;