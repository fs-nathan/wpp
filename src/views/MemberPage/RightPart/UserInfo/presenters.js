import React from 'react';
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
                <ColorTypo>Ngày tham gia: {get(user.user, 'date_join', '')}</ColorTypo>
              </div>
              <PillButton 
                size='medium'
                onClick={() => handleOpenModal('UPDATE', {
                  updatedUser: user.user,
                })}
              >
                Chỉnh sửa
              </PillButton>
            </MainHeader>
            <MainList>
              <StyledListItem>
                <ColorTypo color='gray'>Bộ phận:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'room_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>Chức danh:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'position_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>Trình độ:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'level_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>Chuyên ngành:</ColorTypo>
                <ColorTypo bold>{get(user.user, 'major_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>Mô tả công việc:</ColorTypo>
                <ColorTextField value={get(user.user, 'description', '')} />
              </StyledListItem>
            </MainList>
            <MainFooter>
              <StyledButton variant='text' fullWidth onClick={() => handleOpenModal('DOCUMENT', {
                files: get(user.user, 'documents', [])
              })}>
                <CustomAvatar alt='avatar' />
                <ColorTypo>Xem file hồ sơ</ColorTypo>
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
                    {`+ Upload file hồ sơ`}
                  </ColorButton>)
              }
            </MainFooter>
          </MainBox>
          <SideBox>
            <SideHeader>
              <ColorTypo bold uppercase>Thông tin cá nhân</ColorTypo>
            </SideHeader>
            <SideList>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Họ tên đầy đủ</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Ngày sinh</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'birthday', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Giới tính</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'gender_name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Email</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'email', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Điện thoại</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{get(user.user, 'phone', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>Địa chỉ</ColorTypo>
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
