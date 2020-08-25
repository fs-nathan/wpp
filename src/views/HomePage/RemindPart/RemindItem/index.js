import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../components/ColorTypo';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Icon from "@mdi/react";
import { mdiDotsVertical } from '@mdi/js';

const Container = styled.div`
  & > *:last-child {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
`;

const UpperPart = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LeftPart = styled.div`
  flex-grow: 1;
`;

const RightPart = styled.div`
  margin-left: auto;
`;

function RemindItem() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Container>
        <UpperPart>
          <LeftPart>
            <ColorTypo>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores dolores rerum aliquid, corporis molestias in?
            </ColorTypo>
          </LeftPart>
          <RightPart>
            <IconButton size='small' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Icon path={mdiDotsVertical} size={1} />
            </IconButton>
          </RightPart>
        </UpperPart>
        <ColorTypo color='orange'>
          Nhắc tôi 1 lần lúc 08:30 - 18/06/2019
        </ColorTypo>
      </Container>
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
        <MenuItem onClick={handleClose}>Bỏ ghim</MenuItem>
        <MenuItem onClick={handleClose}>Ghim đầu bảng</MenuItem>
      </Menu>
    </React.Fragment> 
  )
}

export default RemindItem;
