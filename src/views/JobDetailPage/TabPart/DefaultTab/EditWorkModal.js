import React from 'react';
import {  IconButton,  withStyles, Button, Dialog, Typography,  Input, FormControl, TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import InputSelect from './InputSelect';


// cac bien cua modal chinh sua cong viec
const TitleText = styled(Typography)`
 
`

const InputTextJob = styled(TextField)`
    & > label {
        font-size: 14px
    }
    & > *:last-child {
        color: red;
        margin-left: 10px
    }
`

const TypoText = styled(Typography)`
  font-size: 15px;
  color: #505050;
  margin: 20px 0;
`

const GroupRadio = styled(RadioGroup)`
  & > label {
    margin-right: 80px;
    margin-bottom: 30px;
  }
`

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

// end bien modal chinh sua cong viec

const EditWorkModal = (props) => {
    
      const [value, setValue] = React.useState('Được giao');
    
      const handleChangeRadio = event => {
        setValue(event.target.value);
      };
    return (
        // {/* modal chinh sua cong viec */}
      <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} fullWidth>
      <DialogTitle id="customized-dialog-title" onClose={props.handleClickClose}>
        Chỉnh sửa công việc
      </DialogTitle>
      <DialogContent dividers>
        <Typography component={'span'}>
        <TitleText component={'span'}>
                <InputTextJob
                id="outlined-helperText"
                label="Tên công việc"
                helperText="(Tối đa 100 kí tự)"
                margin="normal"
                fullWidth
                />
          </TitleText>
        </Typography>
        <TypoText component={'div'}> Chọn nhóm việc </TypoText>
        <Typography component={'div'} style={{ marginBottom: 25}}>
          <TitleText component={'div'} style={{ marginBottom: 10}}>
            <Typography component={'span'} style={{ fontSize: 14}}> Nhóm mặc định </Typography>
            <Typography component={'span'}></Typography>
          </TitleText>
          <InputSelect />
        </Typography>
        <Typography component={'span'}>
          <TitleText component={'span'}>
                <InputTextJob
                id="outlined-helperText"
                label="Mô tả công việc"
                helperText="(Tối đa 500 kí tự)"
                margin="normal"
                fullWidth
                />
          </TitleText>
        </Typography>
        <Typography component={'span'}>
        <TypoText component={'div'}> Hình thức giao việc </TypoText>
          <FormControl component="fieldset">
            <GroupRadio aria-label="position" name="position" value={value} onChange={handleChangeRadio} row>
              <FormControlLabel
                value="Được giao"
                control={<Radio color="primary" />}
                label="Được giao"
                labelPlacement="end"
              />
            <FormControlLabel
                value="Tự đề xuất"
                control={<Radio color="primary" />}
                label="Tự đề xuất"
                labelPlacement="end"
              />
            <FormControlLabel
                value="Giao việc cho"
                control={<Radio color="primary" />}
                label="Giao việc cho"
                labelPlacement="end"
              />
            </GroupRadio>
          </FormControl>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClickClose} color="primary">
          Hoàn Thành
        </Button>
      </DialogActions>
    </Dialog>
    // {/* end modal */}
    )
}

export default EditWorkModal;