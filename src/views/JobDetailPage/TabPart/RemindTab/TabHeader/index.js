import React from 'react';
import { IconButton, Typography, Dialog, Button, TextField, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';


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
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 92px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 160,
  },
}));

const TitleText = styled(Typography)`
  font-size: 15px;
  margin: 20px 0
`

const TexTitle = styled(Typography)`
  font-size: 15px;
  width: 204px;
`
const HelperText = styled(TextField)`
  & > *:last-child {
    font-size: 12px;
    margin: 8px 0 0;
  }
`
const DivTitle = styled.div`
  display: flex;
  margin: 30px 0 10px 0;
`

const Div = styled.div`
  display: flex;
  justify-content: space-between;
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


function TabHeader({ setShow }) {
  // bien cua modal cong viec con
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  // bien menu item
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };
  return (
    <Container>
      <ColorTypo uppercase bold>Nhắc hẹn</ColorTypo>
      <IconButton onClick={handleClickClose, handleClickOpen}>
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
      {/* modal tao moi cong viec con */}
      <Dialog aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Nhắc hẹn
        </DialogTitle>
        <DialogContent dividers>
          <TitleText component="span">Loại nhắc hẹn</TitleText>
          <HelperText component="span"
            select
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            fullWidth
            helperText="Bạn có lịch hẹn, ghi chú, sự kiện...quan trọng ? Hãy tạo nhắc hẹn theo thời gian để hệ thống nhắc nhở bạn khi đến hẹn."
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </HelperText>
          <Typography component="span">
            <DivTitle component="span">
              <TexTitle component="span">Ngày nhắc</TexTitle>
              <TexTitle component="span">Giờ nhắc</TexTitle>
              <Typography component="span" style={{ fontSize: 15 }}>Nhắc hẹn định kỳ</Typography>
            </DivTitle>
            <Div>
              <TextField component="span"
                placeholder="dd/mm/yyy"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField component="span"
                placeholder="hh/mm"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField component="span"
                select
                className={classes.textField}
                value={currency}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {currencies.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Div>
          </Typography>
          <TitleText component="span">Nội dung</TitleText>
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
          <Button onClick={handleClickClose} color="primary">
            Tạo nhắc hẹn
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TabHeader;
