import React from 'react';
import { IconButton, Dialog, Button, TextField, withStyles, Typography, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose, mdiPlus, mdiCloudDownloadOutline } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IntegrationReactSelect from '../../Tag/index'
import colorPal from '../../../../../helpers/colorPalette';
import { makeStyles } from '@material-ui/core/styles';


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

const TexTitle = styled(Typography)`
  font-size: 15px;
  margin: 15px 0;
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

const TitleText = styled(Typography)`
  font-size: 15px;
  margin: 15px 0;
`
const ButtonFile = styled.label`
      & > span {
        margin: 20px 0 0 0;
        & > span {
          display: flex;
          align-items: center;
          justify-content: start;
          padding: 3px 10px;
          font-size: 16px;
          font-weight: 500;
        }
      }
`
// bien cua modal
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
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
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
// end modal


function TabHeader({ setShow }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <ColorTypo uppercase bold>Đề xuất - Phê duyệt</ColorTypo>
      <IconButton onClick={handleClickClose, handleClickOpen}>
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose} size={1} />
      </IconButton>
      <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Tạo đề xuất
        </DialogTitle>
        <DialogContent dividers>
          <TexTitle >Chọn người duyệt</TexTitle>
          <IntegrationReactSelect />
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
          <input
                accept="image/*"
                className={classes.input}
                id="outlined-button-file"
                multiple
                type="file"
              />
              <ButtonFile htmlFor="outlined-button-file">
                <Button variant="outlined" component="span" fullWidth className={classes.button}>
                  <Icon path={mdiCloudDownloadOutline} size={1} color='gray' style={{ marginRight: 20 }} />
                  Đính kèm tài liệu
                </Button>
              </ButtonFile>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Hoàn Thành
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TabHeader;
