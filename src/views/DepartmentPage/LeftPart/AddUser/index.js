import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import PillButton from '../../../../components/PillButton';
import SearchInput from '../../../../components/SearchInput';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomAvatar from '../../../../components/CustomAvatar';
import { ListItemAvatar, ListItemText } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import { connect } from 'react-redux';
import { searchUser } from '../../../../actions/groupUser/searchUser';
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
import colorPal from '../../../../helpers/colorPalette';
import { 
  CustomEventListener, CustomEventDispose, 
  INVITE_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP,
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP, REJECT_REQUIREMENT_USER_JOIN_GROUP,
} from '../../../../constants/events';
import './style.scss';

const StyledBox = ({ className = '', ...props }) => <div className={`view_Department_AddUser___container ${className}`} {...props} />;

function DesiringUserList({ 
  user, 
  handleInviteUserJoinGroup, 
  handleResendInvitationUserJoinGroup,
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
        <StyledListItem key={get(user, 'id')}>
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
                  <PillButton 
                    size='medium'
                    onClick={
                      () => 
                        get(user, 'status_code', 0) === 0 
                        ? onInviteUserJoinGroup(get(user, 'id'))
                        : onResendInvitationUserJoinGroup(get(user, 'id'))
                      }  
                    background={'#eeeeee'}
                    text={
                      get(user, 'status_code', 0) === 0 
                      ? colorPal['green'][0] 
                      : '#222222'
                    }
                  >
                    {get(user, 'status_code', 0) === 0 
                    ? 'Mời'
                    : 'Mời lại'}
                  </PillButton>
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
        <StyledListItem>
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
                  <PillButton 
                    size='medium'
                    onClick={() => onAcceptRequirementJoinGroup(get(user, 'requirement_id'))} 
                    background={'#eeeeee'}
                    text={'#222222'}
                  >
                    {t("views.user_page.left_part.add_user.accept_request")}
                  </PillButton>
                  <PillButton 
                    size='medium'
                    onClick={() => onRejectRequirementJoinGroup(get(user, 'requirement_id'))} 
                    background={'#eeeeee'}
                    text={colorPal['red'][0]}
                  >
                    {t("views.user_page.left_part.add_user.deny_request")}
                  </PillButton>
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
  doInviteUserJoinGroup, doResendInvitationUserJoinGroup,
  getRequirementJoinGroup, doGetRequirementJoinGroup,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup,
  handleSubSlide 
}) {

  const { t } = useTranslation();
  const { data: { member }, loading: searchUserLoading, error: searchUserError } = searchUser;
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

  React.useEffect(() => {
    doGetRequirementJoinGroup();

    const doGetRequirementJoinGroupHandler = () => {
      doGetRequirementJoinGroup(true);
    };

    CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
    CustomEventListener(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);

    return () => {
      CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
      CustomEventDispose(REJECT_REQUIREMENT_USER_JOIN_GROUP, doGetRequirementJoinGroupHandler);
    }
  }, [doGetRequirementJoinGroup])

  return (
    <LeftSideContainer
      title={t("views.user_page.left_part.add_user.title")}
      rightAction={{
        iconPath: mdiClose,
        onClick: () => handleSubSlide(0),
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
    searchUser: state.groupUser.searchUser,
    getRequirementJoinGroup: state.groupUser.getRequirementJoinGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
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
