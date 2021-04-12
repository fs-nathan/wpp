import { Avatar, InputAdornment, TextField, Typography } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { openDetailMember, showImagesList } from 'actions/chat/chat';
import { actionDownloadFile } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import ColorTypo from 'components/ColorTypo';
import DialogWrap from 'components/DialogWrap';
import colorPal from 'helpers/colorPalette';
import { getFileType, replaceUrl } from 'helpers/jobDetail/stringHelper';
import get from 'lodash/get';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './styles.scss';
import * as fileType from 'assets/fileType';
import { FileType } from 'components/FileType';

const StyledEmploy = styled(Typography)`
  width: 700px;
  // min-height: 660px;
  border-right: 1px solid #cfcfcf;
  padding: 15px 24px 0;
`
const StyledStaff = styled(Typography)`
  width: 490px
`
const NameStaff = styled(ColorTypo)`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  text-transform: uppercase;
`
const TextInput = styled(TextField)`
  margin-bottom: 17px;
  & > div {
    &::before {
      border-bottom: 1px solid #e9e9e9 !important;
    }
    & > input {  
    text-align: end;
    font-size: 14px;
    font-weight: 500;
    color: ${colorPal['black'][0]}
    }
  }
`
const TextItem = styled(Typography)`
  text-align: center;
  font-size: 14px;
  color: #607d8b;
  padding: 15px 0;
  border-bottom: 1px solid #cfcfcf;
  font-weight: 500;
  text-transform: uppercase;
`
const AdornmentInput = styled(InputAdornment)`
  font-size: 18px;
  width: 200px;
  & > p {
        font-size: 14px;
        color: #607d8b;
      }
`
const TitleDescription = styled(Typography)`
    font-size: 14px;
    color: #607d8b;
    margin-bottom: 15px;
    font-weight: 400;
`
const ContentDescription = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: #e91e63;
`

const WrapperMember = styled(Typography)`
    padding-top: 20px;
    padding-left: 20px;
`
const MemberDetail = styled(Typography)`
    margin-bottom: 25px;
    font-size: 14px;
`

const TitleText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: #607d8b;
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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const MemberModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userDetail = useSelector(state => get(state, 'user.detailUser.data.user'));
  const isOpenDetailMember = useSelector(state => state.chat.isOpenDetailMember);

  function handleCloseMembers() {
    dispatch(openDetailMember(false))
  }

  function setOpenMembers(isOpen) {
    dispatch(openDetailMember(isOpen))
  }

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
    position_name,
    level_name,
    major_name,
    description,
  } = userDetail || {};

  function onClickDownload(file) {
    return (evt) => {
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = name;
      // link.target = '_blank';
      // link.click();
      actionDownloadFile(file)
      evt.stopPropagation()
    }
  }

  function onClickFile(file, idx) {
    const type = getFileType(file.name);
    return (evt) => {
      // if (FileType(type) === fileType.video) {
      //   dispatch(showImagesList(true, [file], idx));
      // } else {
      //   dispatch(openDocumentDetail({ ...file, type: type }));
      // }
      dispatch(openDocumentDetail({ ...file, type: type }));
    }
  }

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THONG_TIN_CHI_TIET_THANH_VIEN')}
      isOpen={isOpenDetailMember}
      handleClickClose={handleCloseMembers}
      successLabel={t('LABEL_CHAT_TASK_DONG')}
      onClickSuccess={handleCloseMembers}
      maxWidth="lg"
      isOneButton
      className="MemberModal"
    >
      <div className="MemberModal--content">
        <StyledEmploy component={'div'}>
          <div className="member-general-info">
            <StyledAvatar src={avatar} alt='avatar' />
            <div className="general-info">
              <NameStaff bold uppercase >{name}</NameStaff>
              <ColorTypo color='gray'  >{t('LABEL_CHAT_TASK_NGAY_THAM_GIA', { date_join })}</ColorTypo>
            </div>
          </div>
          <TextInput
            value={room_name}
            InputProps={{
              startAdornment: <AdornmentInput position="start" >{t('LABEL_CHAT_TASK_PHONG_BAN')}</AdornmentInput>,
            }}
            fullWidth
            disabled
          />
          <TextInput
            value={position_name}
            InputProps={{
              startAdornment: <AdornmentInput position="start" >{t('LABEL_CHAT_TASK_CHUC_DANH')}</AdornmentInput>,
            }}
            fullWidth
            disabled
          />
          <TextInput
            value={level_name}
            InputProps={{
              startAdornment: <AdornmentInput position="start" >{t('LABEL_CHAT_TASK_TRINH_DO')}</AdornmentInput>,
            }}
            fullWidth
            disabled
          />
          <TextInput
            value={major_name}
            InputProps={{
              startAdornment: <AdornmentInput position="start" >{t('LABEL_CHAT_TASK_CHUYEN_NGHANH')}</AdornmentInput>,
            }}
            fullWidth
            disabled
          />
          <TitleDescription>{t('LABEL_CHAT_TASK_MO_TA_CONG_VIEC')}</TitleDescription>
          <ContentDescription>
            <span className="MemberModal--description"
              dangerouslySetInnerHTML={{ __html: replaceUrl(description).replace(/\n/g, '<br/>') }}></span>
          </ContentDescription>
          {/* <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label className="button-file" htmlFor="contained-button-file">
              <Button variant="contained" component="span" fullWidth className={classes.button}>
                <img className="member-image" alt="vtask" src={imgDoc} />{t('LABEL_CHAT_TASK_XEM_FILE_HO_SO')}</Button>
            </label> */}
          <TitleDescription style={{ marginTop: 10 }}>{t('LABEL_CHAT_TASK_TAI_LIEU_DINH_KEM')}</TitleDescription>
          {documents.map(({ file_icon, name, type, size, url, id }) => (
            <div className="MemberModal--file" key={id} onClick={onClickFile({ file_icon, name, type, size, url, id })}>
              <img className="MemberModal--fileImg" src={file_icon} alt="file_icon"></img>
              <div className="MemberModal--fileName">{name}
                <div className="MemberModal--fileType">{`${type} - ${size}`}</div>
                <div className="MemberModal--fileDownloadButton"
                  onClick={onClickDownload({ url, name, id })}>
                  <Icon className="MemberModal--fileDownloadIcon"
                    path={mdiDownload} size="20px" color="#000"></Icon>
                </div>
              </div>
            </div>))}
        </StyledEmploy>

        <StyledStaff component={'div'}>
          <TextItem >{t('LABEL_CHAT_TASK_THONG_TIN_CA_NHAN')}</TextItem>
          <WrapperMember component="div" >
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_HO_VA_TEN_DAY_DU')}</TitleText>
              <ContentDescription>{name}</ContentDescription>
            </MemberDetail>
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_NGAY_SINH')}</TitleText>
              <ContentDescription>{birthday}</ContentDescription>
            </MemberDetail>
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_GIOI_TINH')}</TitleText>
              <ContentDescription>{gender_name}</ContentDescription>
            </MemberDetail>
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_EMAIL')}</TitleText>
              <ContentDescription>{email}</ContentDescription>
            </MemberDetail>
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_DIEN_THOAI')}</TitleText>
              <ContentDescription>{phone}</ContentDescription>
            </MemberDetail>
            <MemberDetail component='div'>
              <TitleText >{t('LABEL_CHAT_TASK_DIA_CHI')}</TitleText>
              <ContentDescription>{address}</ContentDescription>
            </MemberDetail>
          </WrapperMember>
        </StyledStaff>
      </div>
    </DialogWrap>
  )
}

export default MemberModal;