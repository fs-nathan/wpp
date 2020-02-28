import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import PillButton from '../../../../components/PillButton';
import SearchInput from '../../../../components/SearchInput';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { ButtonBase } from '@material-ui/core';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomAvatar from '../../../../components/CustomAvatar';
import { ListItemAvatar, ListItemText, IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import './style.scss';

const StyledBox = ({ className = '', ...props }) => 
  <div 
    className={`view_Department_AddUser___box ${className}`} 
    {...props} 
  />;

const OkButton = ({ className = '', ...props }) => 
  <ButtonBase 
    className={`view_Department_AddUser___ok-btn ${className}`}
    {...props}
  />;

const CancleButton = ({ className = '', ...props }) => 
  <ButtonBase 
    className={`view_Department_AddUser___cancle-btn ${className}`}
    {...props}
  />;

const StyledSecondary = ({ className = '', ...props }) => 
  <span 
    className={`view_Department_AddUser___style-secondary ${className}`} 
    {...props} 
  />;

const StyledSearchInput = ({ className = '', ...props }) => 
  <SearchInput 
    className={`view_Department_AddUser___search-input ${className}`} 
    {...props} 
  />;

const Container = ({ className = '', ...rest }) => (<div className={`view_Department_AddUser___container ${className}`} {...rest} />);

const Header = ({ className = '', ...rest }) => (<div className={`view_Department_AddUser___header ${className}`} {...rest} />);

const Title = ({ className = '', ...rest }) => (<p className={`view_Department_AddUser___title ${className}`} {...rest} />);

const Body = ({ className = '', ...rest }) => (<Scrollbars className={`view_Department_AddUser___body ${className}`} {...rest} />);

const StyledIconButton = ({ className = '', ...rest }) => (<IconButton className={`view_Department_AddUser___icon-button ${className}`} {...rest} />);

const IconWrapper = ({ className = '', ...rest }) => (<div className={`view_Department_AddUser___icon-wrapper ${className}`} {...rest} />);


const DesiringUserList = ({ 
  user, loading, bgColor,
  handleInviteUserJoinGroup, handleResendInvitationUserJoinGroup,
}) => {

  function onInviteUserJoinGroup(userId) {
    handleInviteUserJoinGroup({ userId });
  }

  function onResendInvitationUserJoinGroup(userId) {
    handleResendInvitationUserJoinGroup({ userId });
  }

  return (
    <>
    {(user !== null && user !== undefined)
    ? (<StyledList>
        <StyledListItem 
          key={get(user, 'id')}
          style={{ cursor: 'default' }}
        >
          <ListItemAvatar>
            <CustomAvatar style={{ width: 50, height: 50, }} src={get(user, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText 
            primary={
              <Primary>{get(user, 'name', '')}</Primary>  
            }
            secondary={
              <StyledSecondary>
              <Secondary>{get(user, 'email', '')}</Secondary>
                <span>
                  <OkButton 
                    style={{
                      backgroundColor: bgColor.color,
                      borderColor: bgColor.color
                    }}
                    disabled={loading}
                    onClick={
                      () => 
                        get(user, 'status_code', 0) === 0 
                        ? onInviteUserJoinGroup(get(user, 'id'))
                        : onResendInvitationUserJoinGroup(get(user, 'id'))
                      }  
                  >
                    {get(user, 'status_code', 0) === 0 
                    ? 'Mời'
                    : 'Mời lại'}
                  </OkButton>
                  {get(user, 'status_code', 0) === 1 && (
                    <CancleButton 
                      disabled={loading}
                      onClick={() => null} 
                    >
                      Hủy
                    </CancleButton>
                  )}
                </span>
              </StyledSecondary>
            }
          />
        </StyledListItem>
      </StyledList>)
    : null}
    </>
  );
}

const RequestingUserList = ({ 
  users, loading, bgColor,
  handleAcceptRequirementJoinGroup, handleRejectRequirementJoinGroup,
}) => {

  const { t } = useTranslation();

  function onAcceptRequirementJoinGroup(requirementId) {
    handleAcceptRequirementJoinGroup({ requirementId });
  }

  function onRejectRequirementJoinGroup(requirementId) {
    handleRejectRequirementJoinGroup({ requirementId });
  }

  return (
    <StyledList>
      {users.map(user => (
        <StyledListItem
          key={get(user, 'id')}
          style={{ cursor: 'default' }}
        >
          <ListItemAvatar>
            <CustomAvatar style={{ width: 50, height: 50, }} src={get(user, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText 
            primary={
              <Primary>{get(user, 'name')}</Primary>  
            }
            secondary={
              <StyledSecondary>
                <Secondary>{get(user, 'email')}</Secondary>
                <span>
                  <OkButton 
                    style={{
                      backgroundColor: bgColor.color,
                      borderColor: bgColor.color
                    }}
                    disabled={loading}
                    onClick={() => onAcceptRequirementJoinGroup(get(user, 'requirement_id'))} 
                  >
                    {t("views.user_page.left_part.add_user.accept_request")}
                  </OkButton>
                  <CancleButton 
                    disabled={loading}
                    onClick={() => onRejectRequirementJoinGroup(get(user, 'requirement_id'))} 
                  >
                    {t("views.user_page.left_part.add_user.deny_request")}
                  </CancleButton>
                </span>
              </StyledSecondary>
            }
          />
          <ColorTypo component='small'>
            {t("views.user_page.left_part.add_user.time", { minute: 3 })}
          </ColorTypo>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

function AddUser({
  bgColor, 
  desireUser, desireLoading,
  requireUsers, requireLoading,
  handleSearchUser, handleSearchUserReset,
  handleInviteUserJoinGroup, handleResendInvitationUserJoinGroup,
  handleAcceptRequirementJoinGroup, handleRejectRequirementJoinGroup,
  searchPatern, handleSearchPatern,
  anchorDrawer, handleVisibleDrawerMessage
}) {

  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Icon path={mdiClose} size={1} color='rgba(0, 0, 0, 0)' />
        </IconWrapper>
        <Title>Thêm tài khoản</Title>
        <StyledIconButton size='small' onClick={evt => {
          handleSearchUserReset();
          handleVisibleDrawerMessage({ type: '', anchor: anchorDrawer});
        }}>
          <abbr
            title={'Đóng'}
          >
            <div>
              <Icon path={mdiClose} size={1} color='rgba(0, 0, 0, 0.54)' />
            </div>
          </abbr>
        </StyledIconButton>
      </Header>
      <Body
        autoHide
        autoHideTimeout={500}
      >
        <StyledBox>
          <ColorTypo bold>
            {t("views.user_page.left_part.add_user.invite_member")}
          </ColorTypo>
          <div> 
            <StyledSearchInput 
              placeholder={t("views.user_page.left_part.add_user.find_member")}
              value={searchPatern}
              onChange={handleSearchPatern}
            />
            <PillButton 
              size='large'
              background={'#eee'}
              text={'#333'}
              onClick={() => searchPatern !== '' && handleSearchUser({ info: searchPatern })}  
            >
              {t("views.user_page.left_part.add_user.find_member_button")}
            </PillButton>
          </div>
          {desireUser.loading && <LoadingBox />}
          {desireUser.error !== null && <ErrorBox size={16} />}
          {!desireUser.loading && desireUser.error === null && (
            <DesiringUserList 
              bgColor={bgColor}
              loading={desireLoading}
              user={desireUser.user} 
              handleInviteUserJoinGroup={handleInviteUserJoinGroup} 
              handleResendInvitationUserJoinGroup={handleResendInvitationUserJoinGroup}
            />
          )}
        </StyledBox>
        <StyledBox>
          <ColorTypo bold>
            {t("views.user_page.left_part.add_user.request_member_title")}
          </ColorTypo>
          {requireUsers.loading && <LoadingBox />}
          {requireUsers.error !== null && <ErrorBox size={16} />}
          {!requireUsers.loading && requireUsers.error === null && (
            <RequestingUserList 
              bgColor={bgColor}
              loading={requireLoading}
              users={requireUsers.users} 
              handleAcceptRequirementJoinGroup={handleAcceptRequirementJoinGroup} 
              handleRejectRequirementJoinGroup={handleRejectRequirementJoinGroup}
            />
          )}
        </StyledBox>
      </Body>
    </Container>
  )
}

export default AddUser;
