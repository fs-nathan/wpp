
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
import avatar from '../../../../assets/avatar.jpg';


const staff = {
    name: 'Trần Văn Nam', datejoined: '18/10/2018', department: 'Phòng tài chính kế toán', role: 'Trưởng phòng', level: 'Đại học', specialized: 'Kinh tế quốc tế',
    description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.',
    birthday: '20/10/1978', gender: 'Nam', email: 'thuy@gmail.com', phonenumber: '0918006181', address: 'Nhà A, Phố B, Quận Hai Bà Trưng, Thành Phố Hà Nộis'
}

const Div = styled.div`
  display: flex;
`

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
const TitleText = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 10px;
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

const MemberModal = (props) => {
    const classes = useStyles();
    return (
        <Dialog maxWidth={'lg'} onClose={props.handleCloseMembers}  open={props.isOpen} >
            <DialogTitle onClose={props.handleCloseMembers}>
                Thông tin chi tiết thành viên
            </DialogTitle>
            <DialogContent dividers>
                <Div>
                    <StyledEmploy component={'div'}>
                        <Div style={{ paddingBottom: 40 }}>
                            <Avatar style={{ width: 50, height: 50 }} src={avatar} alt='avatar' />
                            <div style={{ paddingLeft: 20 }}>
                                <NameStaff bold uppercase >{staff.name}</NameStaff>
                                <ColorTypo color='gray'  >Ngày tham gia: {staff.datejoined}</ColorTypo>
                            </div>
                        </Div>
                        <TextInput
                            value={staff.department}
                            InputProps={{
                                startAdornment: <AdornmentInput position="start" >Phòng/ban:</AdornmentInput>,
                            }}
                            fullWidth
                            disabled
                        />
                        <TextInput
                            value={staff.role}
                            InputProps={{
                                startAdornment: <AdornmentInput position="start" >Chức danh:</AdornmentInput>,
                            }}
                            fullWidth
                            disabled
                        />
                        <TextInput
                            value={staff.level}
                            InputProps={{
                                startAdornment: <AdornmentInput position="start" >Trình độ:</AdornmentInput>,
                            }}
                            fullWidth
                            disabled
                        />
                        <TextInput
                            value={staff.specialized}
                            InputProps={{
                                startAdornment: <AdornmentInput position="start" >Chuyên nghành:</AdornmentInput>,
                            }}
                            fullWidth
                            disabled
                        />
                        <TitleDescription>Mô tả công việc:</TitleDescription>
                        <ContentDescription>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </ContentDescription>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <ButtonFile htmlFor="contained-button-file">
                            <Button variant="contained" component="span" fullWidth className={classes.button}>
                                <img alt="vtask" src={imgDoc} style={{ width: 20, height: 20, marginRight: 10 }} />
                                Xem file hồ sơ
                            </Button>
                        </ButtonFile>
                    </StyledEmploy>

                    <StyledStaff component={'div'}>
                        <TextItem > Thông tin cá nhân</TextItem>
                        <Typography component="div" style={{ paddingTop: 20, paddingLeft: 20 }}>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Họ và tên đầy đủ:</TitleText>
                                <ContentDescription>{staff.name}</ContentDescription>
                            </Typography>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Ngày sinh:</TitleText>
                                <ContentDescription>{staff.birthday}</ContentDescription>
                            </Typography>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Giới tính:</TitleText>
                                <ContentDescription>{staff.gender}</ContentDescription>
                            </Typography>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Email:</TitleText>
                                <ContentDescription>{staff.email}</ContentDescription>
                            </Typography>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Điện thoại:</TitleText>
                                <ContentDescription>{staff.phonenumber}</ContentDescription>
                            </Typography>
                            <Typography component='div' style={{ marginBottom: 25 }}>
                                <TitleText >Địa chỉ:</TitleText>
                                <ContentDescription>{staff.address}</ContentDescription>
                            </Typography>
                        </Typography>
                    </StyledStaff>
                </Div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleCloseMembers} color="primary">
                    Đóng
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MemberModal;