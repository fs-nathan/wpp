import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../components/ColorTypo';
import ColorButton from '../../../../components/ColorButton';
import ColorChip from '../../../../components/ColorChip';
import SearchInput from '../../../../components/SearchInput';
import avatar from '../../../../assets/avatar.jpg';
import { IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { connect } from 'react-redux';
import { searchUser } from '../../../../actions/user/searchUser';
import { inviteUserJoinGroup } from '../../../../actions/user/inviteUserJoinGroup';
import _ from 'lodash';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { CustomEventListener, CustomEventDispose, INVITE_USER_JOIN_GROUP } from '../../../../constants/events';

const Container = styled.div`
  border-right: 1px solid rgba(0, 0, 0, .2);
  padding: 15px;
  & > *:not(:last-child) {
    padding-bottom: 8px;
  }
  display: flex;
  flex-direction: column;
`;

const StyledHr = styled.hr`
  && {
    padding-bottom: 0px;
    border: 1px solid rgba(0, 0, 0, .1);
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  & > :last-child {
    margin-left: auto;
  }
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 10;
`;

const StyledBox = styled.div`
  padding: 15px 0;
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
`;

const StyledList = styled(List)`
  & > * {
    padding: 8px 0;
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
        <ListItem key={_.get(user, 'id')}>
          <ListItemAvatar>
            <Avatar src={_.get(user, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText 
            primary={
              <ColorTypo component='span' color='green'>{_.get(user, 'name', '')}</ColorTypo>  
            }
            secondary={
              <ColorTypo component='small' variant='caption'>{_.get(user, 'email', '')}</ColorTypo>
            }
          />
          <ColorChip onClick={() => _.get(user, 'send_invite', false) === false && handleSendInvite(_.get(user, 'id'))} badge size='small' 
            label={_.get(user, 'send_invite', false) ? "Đã mời" : "Mời"}
            color={_.get(user, 'send_invite', false) ? "green" : "orange"}
          />
        </ListItem>
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
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} alt='avatar' />
        </ListItemAvatar>
        <ListItemText 
          primary={
            <ColorTypo component='span' color='green'>VietApp</ColorTypo>  
          }
          secondary={
            <StyledSecondary>
              <ColorTypo component='small' variant='caption'>vietapp@gmail.com</ColorTypo>
              <span>
                <ColorChip component='small' color='green' badge size='small' label='Duyệt' onClick={() => null} />
                <ColorChip component='small' color='red' badge size='small' label='Từ chối' onClick={() => null} />
              </span>
            </StyledSecondary>
          }
        />
        <ColorTypo component='small' variant='caption'>3 phút</ColorTypo>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} alt='avatar' />
        </ListItemAvatar>
        <ListItemText 
          primary={
            <ColorTypo component='span' color='green'>VietApp</ColorTypo>  
          }
          secondary={
            <StyledSecondary>
              <ColorTypo component='small' variant='caption'>vietapp@gmail.com</ColorTypo>
              <span>
                <ColorChip component='small' color='green' badge size='small' label='Duyệt' onClick={() => null} />
                <ColorChip component='small' color='red' badge size='small' label='Từ chối' onClick={() => null} />
              </span>
            </StyledSecondary>
          }
        />
        <ColorTypo component='small' variant='caption'>3 phút</ColorTypo>
      </ListItem>
    </StyledList>
  );
}

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
    <Container>
      <Header>
        <ColorTypo uppercase>Thêm thành viên</ColorTypo>
        <IconButton onClick={() => handleSubSlide(false)}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </Header>
      <StyledHr />
      <StyledBox>
        <ColorTypo bold>
          Mời thành viên tham gia nhóm
        </ColorTypo>
        <div> 
          <SearchInput 
            placeholder='Tìm thành viên'
            value={searchPatern}
            onChange={evt => setSearchPatern(evt.target.value)}
          />
          <ColorButton variant='contained' variantColor='orange' onClick={() => {
            doSearchUser({ info: searchPatern });
            setIsSearched(true);
          }}>Lọc</ColorButton>
        </div>
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox size={16} />}
        {!loading && error === null && (
          <DesiringUserList users={data} handleInviteUser={doInviteUserJoinGroup} isSearched={isSearched} />
        )}
      </StyledBox>
      <StyledHr />
      <StyledBox>
        <ColorTypo bold>
          Thành viên yêu cầu tham gia nhóm
        </ColorTypo>
        <RequestingUserList />
      </StyledBox>
    </Container>
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
