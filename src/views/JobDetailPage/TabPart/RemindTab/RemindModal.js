import React from 'react';
import { IconButton, Typography, Dialog, Button, TextField, withStyles, InputAdornment, FilledInput, FormControl } from '@material-ui/core';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ColorChip from '../../../../components/ColorChip';
import TimeField from 'react-simple-timefield';
import OutlinedInputSelect from '../ProgressTab/OutlinedInputSelect'
const selector = [
  {
    value: 0,
    label: 'Nhắc hẹn theo thời gian',
  },
  {
    value: 1,
    label: 'Nhắc hẹn theo tiến độ thực tế',
  },
  {
    value: 2,
    label: 'Nhắc hẹn theo tiến độ kế hoạch',
  },
  {
    value: 3,
    label: 'Nhắc hẹn theo chênh lệch tiến độ hoàn thành giữa Kế hoạch - Thực tế',
  },
];

const badges = [
  {
    value: 'Nhắc 1 lần',
    label: 'Nhắc 1 lần',
  },
  {
    value: 'Theo ngày',
    label: 'Theo ngày',
  },
  {
    value: 'Theo tuần',
    label: 'Theo tuần',
  },
  {
    value: 'Theo tháng',
    label: 'Theo tháng',
  },
]
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
    margin: 0 0 15px 0;
  `

const TexTitle = styled(Typography)`
    font-size: 15px;
    width: 204px;
    padding: 15px 0 8px 0;
  `
const HelperText = styled(Typography)`
      color: #a3a3a3
      font-size: 12px;
      margin: 8px 0 0;
  `
const DivTitle = styled.div`
    display: flex;
    margin: 15px 0 0 0;
  `

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
const Text = styled(TextField)`
    & > *:first-child {
      margin-bottom: 20px;
      & > input {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
  `
const BadgeItem = styled(ColorChip)`
    font-weight: 600;
    border-radius: 3px;
    margin: 5px 6px 5px 0;
  `

const TextRemind = styled(Typography)`
    font-size: 15px;
    display: flex;
    align-items: center;
  `
const InputTime = styled(TimeField)`
    width: 146px !important;
    padding: 18px 5px 18px 13px;
    border: 0;
    border-radius: 4px;
  `
const DivTime = styled.span`
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    height: 100% !important;
    margin-top: 8px;
  `
const SelectInput = styled.div`
    margin-top: 8px;
    width: 160px;
    & > div > div > div  {
        padding : 7px 0;
    }
`
const ContentText = styled(TextField)`
    & > label {
      font-size: 14px;
      z-index: 0
    }
`
const InputSelect = styled(OutlinedInputSelect)`
    & > *:first-child > div > div {
      padding: 12px;
    }
`
const InputProgress = styled(OutlinedInput)`
    & > input {
      padding: 0 0 0 14px;
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

function RemindModal(props) {
  // bien input time
  const [time, setTime] = React.useState('')

  const handleTime = () => {
    setTime(time);
  }
  // bien menu item
  const classes = useStyles();
  const dataDefault = {
    title: 'Nhắc hẹn theo thời gian',
    date: '',
    time: '',
    badge: [],
    content: ''
  }
  const [data, setData] = React.useState(dataDefault)
  React.useEffect(() => {
    if (props.data) setData(props.data)
  })
  const handleChange = (event, att) => {
    setData({ ...data, [att]: event.target.value });
  };
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={props.isOpen} onClose={() => props.handleClickClose()} fullWidth>
      <DialogTitle id="customized-dialog-title" onClose={() => props.handleClickClose()}>
        Nhắc hẹn
      </DialogTitle>
      <DialogContent dividers style={{ overflow: 'hidden' }}>
        <TitleText component="div">Loại nhắc hẹn</TitleText>
        <InputSelect
          commandSelect={selector}
          // selectedIndex={tempSelectedItem.type}
          // setOptions={typeId => setParams("type", typeId)}
          setOptions={typeId => { }}
        />
        {/* Middle JSX */}
        {data.title === 'Nhắc hẹn theo thời gian' ?
          <Typography component="div">
            <HelperText>Bạn có lịch hẹn, ghi chú, sự kiện... quan trọng ? Hãy tạo nhắc hẹn theo thời gian để hệ thống nhắc nhở bạn khi đến hẹn</HelperText>
            <DivTitle component="div">
              <TexTitle component="span">Ngày nhắc</TexTitle>
              <TexTitle component="span">Giờ nhắc</TexTitle>
              <TextRemind component="span">Nhắc hẹn định kỳ</TextRemind>
            </DivTitle>
            <Div>
              <TextField component="span"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type={'date'}
              />
              <DivTime>
                <InputTime value={time} onChange={handleTime} />
              </DivTime>
              <SelectInput >
                <OutlinedInputSelect
                  commandSelect={badges}
                  setOptions={typeId => { }}
                />
              </SelectInput>
            </Div>
          </Typography>
          :
          <div>
            <HelperText>Khi tiến độ công việc được xác định (tự động) dựa trên thời gian hiện tại (thời gian thực) lớn hơn hoặc bằng mốc đã chọn, hệ thống sẽ nhắc nhở bạn</HelperText>
            <TexTitle component="div">Mốc tiến độ cần nhắc</TexTitle>
            <div style={{ display: 'flex' }}>
              <InputProgress
                fullWidth
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
              <Button variant="contained" style={{ marginLeft: 20, width: 90, boxShadow: 'none' }}>Thêm</Button>
            </div>
            <Typography component={'div'}>
              {data && data.badge && data.badge.map((item, key) => (
                <BadgeItem key={key} color={'orangelight'} label={item} size='small' badge component='small' />
              ))}
            </Typography>
          </div>
        }
        {/* ------- */}
        <ContentText
          id="outlined-multiline-static"
          label="Nội dung"
          fullWidth
          multiline
          rows="7"
          defaultValue=""
          margin="normal"
          placeholder="Nhập nội dung nhắc hẹn"
          variant="outlined"
          styled={{ zIndex: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClickClose()} color="primary">
          Tạo nhắc hẹn
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemindModal