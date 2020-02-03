import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import PillButton from '../../../../components/PillButton';
import SearchInput from '../../../../components/SearchInput';
import { ButtonBase } from '@material-ui/core';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomAvatar from '../../../../components/CustomAvatar';
import { ListItemAvatar, ListItemText } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import { connect } from 'react-redux';
import { searchUser, searchUserReset } from '../../../../actions/groupUser/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/groupUser/inviteUserJoinGroup';
import { resendInvitationUserJoinGroup } from '../../../../actions/groupUser/resendInvitationUserJoinGroup';
import { getRequirementJoinGroup } from '../../../../actions/groupUser/getRequirementJoinGroup';
import { acceptRequirementJoinGroup } from '../../../../actions/groupUser/acceptRequirementJoinGroup';
import { rejectRequirementJoinGroup } from '../../../../actions/groupUser/rejectRequirementJoinGroup';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { 
  CustomEventListener, CustomEventDispose, 
  INVITE_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP,
} from '../../../../constants/events';
import './style.scss';

const StyledBox = ({ className = '', ...props }) => <div className={`view_Department_AddUser___container ${className}`} {...props} />;

const OkButton = ({ className = '', ...props }) => 
  <ButtonBase 
    className={`view_Department_AddUser___ok-btn ${className}`}
    {...props}
  />

const CancleButton = ({ className = '', ...props }) => 
  <ButtonBase 
    className={`view_Department_AddUser___cancle-btn ${className}`}
    {...props}
  />

function DesiringUserList({ 
  user, 
  handleInviteUserJoinGroup, 
  handleResendInvitationUserJoinGroup,
  loading, bgColor,
}) {

  function onInviteUserJoinGroup(userId) {
    handleInviteUserJoinGroup({ userId });
  }

  function onResendInvitationUserJoinGroup(userId) {
    handleResendInvitationUserJoinGroup({ userId });
  }

  return (
    <>
    {user !== null && user !== undefined 
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

const StyledSecondary = ({ className = '', ...props }) => <span className={`view_Department_AddUser___style-secondary ${className}`} {...props} />;

function RequestingUserList({ 
  users, 
  handleAcceptRequirementJoinGroup, 
  handleRejectRequirementJoinGroup,
  loading, bgColor,
}) {

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

const StyledSearchInput = ({ className = '', ...props }) => 
  <SearchInput className={`view_Department_AddUser___search-input ${className}`} {...props} />;

function DepartmentInfo({ 
  searchUser, doSearchUser, 
  doSearchUserReset,
  inviteUserJoinGroup, doInviteUserJoinGroup, 
  resendInvitationUserJoinGroup, doResendInvitationUserJoinGroup,
  getRequirementJoinGroup, doGetRequirementJoinGroup,
  acceptRequirementJoinGroup, doAcceptRequirementJoinGroup, 
  rejectRequirementJoinGroup, doRejectRequirementJoinGroup,
  handleSubSlide,
  colors,
}) {

  const bgColor = colors.find(item => item.selected === true);
  const { t } = useTranslation();
  const { data: { member }, loading: searchUserLoading, error: searchUserError } = searchUser;
  const { loading: inviteUserJoinGroupLoading } = inviteUserJoinGroup;
  const { loading: resendInvitationUserJoinGroupLoading } = resendInvitationUserJoinGroup;
  const { loading: acceptRequirementJoinGroupLoading } = acceptRequirementJoinGroup;
  const { loading: rejectRequirementJoinGroupLoading } = rejectRequirementJoinGroup;
  const [searchPatern, setSearchPatern] = React.useState('');
  const { data: { requirements }, loading: getRequirementJoinGroupLoading, error: getRequirementJoinGroupError } = getRequirementJoinGroup;

  React.useEffect(() => {
    const doSearchUserHandler = () => {
      doSearchUser({ info: searchPatern });
    };

    CustomEventListener(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
    CustomEventListener(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);

    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
      CustomEventDispose(RESEND_INVITATION_USER_JOIN_GROUP, doSearchUserHandler);
    }
  }, [doSearchUser, searchPatern]);

  return (
    <LeftSideContainer
      title={t("views.user_page.left_part.add_user.title")}
      rightAction={{
        iconPath: mdiClose,
        onClick: () => {
          doSearchUserReset();
          handleSubSlide(0);
        },
        tooltip: 'Đóng',
      }}
    >
      <StyledBox>
        <ColorTypo bold>
          {t("views.user_page.left_part.add_user.invite_member")}
        </ColorTypo>
        <div> 
          <StyledSearchInput 
            placeholder={t("views.user_page.left_part.add_user.find_member")}
            value={searchPatern}
            onChange={evt => setSearchPatern(evt.target.value)}
          />
          <PillButton 
            size='large'
            background={'#eee'}
            text={'#333'}
            onClick={() => searchPatern !== '' && doSearchUser({ info: searchPatern })}  
          >
            {t("views.user_page.left_part.add_user.find_member_button")}
          </PillButton>
        </div>
        {searchUserLoading && <LoadingBox />}
        {searchUserError !== null && <ErrorBox size={16} />}
        {!searchUserLoading && searchUserError === null && (
          <DesiringUserList 
            bgColor={bgColor}
            loading={inviteUserJoinGroupLoading || resendInvitationUserJoinGroupLoading}
            user={member} 
            handleInviteUserJoinGroup={doInviteUserJoinGroup} 
            handleResendInvitationUserJoinGroup={doResendInvitationUserJoinGroup}
          />
        )}
      </StyledBox>
      <StyledBox>
        <ColorTypo bold>
          {t("views.user_page.left_part.add_user.request_member_title")}
        </ColorTypo>
        {getRequirementJoinGroupLoading && <LoadingBox />}
        {getRequirementJoinGroupError !== null && <ErrorBox size={16} />}
        {!getRequirementJoinGroupLoading && getRequirementJoinGroupError === null && (
          <RequestingUserList 
            bgColor={bgColor}
            loading={acceptRequirementJoinGroupLoading || rejectRequirementJoinGroupLoading}
            users={requirements} 
            handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup} 
            handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
          />
        )}
      </StyledBox>
    </LeftSideContainer>
  )
}

const mapStateToProps = state => {
  return {
    colors: state.setting.colors,
    searchUser: state.groupUser.searchUser,
    inviteUserJoinGroup: state.groupUser.inviteUserJoinGroup,
    resendInvitationUserJoinGroup: state.groupUser.resendInvitationUserJoinGroup,
    acceptRequirementJoinGroup: state.groupUser.acceptRequirementJoinGroup,
    rejectRequirementJoinGroup: state.groupUser.rejectRequirementJoinGroup,
    getRequirementJoinGroup: state.groupUser.getRequirementJoinGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
    doSearchUserReset: () => dispatch(searchUserReset()),
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
    doResendInvitationUserJoinGroup: ({ userId }) => dispatch(resendInvitationUserJoinGroup({ userId })),
    doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentInfo);
