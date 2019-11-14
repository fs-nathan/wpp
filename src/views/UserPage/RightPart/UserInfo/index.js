import React from 'react';
import styled from 'styled-components';
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
import _ from 'lodash';
import Icon from '@mdi/react';
import {
  mdiFullscreenExit,
} from '@mdi/js';
import { Context as UserPageContext } from '../../index';

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(450px, 3fr) minmax(350px, 2fr);
  grid-template-areas: 
    "main side";
`;

const MainBox = styled.div`
  grid-area: main;
  padding: 16px;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

const MainList = styled(List)`
  margin-top: 16px;
`;

const StyledListItem = styled(ListItem)`
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  &:last-child {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    & > *:last-child {
      margin-top: 8px;
    }
  }
`;

const MainFooter = styled.div`
  margin-top: 16px;
  & > input[type='file'] {
    display: none;
  }
  & > label:last-child {
    margin-top: 8px;
    & > span {
      text-transform: none;
    }
  }
`;

const StyledButton = styled(ColorButton)`
  display: flex;
  align-items: center;
  background-color: #eee;
  padding-left: 32px;
  & > span:first-child {
    justify-content: flex-start;
    & > *:first-child{
      margin-right: 8px;
    }
  }
`;

const SideBox = styled.div`
  grid-area: side;
`;

const SideHeader = styled(({ expand, ...rest }) => <div {...rest} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:last-child {
    margin-left: ${props => props.expand ? '32px' : 0};
  }
`;

const SideList = styled(List)`
  padding: 16px;
  & > * {
    padding: 0px
    border-bottom: none;
  }
`;

function UserInfo({ detailUser, uploadDocumentsUser, doUploadDocumentsUser, expand, handleExpand }) {

  const { setUserId } = React.useContext(UserPageContext);
  const { t } = useTranslation();
  const [openDocumentsModal, setOpenDocumentsModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const { userId } = useParams();
  const { data: { user }, error: detailUserError, loading: detailUserLoading } = detailUser;
  const { error: uploadDocumentsUserError, loading: uploadDocumentsUserLoading } = uploadDocumentsUser;

  React.useEffect(() => {
    setUserId(userId);
  }, [userId]);

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
              <CustomAvatar style={{ width: 60, height: 60, }} src={_.get(user, 'avatar')} alt='avatar' />
              <div>
                <ColorTypo color='green' bold variant='h6'>{_.get(user, 'name', '')}</ColorTypo>
                <ColorTypo>{t('views.user_page.right_part.user_info.date_join')}: {new Date(_.get(user, 'date_join', '')).toLocaleDateString()}</ColorTypo>
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
                <ColorTypo bold>{_.get(user, 'room_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.position_name')}:</ColorTypo>
                <ColorTypo bold>{_.get(user, 'position_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.level_name')}:</ColorTypo>
                <ColorTypo bold>{_.get(user, 'level_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.major_name')}:</ColorTypo>
                <ColorTypo bold>{_.get(user, 'major_name', '')}</ColorTypo>
              </StyledListItem>
              <StyledListItem>
                <ColorTypo color='gray'>{t('views.user_page.right_part.user_info.description')}:</ColorTypo>
                <ColorTextField value={_.get(user, 'description', '')} />
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
                  {uploadDocumentsUserError !== null && `${t('views.user_page.right_part.user_info.upload_documents_error')}`}
                  {uploadDocumentsUserError === null && `+ ${t('views.user_page.right_part.user_info.upload_documents')}`}
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
                    <ColorTypo component='span' bold>{_.get(user, 'name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.birthday')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{new Date(_.get(user, 'birthday', '')).toLocaleDateString()}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.gender')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{_.get(user, 'gender_name', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.email')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{_.get(user, 'email', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.phone')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{_.get(user, 'phone', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={
                    <ColorTypo component='span' color='gray'>{t('views.user_page.right_part.user_info.address')}</ColorTypo>
                  }
                  secondary={
                    <ColorTypo component='span' bold>{_.get(user, 'address', '')}</ColorTypo>
                  }
                />
              </StyledListItem>
            </SideList>
          </SideBox>
          <UserDocumentModal open={openDocumentsModal} setOpen={setOpenDocumentsModal} files={_.get(user, 'documents', [])} />
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
