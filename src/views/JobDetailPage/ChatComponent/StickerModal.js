import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import './ChatComponent.scss';

const StickerModal = ({
  anchorEl,
  handleClose,
  handleClickSticker,
}) => {
  const listStickers = useSelector(state => state.chat.listStickers);

  function onClickSticker(id) {
    return () => handleClickSticker(id)
  }

  return (
    <Menu
      id="tag-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {!isEmpty(listStickers) &&
        listStickers.map(el => (
          <MenuItem key={el.id} className="tag--menuItem" onClick={onClickSticker(el.id)}>
            <img className="header-chat-avatar" alt="sticker" src={el.url} />
              &nbsp;&nbsp;&nbsp;
            <span>{el.name}</span>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default StickerModal;
