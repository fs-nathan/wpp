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
        horizontal: 57,
      }}
      classes={{
        list: "stickerModal--list"
      }}
    >
      {!isEmpty(listStickers) &&
        listStickers.map(el => (
          <MenuItem key={el.id} className="stickerModal--menuItem" onClick={onClickSticker(el.id)}>
            <img className="stickerModal--image" alt="sticker" src={el.url} />
              &nbsp;&nbsp;&nbsp;
            <span>{el.name}</span>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default StickerModal;
