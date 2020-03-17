
import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../components/ColorTypo'
import colorPal from '../../../../helpers/colorPalette';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar, IconButton, Typography, Button, Dialog, InputAdornment, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import imgDoc from '../../../../assets/doc.png'
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';

const StyledEmploy = styled(Typography)`
  width: 700px;
  border-right: 1px solid #cfcfcf;
  padding: 5px 30px 0 10px;
`
const StyledStaff = styled(Typography)`
  width: 490px
`
const NameStaff = styled(ColorTypo)`
  font-size: 16px;
  color: ${colorPal['teal'][0]}
`
const TextInput = styled(TextField)`
  margin-bottom: 17px;
  & > div {
    &::before {
      border-bottom-style: solid !important
    }
    & > input {  
    text-align: end;
    font-size: 17px;
    font-weight: 500;
    color: ${colorPal['black'][0]}
    }
  }
`
const TextItem = styled(Typography)`
  text-align: center;
  font-size: 16px;
  padding: 5px 0 30px 0;
  border-bottom: 1px solid #cfcfcf;
  font-weight: 500;
  text-transform: uppercase;
`
const AdornmentInput = styled(InputAdornment)`
  font-size: 18px;
  width: 200px;
  & > p {
        font-size: 16px;
      }
`
const TitleDescription = styled(Typography)`
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 400;
`
const ContentDescription = styled(Typography)`
  font-size: 17px;
  font-weight: 400;
  color: ${colorPal['black'][0]}
`

const WrapperMember = styled(Typography)`
    padding-top: 20px;
    padding-left: 20px;
`
const MemberDetail = styled(Typography)`
     margin-bottom: 25px;
`

const TitleText = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 10px;
`
const StyledAvatar = styled(Avatar)`
        width: 50px;
        height: 50px;
    `

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#f5f8fc'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400,
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
      <Typography className={classes.title} variant="h6">{children}</Typography>
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
    padding: '15px 24px',
  },
}))(MuiDialogActions);

const MemberModal = ({ handleCloseMembers, isOpen, }) => {
  const classes = useStyles();
  const userDetail = useSelector(state => get(state, 'user.detailUser.data.user', {}));
  const {
    documents = [],
    date_join,
    email,
    name,
    avatar,
    birthday,
    gender,
    gender_name,
    phone,
    address,
    room_name,
    department,
    level,
    specialized,
    description,
  } = userDetail;

  return (
    <Dialog maxWidth={'lg'} onClose={handleCloseMembers} open={isOpen} >
      <DialogTitle onClose={handleCloseMembers}>
        Thông tin chi tiết thành viên
            </DialogTitle>
      <DialogContent dividers>
        <div className="wrapper-member-modal">
          <StyledEmploy component={'div'}>
            <div className="member-general-info">
              <StyledAvatar src={avatar} alt='avatar' />
              <div className="general-info">
                <NameStaff bold uppercase >{name}</NameStaff>
                <ColorTypo color='gray'  >Ngày tham gia: {date_join}</ColorTypo>
              </div>
            </div>
            <TextInput
              value={department}
              InputProps={{
                startAdornment: <AdornmentInput position="start" >Phòng/ban:</AdornmentInput>,
              }}
              fullWidth
              disabled
            />
            <TextInput
              value={room_name}
              InputProps={{
                startAdornment: <AdornmentInput position="start" >Chức danh:</AdornmentInput>,
              }}
              fullWidth
              disabled
            />
            <TextInput
              value={level}
              InputProps={{
                startAdornment: <AdornmentInput position="start" >Trình độ:</AdornmentInput>,
              }}
              fullWidth
              disabled
            />
            <TextInput
              value={specialized}
              InputProps={{
                startAdornment: <AdornmentInput position="start" >Chuyên nghành:</AdornmentInput>,
              }}
              fullWidth
              disabled
            />
            <TitleDescription>Mô tả công việc:</TitleDescription>
            <ContentDescription>
              {description}
            </ContentDescription>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label className="button-file" htmlFor="contained-button-file">
              <Button variant="contained" component="span" fullWidth className={classes.button}>
                <img className="member-image" alt="vtask" src={imgDoc} />
                                Xem file hồ sơ
                            </Button>
            </label>
          </StyledEmploy>

          <StyledStaff component={'div'}>
            <TextItem > Thông tin cá nhân</TextItem>
            <WrapperMember component="div" >
              <MemberDetail component='div'>
                <TitleText >Họ và tên đầy đủ:</TitleText>
                <ContentDescription>{name}</ContentDescription>
              </MemberDetail>
              <MemberDetail component='div'>
                <TitleText >Ngày sinh:</TitleText>
                <ContentDescription>{birthday}</ContentDescription>
              </MemberDetail>
              <MemberDetail component='div'>
                <TitleText >Giới tính:</TitleText>
                <ContentDescription>{gender}</ContentDescription>
              </MemberDetail>
              <MemberDetail component='div'>
                <TitleText >Email:</TitleText>
                <ContentDescription>{email}</ContentDescription>
              </MemberDetail>
              <MemberDetail component='div'>
                <TitleText >Điện thoại:</TitleText>
                <ContentDescription>{phone}</ContentDescription>
              </MemberDetail>
              <MemberDetail component='div'>
                <TitleText >Địa chỉ:</TitleText>
                <ContentDescription>{address}</ContentDescription>
              </MemberDetail>
            </WrapperMember>
          </StyledStaff>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseMembers} color="primary">
          Đóng
                </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberModal;