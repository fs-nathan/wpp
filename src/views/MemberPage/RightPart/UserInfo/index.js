import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ListItem, List, ListItemText, IconButton } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import PillButton from '../../../../components/PillButton';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import UserDocumentModal from '../../Modals/UserDocument';
import UpdateUserModal from '../../Modals/UpdateUser';
import { connect } from 'react-redux';
import { detailUser } from '../../../../actions/user/detailUser';
import { uploadDocumentsUser } from '../../../../actions/user/uploadDocumentsUser';
import { get } from 'lodash';
import Icon from '@mdi/react';
import {
  mdiFullscreenExit,
} from '@mdi/js';
import { Context as MemberPageContext } from '../../index';
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

const StyledButton = ({ className = '', ...props }) => 
  <ColorButton 
    className={`view_Member_UserInfo___button ${className}`}
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

function UserInfo({ detailUser, uploadDocumentsUser, doUploadDocumentsUser, expand, handleExpand }) {

  const { setUserId } = React.useContext(MemberPageContext);
  const { t } = useTranslation();
  const [openDocumentsModal, setOpenDocumentsModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const { userId } = useParams();
  const { data: { user }, error: detailUserError, loading: detailUserLoading } = detailUser;
  const { loading: uploadDocumentsUserLoading } = uploadDocumentsUser;

  React.useEffect(() => {
    setUserId(userId);
  }, [setUserId, userId]);

  function handleUploadFile(evt) {
    const file = evt.target.files[0];
    doUploadDocumentsUser({ userId, file });
  }

  return (
    <React.Fragment>
      {detailUserLoading && <LoadingBox />}
      {detailUserError !== null && <ErrorBox />}
      {!detailUserLoading && detailUserError === null && (
        <Container>
          <MainBox>
            <MainHeader>
              <CustomAvatar style={{ width: 60, height: 60, }} src={get(user, 'avatar')} alt='avatar' />
              <div>
                <NameSpan>{get(user, 'name', '')}</NameSpan>
                <ColorTypo>{t('views.user_page.right_part.user_info.date_join')}: {get(user, 'date_join', '')}</ColorTypo>
              </div>
              <PillButton 
                size='medium'
                onClick={() => setOpenUpdateModal(true)}
              >
                {t('views.user_page.right_part.user_info.modify_info')}
              </PillButton>
            </MainHeader>
            <MainList>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.room_name')}:</ColorTypo>
                <ColorTypo bold>{get(user, 'room_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.position_name')}:</ColorTypo>
                <ColorTypo bold>{get(user, 'position_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.level_name')}:</ColorTypo>
                <ColorTypo bold>{get(user, 'level_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.major_name')}:</ColorTypo>
                <ColorTypo bold>{get(user, 'major_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.description')}:</ColorTypo>
                <ColorTextField value={get(user, 'description', '')} />
              </StyledListItem>
            </MainList>
            <MainFooter>
              <StyledButton variant='text' fullWidth onClick={() => setOpenDocumentsModal(true)}>
                <CustomAvatar alt='avatar' />
                <ColorTypo>{t('views.user_page.right_part.user_info.documents_view')}</ColorTypo>
              </StyledButton>
              <input
                id="raised-button-file"
                type="file" 
                onChange={handleUploadFile}
              />
              {uploadDocumentsUserLoading && (
                <ColorButton variant='text' variantColor='blue' size='small'>
                  <LoadingBox size={16} />
                </ColorButton>
              )}
              {!uploadDocumentsUserLoading && (
                <ColorButton variant='text' variantColor='blue' size='small' component='label' htmlFor='raised-button-file'>
                  {`+ ${t('views.user_page.right_part.user_info.upload_documents')}`}
                </ColorButton>
              )}
            </MainFooter>
          </MainBox>
          <SideBox>
            <SideHeader expand={expand}>
              <ColorTypo bold uppercase>{t('views.user_page.right_part.user_info.infomation')}</ColorTypo>
              {expand && (
                <IconButton onClick={() => handleExpand(!expand)}>
                  <Icon path={mdiFullscreenExit} size={1} />
                </IconButton>
              )}
            </SideHeader>
            <SideList>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.name')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.birthday')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'birthday', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.gender')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'gender_name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.email')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'email', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.phone')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'phone', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.address')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user, 'address', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
            </SideList>
          </SideBox>
          <UserDocumentModal open={openDocumentsModal} setOpen={setOpenDocumentsModal} files={get(user, 'documents', [])} />
          <UpdateUserModal open={openUpdateModal} setOpen={setOpenUpdateModal} updatedUser={user} />
        </Container>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    detailUser: state.user.detailUser,
    uploadDocumentsUser: state.user.uploadDocumentsUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailUser: ({ userId }, quite) => dispatch(detailUser({ userId }, quite)),
    doUploadDocumentsUser: ({ userId, file }) => dispatch(uploadDocumentsUser({ userId, file })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
