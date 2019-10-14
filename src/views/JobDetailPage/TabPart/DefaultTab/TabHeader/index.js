import React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const TagsContainer = styled.div`
  margin-left: 10px;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

function TabHeader() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Container>
      <Avatar style={{width: 50, height: 50}} src={avatar} alt='avatar' />
      <TagsContainer>
        <ColorTypo bold uppercase>Nguyễn Hữu Thành</ColorTypo>
        <ColorTypo color='blue' variant='caption' uppercase>Giám đốc - Phụ trách</ColorTypo>
        <br/>
        <ColorTypo variant='caption'>08:00 - 12/12/2012</ColorTypo>
      </TagsContainer>
      <StyledIconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </StyledIconButton>
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
        <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleClose}>Xóa</MenuItem>
      </Menu>
    </Container>
  );
}

export default TabHeader;
