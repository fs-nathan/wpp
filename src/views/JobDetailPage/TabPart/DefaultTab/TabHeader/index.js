import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, withStyles, Button, Dialog, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];


const Container = styled.div`
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 99px;
`;

const TagsContainer = styled.div`
  margin-left: 10px;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;
// cac bien cua modal chinh sua cong viec
const TextLabel = styled(TextField)`
  margin-bottom: 25px;
  & > label {
    
    font-size: 16px;
    color: #505050;
  }
  & > input {
    padding: 20px 0 7px;
  }
`
const TypoText = styled(Typography)`
  font-size: 16px;
  color: #505050
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
// cac bien cua textfield
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 570,
  },
  menu: {
    width: 570,
  },
}));

// end textfield
function TabHeader() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

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
        <ColorTypo variant='caption'>08:00 - 12/12/2012</ColorTypo>
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
        <MenuItem onClick={handleClickOpen}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
      {/* modal chinh sua cong viec */}
      <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Chỉnh sửa công việc
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextLabel label="Search field" fullWidth />
          </Typography>
          <TypoText>
            Chọn nhóm việc
          </TypoText>
          <TextField
            id="standard-select-currency"
            select
            label="Chọn mặc định"
            className={classes.textField}
            value={currency}
            onChange={handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* end modal */}
    </Container>
  );
}

export default TabHeader;
