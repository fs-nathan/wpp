import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import './styles.scss';

const MenuListItem = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="mediaMenuItem">
      <IconButton className="mediaMenuItem--button" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" size={'small'} >
        <Icon path={mdiDotsHorizontal} size={1} color={'#fff'} />
      </IconButton>
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
        <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_CHIA_SE')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XEM_TIN_NHAN')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuListItem