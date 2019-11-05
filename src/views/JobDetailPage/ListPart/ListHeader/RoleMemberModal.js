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

const AddButton = styled(Button)`
  margin-bottom: 15px;
  padding: 3px;
  background: #19bb9b;
  color: #ace5da;
  text-transform: none;
`
const CheckboxText = styled(FormControlLabel)`
  & > *:last-child {
    font-weight: 500;
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

function RoleMemberModal(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    nameRole1: false,
    nameRole2: false,
    nameRole3: false,
    nameRole4: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { role1, role2, role3, role4 } = state;

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={props.isOpen}>
        <DialogTitle onClose={handleClose}>
          Vai trò thành viên
        </DialogTitle>
        <DialogContent dividers>
          <Input
            style={{fontStyle: 'italic'}}
            fullWidth
            placeholder='Nhập vai trò...'
            endAdornment={<InputAdornment position="end"><AddButton variant="contained">Thêm</AddButton></InputAdornment>}
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <CheckboxText
                
                control={<Checkbox color="primary" checked={role1} onChange={handleChange('nameRole1')} value="Giao việc" />}
                label="Giao việc"
              />
              <CheckboxText
                color="primary"
                control={<Checkbox color="primary" checked={role2} onChange={handleChange('nameRole2')} value="Giám sát" />}
                label="Giám sát"
              />
              <CheckboxText 
                color="primary"
                control={<Checkbox color="primary" checked={role3} onChange={handleChange('nameRole3')} value="Phê duyệt" />}
                label="Phê duyệt"
              />
              <CheckboxText
                color="primary"
                control={<Checkbox color="primary" checked={role4} onChange={handleChange('nameRole4')} value="Thực hiện" />}
                label="Thực hiện"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: '#898989' }}>
            HOÀN THÀNH
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RoleMemberModal;