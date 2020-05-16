import { ButtonBase, CircularProgress, IconButton, ListItemAvatar, ListItemText } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from 'components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from 'components/CustomList';
import LoadingOverlay from 'components/LoadingOverlay';
import PillButton from 'components/PillButton';
import SearchInput from 'components/SearchInput';
import { find, get } from 'lodash';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
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
  user, loading, bgColor, canModify,
  handleInviteUserJoinGroup, handleResendInvitationUserJoinGroup,
  handleCancleInvitationJoinGroup,
}) => {

  function onInviteUserJoinGroup(userId) {
    handleInviteUserJoinGroup({ userId });
  }

  function onResendInvitationUserJoinGroup(userId) {
    handleResendInvitationUserJoinGroup({ userId });
  }

  const { t } = useTranslation();

  return (
    <>
      {user !== null && (
        <StyledList>
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
                  {canModify && <span>
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
                      {loading && (
                        <CircularProgress
                          size={16}
                          className="margin-circular"
                          color='white'
                        />
                      )}
                      {get(user, 'status_code', 0) === 0
                        ? t('DMH.VIEW.DP.LEFT.ADD.BTN.INVT')
                        : t('DMH.VIEW.DP.LEFT.ADD.BTN.REINVT')}
                    </OkButton>
                    {get(user, 'status_code', 0) === 1 && (
                      <CancleButton
                        disabled={loading}
                        onClick={evt => handleCancleInvitationJoinGroup({
                          invitationId: get(user, 'invitation')
                        })}
                      >
                        {loading && (
                          <CircularProgress
                            size={16}
                            className="margin-circular"
                            color='#c1c1c1'
                          />
                        )}
                        {t('DMH.VIEW.DP.LEFT.ADD.BTN.CANCLE')}
                      </CancleButton>
                    )}
                  </span>}
                </StyledSecondary>
              }
            />
          </StyledListItem>
        </StyledList>
      )}
    </>
  );
}

const InvitedUserList = ({
  invitations, loading, bgColor, canModify,
  handleResendInvitationUserJoinGroup,
  handleCancleInvitationJoinGroup,
}) => {

  function onResendInvitationUserJoinGroup(userId) {
    handleResendInvitationUserJoinGroup({ userId });
  }

  const { t } = useTranslation();

  return (
    <StyledList>
      {invitations.map(invitation => (
        <StyledListItem
          key={get(invitation, 'user')}
          style={{ cursor: 'default' }}
        >
          <ListItemAvatar>
            <CustomAvatar style={{ width: 50, height: 50, }} src={get(invitation, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Primary>{get(invitation, 'name')}</Primary>
            }
            secondary={
              <StyledSecondary>
                <Secondary>{get(invitation, 'email')}</Secondary>
                {canModify && <span>
                  <OkButton
                    style={{
                      backgroundColor: bgColor.color,
                      borderColor: bgColor.color
                    }}
                    disabled={loading}
                    onClick={() => onResendInvitationUserJoinGroup(get(invitation, 'user'))}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='white'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.REINVT')}
                  </OkButton>
                  <CancleButton
                    disabled={loading}
                    onClick={evt => handleCancleInvitationJoinGroup({
                      invitationId: get(invitation, 'invitation_id')
                    })}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='#c1c1c1'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.CANCLE')}
                  </CancleButton>
                </span>}
              </StyledSecondary>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const RequestingUserList = ({
  users, loading, bgColor, canModify,
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
                {canModify && <span>
                  <OkButton
                    style={{
                      backgroundColor: bgColor.color,
                      borderColor: bgColor.color
                    }}
                    disabled={loading}
                    onClick={() => onAcceptRequirementJoinGroup(get(user, 'requirement_id'))}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='white'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.ACPT')}
                  </OkButton>
                  <CancleButton
                    disabled={loading}
                    onClick={() => onRejectRequirementJoinGroup(get(user, 'requirement_id'))}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='#c1c1c1'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.DENY')}
                  </CancleButton>
                </span>}
              </StyledSecondary>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

function AddUser({
  bgColor, viewPermissions,
  desireUser, desireLoading,
  requireUsers, requireLoading,
  invitations,
  handleSearchUser,
  handleInviteUserJoinGroup, handleResendInvitationUserJoinGroup,
  handleAcceptRequirementJoinGroup, handleRejectRequirementJoinGroup,
  handleCancleInvitationJoinGroup,
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
        <Title>{t('DMH.VIEW.DP.LEFT.ADD.LABEL.ADD')}</Title>
        <StyledIconButton size='small' onClick={evt => {
          handleVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
        }}>
          <abbr
            title={t('DMH.VIEW.DP.LEFT.ADD.LABEL.CLOSE')}
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
        <LoadingOverlay
          active={viewPermissions.loading}
        >
          <StyledBox>
            <ColorTypo bold>
              {t('DMH.VIEW.DP.LEFT.ADD.LABEL.INVT')}
            </ColorTypo>
            <div>
              <StyledSearchInput
                placeholder={t('DMH.VIEW.DP.LEFT.ADD.LABEL.FIND')}
                value={searchPatern}
                onChange={evt => handleSearchPatern(evt.target.value)}
              />
              <PillButton
                size='large'
                background={'#eee'}
                text={'#333'}
                onClick={() => searchPatern !== '' && handleSearchUser({ info: searchPatern })}
              >
                {t('DMH.VIEW.DP.LEFT.ADD.BTN.FIND')}
              </PillButton>
            </div>
            <DesiringUserList
              canModify={get(viewPermissions.permissions, 'can_modify', false)}
              bgColor={bgColor}
              loading={desireLoading}
              user={desireUser.user && {
                ...desireUser.user,
                invitation: get(
                  find(
                    invitations.invitations,
                    {
                      user:
                        get(
                          desireUser.user,
                          'id'
                        )
                    }
                  ),
                  'invitation_id'
                )
              }}
              handleInviteUserJoinGroup={handleInviteUserJoinGroup}
              handleResendInvitationUserJoinGroup={handleResendInvitationUserJoinGroup}
              handleCancleInvitationJoinGroup={handleCancleInvitationJoinGroup}
            />
          </StyledBox>
          <StyledBox>
            <ColorTypo bold>
              {t('DMH.VIEW.DP.LEFT.ADD.LABEL.INVD')}{` (${invitations.invitations.length})`}
            </ColorTypo>
            <InvitedUserList
              canModify={get(viewPermissions.permissions, 'can_modify', false)}
              bgColor={bgColor}
              loading={desireLoading}
              invitations={invitations.invitations}
              handleResendInvitationUserJoinGroup={handleResendInvitationUserJoinGroup}
              handleCancleInvitationJoinGroup={handleCancleInvitationJoinGroup}
            />
          </StyledBox>
          <StyledBox>
            <ColorTypo bold>
              {t('DMH.VIEW.DP.LEFT.ADD.LABEL.REQS')}{` (${requireUsers.users.length})`}
            </ColorTypo>
            <RequestingUserList
              canModify={get(viewPermissions.permissions, 'can_modify', false)}
              bgColor={bgColor}
              loading={requireLoading}
              users={requireUsers.users}
              handleAcceptRequirementJoinGroup={handleAcceptRequirementJoinGroup}
              handleRejectRequirementJoinGroup={handleRejectRequirementJoinGroup}
            />
          </StyledBox>
        </LoadingOverlay>
      </Body>
    </Container>
  )
}

export default AddUser;
