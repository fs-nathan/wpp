import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
// import * as MaterialIcon from '@material-ui/icons'
// import colors from 'helpers/colorPalette'
import IconLike from 'assets/like.svg';
import React, { useState } from 'react';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import TagModal from 'views/JobDetailPage/ChatComponent/TagModal';
import '../Chat.scss';

const FooterPart = props => {
  const [marginLeftModal, setMarginLeftModal] = useState(0);
  const [marginTopModal, setMarginTopModal] = useState(0);
  const [visibleTag, setVisible] = useState(null);
  const [visibleSendFile, setVisibleSendFile] = useState(false);

  const handleTriggerUpload = id => {
    document.getElementById(id).click();
  };
  const handleUploadImage = e => {
    const { files } = e.target;
    console.log('upload image', files);
  };

  const openTag = () => {
    // Handle position of search modal
    const inputElm = document.getElementById('input_message');
    if (inputElm) {
      const posLeft = inputElm.offsetLeft;
      const posTop = inputElm.offsetTop;
      setMarginLeftModal(posLeft);
      setMarginTopModal(posTop);
    }
    setVisible('mention');
  };
  return (
    <div className="footer-chat-container">
      <div className="wrap-function-bar-fp">
        <div>
          <IconButton className="icon-btn" onClick={openTag}>
            <Icon path={mdiAt} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn">
            <Icon path={mdiEmoticon} size={1.2} />
          </IconButton>
          <IconButton
            className="icon-btn"
            onClick={() => handleTriggerUpload('upload_image')}
          >
            <input
              name="image"
              type="file"
              id="upload_image"
              className="hide"
              accept="image/*"
              multiple
              onChange={handleUploadImage}
            />
            <Icon path={mdiImage} size={1.2} />
          </IconButton>
          <IconButton
            className="icon-btn"
            onClick={() => setVisibleSendFile(true)}
          >
            <Icon path={mdiPaperclip} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn">
            <Icon path={mdiFileTree} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn">
            <Icon path={mdiAlarmPlus} size={1.2} />
          </IconButton>
        </div>
        <div>
          <IconButton className="icon-btn">
            <img
              src={IconLike}
              alt="vtask_like_icon"
              style={{ width: 25, height: 25 }}
            />
          </IconButton>
        </div>
      </div>
      <div className="wrap-input-message" id="input_message">
        {visibleTag === 'mention' && (
          <TagModal
            marginLeft={marginLeftModal}
            marginTop={marginTopModal}
            onClose={() => setVisible(null)}
          />
        )}

        <input
          className="chat-input"
          type="text"
          placeholder="Nhập @ gợi ý, nội dung thảo luận..."
        />
      </div>

      {visibleSendFile && (
        <SendFileModal
          open={visibleSendFile}
          setOpen={() => setVisibleSendFile(false)}
        />
      )}
    </div>
  );
};

export default FooterPart;
