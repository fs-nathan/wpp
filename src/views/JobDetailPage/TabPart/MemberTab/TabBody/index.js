import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 0;
`;

const MemberListItem = () => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} alt='avatar' />
        </ListItemAvatar>
        <ListItemText
          primary={'Nguyễn Văn A'}
          secondary={'Thêm lúc 19:00 - 09/09/2019'}
        />
        <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
          <Icon path={mdiDotsHorizontal} size={1} />
        </IconButton>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const MemberList = () => {
  const [data] = React.useState([1, 2, 3]);

  return (
    <List>
      {data.map((elem, index) => {
        return (
          <MemberListItem key={index} />
        );
      })}
    </List>
  );
}

function TabBody() {
  return (
    <Container>
      <SearchInput placeholder={'Nhập từ khóa'} fullWidth/>
      <MemberList />
    </Container>
  )
}

export default TabBody;
