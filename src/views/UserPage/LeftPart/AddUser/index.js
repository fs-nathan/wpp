import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../components/ColorTypo';
import PillButton from '../../../../components/PillButton';
import SearchInput from '../../../../components/SearchInput';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import avatar from '../../../../assets/avatar.jpg';
import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import { connect } from 'react-redux';
import { searchUser } from '../../../../actions/user/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/user/inviteUserJoinGroup';
import _ from 'lodash';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import colorPal from '../../../../helpers/colorPalette';
import { CustomEventListener, CustomEventDispose, INVITE_USER_JOIN_GROUP } from '../../../../constants/events';

const StyledBox = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
`;

function DesiringUserList({ users, handleInviteUser, isSearched }) {

  function handleSendInvite(userId) {
    handleInviteUser({ userId });
  }

  if (isSearched && users.length === 0) 
  return (
    <ColorTypo color='gray'>Không tìm thấy tài khoản</ColorTypo>
  )
  else 
  return (
    <StyledList>
      {users.map(user => (
        <StyledListItem key={_.get(user, 'id')}>
          <ListItemAvatar>
            <Avatar style={{ width: 50, height: 50, }} src={_.get(user, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText 
            primary={
              <Primary>{_.get(user, 'name', '')}</Primary>  
            }
            secondary={
              <Secondary>{_.get(user, 'email', '')}</Secondary>
            }
          />
          <PillButton 
            onClick={() => _.get(user, 'send_invite', false) === false && handleSendInvite(_.get(user, 'id'))} 
            size='small' 
            background={_.get(user, 'send_invite', false) ? colorPal['green'][0] : colorPal['orange'][0]}
            text={_.get(user, 'send_invite', false) ? colorPal['green'][1] : colorPal['orange'][1]}
          >
            {_.get(user, 'send_invite', false) ? "Đã mời" : "Mời"}
          </PillButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const StyledSecondary = styled.span`
  & > span {
    margin-top: 8px;
    display: flex;
    & > :not(:first-child) {
      margin-left: 8px;
    }
  }
`;

function RequestingUserList() {
  return (
    <StyledList>
      <StyledListItem>
        <ListItemAvatar>
          <Avatar style={{ width: 50, height: 50, }} src={avatar} alt='avatar' />
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
                  onClick={() => null} 
                  size='small' 
                  background={colorPal['green'][0]}
                  text={colorPal['green'][1]}
                >
                  Duyệt
                </PillButton>
                <PillButton 
                  onClick={() => null} 
                  size='small' 
                  background={colorPal['red'][0]}
                  text={colorPal['red'][1]}
                >
                  Từ chối
                </PillButton>
              </span>
            </StyledSecondary>
          }
        />
        <ColorTypo component='small' variant='caption'>3 phút</ColorTypo>
      </StyledListItem>
      <StyledListItem>
        <ListItemAvatar>
          <Avatar style={{ width: 50, height: 50, }} src={avatar} alt='avatar' />
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
                  onClick={() => null} 
                  size='small' 
                  background={colorPal['green'][0]}
                  text={colorPal['green'][1]}
                >
                  Duyệt
                </PillButton>
                <PillButton 
                  onClick={() => null} 
                  size='small' 
                  background={colorPal['red'][0]}
                  text={colorPal['red'][1]}
                >
                  Từ chối
                </PillButton>
              </span>
            </StyledSecondary>
          }
        />
        <ColorTypo component='small' variant='caption'>3 phút</ColorTypo>
      </StyledListItem>
    </StyledList>
  );
}

const StyledSearchInput = styled(SearchInput)`
  width: 80%;
`;

function DepartmentInfo({ searchUser, doSearchUser, inviteUserJoinGroup, doInviteUserJoinGroup, handleSubSlide }) {

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
      title='Thêm thành viên'
      rightAction={{
        iconPath: mdiClose,
        onClick: () => handleSubSlide(false),
      }}
    >
      <StyledBox>
        <ColorTypo bold>
          Mời thành viên tham gia nhóm
        </ColorTypo>
        <div> 
          <StyledSearchInput 
            placeholder='Tìm kiếm thành viên'
            value={searchPatern}
            onChange={evt => setSearchPatern(evt.target.value)}
          />
          <PillButton 
            size='medium'
            background={'#eee'}
            text={'#333'}
            onClick={() => {
              if (searchPatern !== '') {
                doSearchUser({ info: searchPatern });
                setIsSearched(true);
              }
            }}  
          >Lọc</PillButton>
        </div>
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox size={16} />}
        {!loading && error === null && (
          <DesiringUserList users={data} handleInviteUser={doInviteUserJoinGroup} isSearched={isSearched} />
        )}
      </StyledBox>
      <StyledBox>
        <ColorTypo bold>
          Thành viên yêu cầu tham gia nhóm
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
