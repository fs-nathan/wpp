import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorButton from '../../../../components/ColorButton';
import ColorChip from '../../../../components/ColorChip';
import SearchInput from '../../../../components/SearchInput';
import avatar from '../../../../assets/avatar.jpg';
import { IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Container = styled.div`
  grid-area: left;
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

function DesiringUserList() {
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
            <ColorTypo component='small' variant='caption'>vietapp@gmail.com</ColorTypo>
          }
        />
        <ColorChip color='green' badge size='small' label='Đã nhận' />
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
            <ColorTypo component='small' variant='caption'>vietapp@gmail.com</ColorTypo>
          }
        />
        <ColorChip color='green' badge size='small' label='Đã nhận' />
      </ListItem>
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

function DepartmentInfo() {

  const location = useLocation();

  return (
    <Container>
      <Header>
        <ColorTypo uppercase>Thêm thành viên</ColorTypo>
        <IconButton component={Link} to={`${location.pathname.replace('/them-thanh-vien', '')}`}>
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
          />
          <ColorButton variant='contained' variantColor='orange'>Lọc</ColorButton>
        </div>
        <DesiringUserList />
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

export default DepartmentInfo;
