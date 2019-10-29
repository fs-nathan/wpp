import React from 'react';
import { Select, MenuItem, IconButton, Typography, TextField, Dialog, Button, withStyles, Radio, RadioGroup } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus, mdiApps, mdiHelpCircle } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormLabel from '@material-ui/core/FormLabel';
import { func } from 'prop-types';


const Header = styled.div`
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    margin-bottom: 5px;
  }
`;

const InputText = styled(TextField)`
  & > label {
    font-size: 16px;
    color: #505050;
}
`
const Typotitle = styled(Typography)`
  font-size: 16px;
  color: #444444;
`

const ProgressWork = styled(Typography)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-top: 25px;
`

const TypoStartEnd = styled(Typography)`
  
`

const OutlineInput = styled(OutlinedInput)`
& > input {
  padding: 10px 5px;
}
`

const HeaderBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  & > div:focus {
    background-color: #fff !important;
  }
  &::before, &:hover::before, &:focus::before {
    border-bottom: none !important;
  }
  &::after, &:hover::after, &:focus::after {
    border-bottom: none !important;
  }
`;

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


function ListHeaderSelect({ setShow }) {

  const [value] = React.useState(0);

  return (
    <CustomSelect value={value} >
      <Icon path={mdiApps} size={1.5} />
      <MenuItem value={0}>Job-1</MenuItem>
      <MenuItem value={1}>Job-2</MenuItem>
      <MenuItem value={2}>Job-3</MenuItem>
    </CustomSelect>
  )
}

function CustomizedDialogs() {

};

function ListHeader() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <div>
      <Header>
        <ListHeaderSelect />
        <HeaderBottomBox>
          <SearchInput placeholder='Tìm công việc trong dự án...' />
          <IconButton
            style={{
              marginLeft: "10px",
              padding: "7px"
            }}
            onClick={handleClickOpen}
          >
            <Icon path={mdiPlus} size={1.2} />
          </IconButton>
        </HeaderBottomBox>
      </Header>
      {/* mo modal tao cong viec moi */}
      <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Tạo công việc
        </DialogTitle>
        <DialogContent dividers>
          <InputText
            label="Tên công việc"
            fullWidth
          />
          <ProgressWork>
            <Typotitle gutterBottom>
              Tiến độ công việc
          </Typotitle>
            <Typography>
              Đặt mặc định <Icon path={mdiHelpCircle} color={"black"} size={1} />
            </Typography>
          </ProgressWork>
          <FormControl component="fieldset" variant="outlined">
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
              <FormControlLabel
                value="Ngày và giờ (mặc định)"
                control={<Radio color="primary" />}
                label="Ngày và giờ (mặc định)"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Chỉ nhập ngày"
                control={<Radio color="primary" />}
                label="Chỉ nhập ngày"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Không yêu cầu"
                control={<Radio color="primary" />}
                label="Không yêu cầu"
                labelPlacement="end"
              />
              <Typography>Bắt đầu
              <OutlineInput />
              </Typography>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}


export default ListHeader;
