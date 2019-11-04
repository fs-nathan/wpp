import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, withStyles, Button, Dialog, Typography, TextField, Input, FormControl, Select } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 92px;
`;

const TagsContainer = styled.div`
  margin-left: 10px;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;
// cac bien cua modal chinh sua cong viec
const TitleText = styled(Typography)`
  display: flex;
  justify-content: space-between
  & > *:first-child {
    font-size: 15px;
  color: #505050;
  }
  & > *:last-child {
    color: #fa0000
    font-size: 14px;
    font-style: italic;
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

function TabHeader() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState('');

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const [value, setValue] = React.useState('Được giao');

  const handleChangeRadio = event => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Container>
      <Avatar style={{ width: 50, height: 50 }} src={avatar} alt='avatar' />
      <TagsContainer>
        <ColorTypo bold uppercase>Nguyễn Hữu Thành</ColorTypo>
        <ColorTypo color='blue' variant='caption' uppercase>Giám đốc - Phụ trách</ColorTypo>
        <br />
        <ColorTypo variant='caption' style={{ color: '#cfcfcf'}}>Đã được giao lúc 08:00 ngày 12/12/2012</ColorTypo>
      </TagsContainer>
      <StyledIconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </StyledIconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose,handleClickOpen}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
      {/* modal chinh sua cong viec */}
      <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Chỉnh sửa công việc
        </DialogTitle>
        <DialogContent dividers>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}> Tên công việc </Typography>
              <Typography component={'span'}>(Tối đa 100 kí tự)</Typography>
            </TitleText>
            <Input
              inputProps={{
                'aria-label': 'description',
              }}
              fullWidth
            />
          </Typography>
          <TypoText component={'div'}> Chọn nhóm việc </TypoText>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}> Nhóm mặc định </Typography>
              <Typography component={'span'}></Typography>
            </TitleText>
            <FormControl fullWidth style={{ marginBottom: 50 }}>
              <Select
                native
                onChange={handleChange('')}
              >
                
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Typography>
          <Typography component={'span'}>
            <TitleText component={'span'}>
              <Typography component={'span'}> Mô tả công việc </Typography>
              <Typography component={'span'}>(Tối đa 500 kí tự)</Typography>
            </TitleText>
            <Input
              style={{ marginBottom: 10 }}
              inputProps={{
                'aria-label': 'description',
              }}
              fullWidth
            />
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
          <Button onClick={handleClickClose} color="primary">
            Hoàn Thành
          </Button>
        </DialogActions>
      </Dialog>
      {/* end modal */}
    </Container>
  );
}

export default TabHeader