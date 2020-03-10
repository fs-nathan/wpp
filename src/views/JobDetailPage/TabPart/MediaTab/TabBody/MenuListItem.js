import React from 'react';
import styled from 'styled-components';
import {
  IconButton, Menu, MenuItem,
} from '@material-ui/core';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';

const ButtonIcon = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`
const Div = styled.div`
  display: none;
  .mediaBox:hover & {
    display: inline;
  }
`

const MenuListItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Div>
      <ButtonIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" size={'small'} >
        <Icon path={mdiDotsHorizontal} size={1} color={'#fff'} />
      </ButtonIcon>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -31,
          horizontal: -21,
        }}
      >
        <MenuItem onClick={handleClose}>Chia sẻ</MenuItem>
        <MenuItem onClick={handleClose}>Xem tin nhắn</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
    </Div>
  )
}

export default MenuListItem