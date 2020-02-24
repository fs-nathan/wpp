import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListItem, List, ListItemText } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import PillButton from '../../../../components/PillButton';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { get } from 'lodash';
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

function UserInfo({ 
  user, isUpload, 
  handleUploadDocumentsUser, handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <>
      {user.loading && <LoadingBox />}
      {user.error !== null && <ErrorBox />}
      {!user.loading && user.error === null && (
        <Container>
          <MainBox>
            <MainHeader>
              <CustomAvatar style={{ width: 60, height: 60, }} src={get(user.user, 'avatar')} alt='avatar' />
              <div>
                <NameSpan>{get(user.user, 'name', '')}</NameSpan>
                <ColorTypo>{t('views.user_page.right_part.user_info.date_join')}: {get(user.user, 'date_join', '')}</ColorTypo>
              </div>
              <PillButton 
                size='medium'
                onClick={() => handleOpenModal('UPDATE', {
                  updatedUser: user.user,
                })}
              >
                {t('views.user_page.right_part.user_info.modify_info')}
              </PillButton>
            </MainHeader>
            <MainList>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.room_name')}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'room_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.position_name')}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'position_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.level_name')}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'level_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.major_name')}:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'major_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.description')}:</ColorTypo>
                <ColorTextField value={get(user.user, 'description', '')} />
              </StyledListItem>
            </MainList>
            <MainFooter>
              <StyledButton variant='text' fullWidth onClick={() => handleOpenModal('DOCUMENT', {
                files: get(user.user, 'documents', [])
              })}>
                <CustomAvatar alt='avatar' />
                <ColorTypo>{t('views.user_page.right_part.user_info.documents_view')}</ColorTypo>
              </StyledButton>
              <input
                id="raised-button-file"
                type="file" 
                onChange={evt => handleUploadDocumentsUser(evt.target.files[0])}
              />
              {isUpload 
                ? (<ColorButton variant='text' variantColor='blue' size='small'>
                    <LoadingBox size={16} />
                  </ColorButton>)
                : (
                  <ColorButton variant='text' variantColor='blue' size='small' component='label' htmlFor='raised-button-file'>
                    {`+ ${t('views.user_page.right_part.user_info.upload_documents')}`}
                  </ColorButton>)
              }
            </MainFooter>
          </MainBox>
          <SideBox>
            <SideHeader>
              <ColorTypo bold uppercase>{t('views.user_page.right_part.user_info.infomation')}</ColorTypo>
            </SideHeader>
            <SideList>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.name')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.birthday')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'birthday', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.gender')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'gender_name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.email')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'email', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.phone')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'phone', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.address')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'address', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
            </SideList>
          </SideBox>
        </Container>
      )}
    </>
  )
}

export default UserInfo;
