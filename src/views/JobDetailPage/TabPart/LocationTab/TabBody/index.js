import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import { 
  List, ListItem, ListItemAvatar, ListItemText, 
  Avatar, IconButton, Menu, MenuItem, ButtonGroup,
  ListSubheader, ListItemIcon, Collapse,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorButton from '../../../../../components/ColorButton';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 20px;
`;

const CustomListItem = () => {
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
          primary={'ABC đã chia sẻ vị trí'}
          secondary={
            <span>
              <ColorTypo variant='caption' color='blue'>Lúc 08:00 - 12/12/2012</ColorTypo>
              <br />
              <ColorTypo variant='caption'>Số 123/456 Giải Phóng, Hà Nội</ColorTypo>
            </span>
          }
        />
        <ListItemIcon>
          <IconButton size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <Icon path={mdiDotsHorizontal} size={1} />
          </IconButton>
        </ListItemIcon>
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
        <MenuItem onClick={handleClose}>Chia sẻ</MenuItem>
        <MenuItem onClick={handleClose}>Xem tin nhắn</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const LocationShareBox = () => {
  return (
    <React.Fragment>
      <SearchInput 
        placeholder="Nhập từ khóa"
        fullWidth
      />
      <List subheader={<li />}>
        <ListSubheader component='div'>09/09/2019</ListSubheader>
        <CustomListItem/>
        <CustomListItem/>
        <CustomListItem/>
      </List>
    </React.Fragment>
  );
}

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 8px 0 20px 0;
`;

function TabBody() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <StyledButtonGroup fullWidth variant="text" aria-label="full width outlined button group">
        <ColorButton 
          onClick={evt => handleChange(evt, 0)}
        >
          {value === 0 ? <ColorTypo bold>Tất cả</ColorTypo> : <ColorTypo color='gray'>Tất cả</ColorTypo>}
        </ColorButton>
        <ColorButton 
          onClick={evt => handleChange(evt, 1)}
        >
          {value === 1 ? <ColorTypo bold>Vị trí của tôi</ColorTypo> : <ColorTypo color='gray'>Vị trí của tôi</ColorTypo>}
        </ColorButton>
      </StyledButtonGroup>
      <Collapse in={value === 0} mountOnEnter unmountOnExit>
        <LocationShareBox />
      </Collapse>
      <Collapse in={value === 1} mountOnEnter unmountOnExit>
        {null}
      </Collapse>
    </Container>
  )
}

export default TabBody;
