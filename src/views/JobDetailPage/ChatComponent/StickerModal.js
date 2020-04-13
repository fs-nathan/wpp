import clsx from 'clsx';
import words from 'lodash/words';
import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import './ChatComponent.scss';

const StickerModal = ({
  isOpen,
  handleClose,
  handleClickSticker,
}) => {
  const listStickers = useSelector(state => state.chat.listStickers);
  const stickerKeyWord = useSelector(state => state.chat.stickerKeyWord);
  const renderStickersList = listStickers.filter(sticker => !stickerKeyWord
    || words(sticker.host_key).indexOf(stickerKeyWord) !== -1)
  // console.log(renderStickersList, stickerKeyWord)
  function onClickSticker(id) {
    return () => handleClickSticker(id)
  }

  return (
    !isEmpty(renderStickersList) ?
      <div
        id="tag-menu"
        className={clsx("stickerModal--list", { 'stickerModal__open': isOpen })}
      >
        {renderStickersList.map(el => (
          <div key={el.id}
            className="stickerModal--menuItem"
            onClick={onClickSticker(el.id)}>
            <img className="stickerModal--image"
              // style={{ width: el.witdh_of_web, height: el.witdh_of_web }}
              alt="sticker" src={el.url} />
              &nbsp;&nbsp;&nbsp;
            <span>{el.name}</span>
          </div>
        ))}
      </div>
      : null
  );
};

export default StickerModal;
