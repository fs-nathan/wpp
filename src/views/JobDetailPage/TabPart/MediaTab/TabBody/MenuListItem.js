import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import { loadChat, openShareFileModal } from 'actions/chat/chat';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

const MenuListItem = ({ item, colorIcon = '#fff' }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
    evt.stopPropagation();
  }
  function handleClickItem(evt) {
    evt.stopPropagation();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleShare() {
    setAnchorEl(null);
    dispatch(openShareFileModal(true, item))
  }

  function handleViewChat() {
    setAnchorEl(null);
    dispatch(loadChat(taskId, undefined, undefined, item.id))
  }

  return (
    <div className="mediaMenuItem" onClick={handleClickItem}>
      <IconButton className="mediaMenuItem--button" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" size={'small'} >
        <Icon path={mdiDotsHorizontal} size={1} color={colorIcon} />
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
        <MenuItem onClick={handleShare}>{t('LABEL_CHAT_TASK_CHIA_SE')}</MenuItem>
        <MenuItem onClick={handleViewChat}>{t('LABEL_CHAT_TASK_XEM_TIN_NHAN')}</MenuItem>
        {/* <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem> */}
      </Menu>
    </div>
  )
}

export default MenuListItem