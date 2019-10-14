import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ButtonGroup, Button, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiMagnify,
  mdiAccountPlus,
  mdiAccountCheck,
  mdiDotsVertical,
} from '@mdi/js';
import SearchInput from '../../../../../components/SearchInput';
import TitleManagerModal from '../../../Modals/TitleManager';
import RoleManagerModal from '../../../Modals/RoleManager';
import LogoManagerModal from '../../../Modals/LogoManager';
import TableSettingsModal from '../../../Modals/TableSettings';

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

const StyledMenuItem = styled(MenuItem)`
  && {
    background-color: #fff;
    & > span:last-child {
      display: none;
    }
  }
`;

function HeaderButtonGroup({ handleSearchChange }) {

  const location = useLocation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchEl, setSearchEl] = React.useState(null);
  const [moreModal, setMoreModal] = React.useState(0);
  const [search, setSearch] = React.useState('');

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleSearchClick(evt) {
    setSearchEl(evt.currentTarget);
  }

  function handleSearchInput(evt) {
    setSearch(evt.target.value);
    handleSearchChange(evt.target.value);
  }

  function handleClose(id = 0) {
    return evt => {
      setAnchorEl(null);
      setMoreModal(id);
    }
  }

  function handleSearchClose() {
    setSearchEl(null);
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size='small'
        variant="text"
      >
        <StyledButton disableRipple onClick={handleSearchClick}>
          <div>
            <Icon path={mdiMagnify} size={1} />
          </div>
          <span>Tìm kiếm</span>
        </StyledButton>
        <StyledButton disableRipple component={Link} to={`${location.pathname}/them-thanh-vien`}>
          <div>
            <Icon path={mdiAccountPlus} size={1} />
          </div>
          <span>Thêm thành viên</span>
        </StyledButton>
        <StyledButton disableRipple>
          <div>
            <Icon path={mdiAccountCheck} size={1} />
          </div>
          <span>Duyệt thành viên</span>
        </StyledButton>
        <StyledButton disableRipple aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <div>
            <Icon path={mdiDotsVertical} size={1} />
          </div>
          <span>Thêm</span>
        </StyledButton>
      </ButtonGroup>
      <Menu
        anchorEl={searchEl}
        keepMounted
        open={Boolean(searchEl)}
        onClose={handleSearchClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <StyledMenuItem>
          <SearchInput
            value={search}
            onChange={handleSearchInput}
            placeholder={t('views.user_page.modals.search_modal.search_label')}
          />
        </StyledMenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose()}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose(1)}>Quản lý chức danh</MenuItem>
        <MenuItem onClick={handleClose(2)}>Quản lý vai trò</MenuItem>
        <MenuItem onClick={handleClose(3)}>Quản lý biểu tượng</MenuItem>
        <MenuItem onClick={handleClose(4)}>Cài đặt bảng</MenuItem>
      </Menu>
      <TitleManagerModal open={moreModal === 1} setOpen={setMoreModal} />
      <RoleManagerModal open={moreModal === 2} setOpen={setMoreModal} />
      <LogoManagerModal open={moreModal === 3} setOpen={setMoreModal} />
      <TableSettingsModal open={moreModal === 4} setOpen={setMoreModal} />
    </React.Fragment>
  )
}

export default HeaderButtonGroup;
