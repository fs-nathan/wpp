import React from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiMagnify,
  mdiAccountCircleOutline,
  mdiDownload,
  mdiMovieRoll,
  mdiCalendarRange,
  mdiDotsVertical,
} from '@mdi/js';

const StyledButton = styled(Button)`
  && {
    padding: 4px;
    border-radius: 0;
  }
  &&:not(:last-child) {
    border-right: none;
  }
  && > span:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > span {
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;

function HeaderButtonGroup() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(evt) {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size='small'
        variant="text"
      >
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiAccountCircleOutline} size={1} />
          </div>
          <span>Thành viên</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiMovieRoll} size={1} />
          </div>
          <span>Nhóm việc</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiMagnify} size={1} />
          </div>
          <span>Tìm kiếm</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiDownload} size={1} />
          </div>
          <span>Tải xuống</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiCalendarRange} size={1} />
          </div>
          <span>Năm 2019</span>
        </StyledButton>
        <StyledButton disableRipple aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <div>
            <Icon path={mdiDotsVertical} size={1} />
          </div>
          <span>Thêm</span>
        </StyledButton>
      </ButtonGroup>
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
        <MenuItem onClick={handleClose}>Cài đặt bảng</MenuItem>
        <MenuItem onClick={handleClose}>Sửa dự án</MenuItem>
        <MenuItem onClick={handleClose}>Ẩn dự án</MenuItem>
        <MenuItem onClick={handleClose}>Xóa dự án</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default HeaderButtonGroup;
