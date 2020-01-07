import React from 'react';
import ColorTypo from '../../../../components/ColorTypo';
import PillButton from '../../../../components/PillButton';
import SearchInput from '../../../../components/SearchInput';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import CustomAvatar from '../../../../components/CustomAvatar';
import { ListItemAvatar, ListItemText } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import { connect } from 'react-redux';
import { searchUser } from '../../../../actions/user/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/user/inviteUserJoinGroup';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import colorPal from '../../../../helpers/colorPalette';
import { CustomEventListener, CustomEventDispose, INVITE_USER_JOIN_GROUP } from '../../../../constants/events';
import './style.scss';

const StyledBox = ({ className = '', ...props }) => <div className={`view_Department_AddUser___container ${className}`} {...props} />;

function DesiringUserList({ users, handleInviteUser, isSearched }) {

  const { t } = useTranslation();

  function handleSendInvite(userId) {
    handleInviteUser({ userId });
  }

  if (isSearched && users.length === 0) 
  return (
    <ColorTypo color='gray'>
      {t("views.user_page.left_part.add_user.no_accounts")}
    </ColorTypo>
  )
  else 
  return (
    <StyledList>
      {users.map(user => (
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
                    onClick={() => get(user, 'send_invite', false) === false && handleSendInvite(get(user, 'id'))}  
                    background={'#eeeeee'}
                    text={get(user, 'send_invite', false) ? '#222222' : colorPal['green'][0]}
                  >
                    {get(user, 'send_invite', false) 
                    ? t("views.user_page.left_part.add_user.invited")
                    : t("views.user_page.left_part.add_user.invite")}
                  </PillButton>
                </span>
              </StyledSecondary>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const StyledSecondary = ({ className = '', ...props }) => <span className={`view_Department_AddUser___style-secondary ${className}`} {...props} />;

function RequestingUserList() {

  const { t } = useTranslation();

  return (
    <StyledList>
      <StyledListItem>
        <ListItemAvatar>
          <CustomAvatar style={{ width: 50, height: 50, }} alt='avatar' />
        </ListItemAvatar>
        <ListItemText 
          primary={
            <Primary>VietApp</Primary>  
          }
          secondary={
            <StyledSecondary>
              <Secondary>vietapp@gmail.com</Secondary>
              <span>
                <PillButton 
                  size='medium'
                  onClick={() => null} 
                  background={'#eeeeee'}
                  text={'#222222'}
                >
                  {t("views.user_page.left_part.add_user.accept_request")}
                </PillButton>
                <PillButton 
                  size='medium'
                  onClick={() => null} 
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
      <StyledListItem>
        <ListItemAvatar>
          <CustomAvatar style={{ width: 50, height: 50, }} alt='avatar' />
        </ListItemAvatar>
        <ListItemText 
          primary={
            <Primary>VietApp</Primary>  
          }
          secondary={
            <StyledSecondary>
              <Secondary>vietapp@gmail.com</Secondary>
              <span>
                <PillButton 
                  size='medium'
                  onClick={() => null} 
                  background={'#eeeeee'}
                  text={'#222222'}
                >
                  {t("views.user_page.left_part.add_user.accept_request")}
                </PillButton>
                <PillButton 
                  size='medium'
                  onClick={() => null} 
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
    </StyledList>
  );
}

const StyledSearchInput = ({ className = '', ...props }) => 
  <SearchInput className={`view_Department_AddUser___search-input ${className}`} {...props} />;

function DepartmentInfo({ searchUser, doSearchUser, inviteUserJoinGroup, doInviteUserJoinGroup, handleSubSlide }) {

  const { t } = useTranslation();
  const { data: { data }, loading: searchUserLoading, error: searchUserError } = searchUser;
  const { loading: inviteUserJoinGroupLoading, error: inviteUserJoinGroupError } = inviteUserJoinGroup;
  const loading = searchUserLoading || inviteUserJoinGroupLoading;
  const error = searchUserError || inviteUserJoinGroupError;
  const [searchPatern, setSearchPatern] = React.useState('');
  const [isSearched, setIsSearched] = React.useState(false);

  React.useEffect(() => {
    const doSearchUserHandler = () => {
      doSearchUser({ info: searchPatern });
    };

    CustomEventListener(INVITE_USER_JOIN_GROUP, doSearchUserHandler);

    return () => {
      CustomEventDispose(INVITE_USER_JOIN_GROUP, doSearchUserHandler);
    }
  }, [doSearchUser, searchPatern]);

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
            onClick={() => {
              if (searchPatern !== '') {
                doSearchUser({ info: searchPatern });
                setIsSearched(true);
              }
            }}  
          >
            {t("views.user_page.left_part.add_user.find_member_button")}
          </PillButton>
        </div>
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox size={16} />}
        {!loading && error === null && (
          <DesiringUserList users={data} handleInviteUser={doInviteUserJoinGroup} isSearched={isSearched} />
        )}
      </StyledBox>
      <StyledBox>
        <ColorTypo bold>
          {t("views.user_page.left_part.add_user.request_member_title")}
        </ColorTypo>
        <RequestingUserList />
      </StyledBox>
    </LeftSideContainer>
  )
}

const mapStateToProps = state => {
  return {
    searchUser: state.user.searchUser,
    inviteUserJoinGroup: state.user.inviteUserJoinGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }) => dispatch(searchUser({ info })),
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentInfo);
