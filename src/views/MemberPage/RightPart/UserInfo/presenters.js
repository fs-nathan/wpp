import { List, ListItem, ListItemText } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from 'components/CustomAvatar';
import CustomTextbox from 'components/CustomTextbox';
import LoadingOverlay from 'components/LoadingOverlay';
import PillButton from 'components/PillButton';
import Scrollbars from 'components/Scrollbars';
import UploadButton from 'components/UploadButton';
import { CustomEventDispose, CustomEventListener, DETAIL_USER, UPLOAD_DOCUMENTS_USER } from 'constants/events';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileListItem } from 'views/HomePage/components/FileListItem';
import './style.scss';


const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___container ${className}`}
    {...props}
  />;

const MainBox = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___main-box ${className}`}
    {...props}
  />;

const MainHeader = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___main-header ${className}`}
    {...props}
  />;

const MainList = ({ className = '', ...props }) =>
  <List
    className={`view_Member_UserInfo___main-list ${className}`}
    {...props}
  />;

const StyledListItem = ({ className = '', ...props }) =>
  <ListItem
    className={`view_Member_UserInfo___list-item ${className}`}
    {...props}
  />;

const MainFooter = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___main-footer ${className}`}
    {...props}
  />;

const SideBox = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___side-box ${className}`}
    {...props}
  />;

const SideHeader = ({ className = '', ...props }) =>
  <div
    className={`view_Member_UserInfo___side-header ${className}`}
    {...props}
  />;

const SideList = ({ className = '', ...props }) =>
  <List
    className={`view_Member_UserInfo___side-list ${className}`}
    {...props}
  />;

const NameSpan = ({ className = '', ...props }) =>
  <span
    className={`view_Member_UserInfo___name-span ${className}`}
    {...props}
  />

function UserInfo({
  user, userId, canModify,
  handleUploadComputerDocumentsUser, handleUploadGoogleDocumentsUser, handleUploadVtaskDocumentsUser,
  handleOpenModal,
  doReloadUser,
}) {

  const { t } = useTranslation();

  const [uploadLoading, setUploadLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setUploadLoading(false);
    };
    CustomEventListener(UPLOAD_DOCUMENTS_USER.SUCCESS, doReloadUser);
    CustomEventListener(UPLOAD_DOCUMENTS_USER.FAIL, fail);
    return () => {
      CustomEventDispose(UPLOAD_DOCUMENTS_USER.SUCCESS, doReloadUser);
      CustomEventDispose(UPLOAD_DOCUMENTS_USER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [userId]);

  React.useEffect(() => {
    const success = () => {
      setUploadLoading(false);
    };
    const fail = () => {
      setUploadLoading(false);
    };
    CustomEventListener(DETAIL_USER.SUCCESS, success);
    CustomEventListener(DETAIL_USER.FAIL, fail);
    return () => {
      CustomEventDispose(DETAIL_USER.SUCCESS, success);
      CustomEventDispose(DETAIL_USER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [userId]);

  return (
    <LoadingOverlay
      active={user.loading}
      spinner
      fadeSpeed={0}
    >
      <Container>
        <MainBox>
          <MainHeader>
            <CustomAvatar style={{ width: 60, height: 60, }} src={get(user.user, 'avatar')} alt='avatar' />
            <div>
              <NameSpan>{get(user.user, 'name', '')}</NameSpan>
              <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.DATE_JOIN", { date: get(user.user, 'date_join', '') })}</ColorTypo>
            </div>
            {canModify && (
              <PillButton
                size='medium'
                onClick={() => handleOpenModal('UPDATE', {
                  updatedUser: user.user,
                })}
              >
                {t("DMH.VIEW.MP.RIGHT.INFO.EDIT")}
              </PillButton>
            )}
          </MainHeader>
          <Scrollbars
            autoHide
            autoHideTimeout={500}
          >
            <MainList>
              <StyledListItem>
                <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.ROOM")}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'room_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.POSITION")}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'position_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.LEVEL")}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'level_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.MAJOR")}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'major_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo>{t("DMH.VIEW.MP.RIGHT.INFO.DESC")}:</ColorTypo>
                <CustomTextbox
                  value={get(user.user, 'description', '')}
                  isReadOnly={true}
                  maxHeight={100}
                />
              </StyledListItem>
            </MainList>
            <List>
              {get(user.user, 'documents', []).map(file =>
                <FileListItem
                  file={{
                    ...file,
                    on_delete: () => handleOpenModal('DELETE', {
                      curUser: user.user,
                      curDocument: file,
                    }),
                  }}
                />
              )}
            </List>
          </Scrollbars>
          <MainFooter>
            {canModify && (
              <>
                {/*<input
                  id="raised-button-file"
                  type="file"
                  onChange={evt => {
                    handleUploadDocumentsUser(evt.target.files[0]);
                    setUploadLoading(true);
                  }}
                />*/}
                <UploadButton
                  label={t("DMH.VIEW.MP.RIGHT.INFO.DOC.BTN")}
                  loading={uploadLoading}
                  onClick={() => handleOpenModal('UPLOAD', {
                    handleUploadFile: evt => {
                      const files = evt.target.files;
                      if (files.length > 0) {
                        handleUploadComputerDocumentsUser(files);
                        setUploadLoading(true);
                      }
                    },
                    onConfirmShare: files => {
                      const googleFiles = files.filter(({ isGoogleDocument }) => isGoogleDocument)
                      const vtaskFiles = files.filter(({ isGoogleDocument }) => !isGoogleDocument)
                      if (vtaskFiles.length > 0) {
                        handleUploadVtaskDocumentsUser(vtaskFiles.map(file => get(file, 'id')));
                      }
                      if (googleFiles.length > 0) {
                        handleUploadGoogleDocumentsUser(googleFiles);
                      }
                      if (vtaskFiles.length > 0 || googleFiles.length > 0) setUploadLoading(true);
                    }
                  })}
                />
              </>
            )}
          </MainFooter>
        </MainBox>
        <SideBox>
          <SideHeader>
            <ColorTypo bold uppercase>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.TITLE")}</ColorTypo>
          </SideHeader>
          <SideList>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.NAME")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'name', '')}</ColorTypo>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.B_DAY")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'birthday', '')}</ColorTypo>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.GENDER")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'gender_name', '')}</ColorTypo>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.EMAIL")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'email', '')}</ColorTypo>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.PHONE")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'phone', '')}</ColorTypo>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText
                primary={
                  <ColorTypo component='span' color='gray'>{t("DMH.VIEW.MP.RIGHT.INFO.INFO.ADDR")}</ColorTypo>
                }
                secondary={
                  <ColorTypo component='span' bold>{get(user.user, 'address', '')}</ColorTypo>
                }
              />
            </StyledListItem>
          </SideList>
        </SideBox>
      </Container>
    </LoadingOverlay>
  )
}

export default UserInfo;
