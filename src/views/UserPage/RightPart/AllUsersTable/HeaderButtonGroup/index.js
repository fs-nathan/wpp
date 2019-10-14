import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ButtonGroup, Button, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiMagnify,
  mdiAccountPlus,
  mdiDotsVertical,
} from '@mdi/js';
import SearchModal from '../../../Modals/SearchModal';
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

function HeaderButtonGroup({ handleSearchChange }) {

  const location = useLocation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const [moreModal, setMoreModal] = React.useState(0);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(id = 0) {
    return evt => {
      setAnchorEl(null);
      setMoreModal(id);
    }
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size='small'
        variant="text"
      >
        <StyledButton disableRipple onClick={() => setOpenSearchModal(true)}>
          <div>
            <Icon path={mdiMagnify} size={1} />
          </div>
          <span>{t('views.user_page.right_part.users_table.header_button_group.search_label')}</span>
        </StyledButton>
        <StyledButton disableRipple component={Link} to={`${location.pathname}/them-thanh-vien`}>
          <div>
            <Icon path={mdiAccountPlus} size={1} />
          </div>
          <span>{t('views.user_page.right_part.users_table.header_button_group.add_user_label')}</span>
        </StyledButton>
        <StyledButton disableRipple aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <div>
            <Icon path={mdiDotsVertical} size={1} />
          </div>
          <span>{t('views.user_page.right_part.users_table.header_button_group.more_label')}</span>
        </StyledButton>
      </ButtonGroup>
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
        <MenuItem onClick={handleClose(1)}>{t('views.user_page.right_part.users_table.header_button_group.title_manager_menu_item')}</MenuItem>
        <MenuItem onClick={handleClose(2)}>{t('views.user_page.right_part.users_table.header_button_group.role_manager_menu_item')}</MenuItem>
        <MenuItem onClick={handleClose(3)}>{t('views.user_page.right_part.users_table.header_button_group.logo_manager_menu_item')}</MenuItem>
        <MenuItem onClick={handleClose(4)}>{t('views.user_page.right_part.users_table.header_button_group.table_settings_menu_item')}</MenuItem>
      </Menu>
      <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} onChange={handleSearchChange} />
      <TitleManagerModal open={moreModal === 1} setOpen={setMoreModal} />
      <RoleManagerModal open={moreModal === 2} setOpen={setMoreModal} />
      <LogoManagerModal open={moreModal === 3} setOpen={setMoreModal} />
      <TableSettingsModal open={moreModal === 4} setOpen={setMoreModal} />
    </React.Fragment>
  )
}

export default HeaderButtonGroup;
