import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiClose, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, changeStickerKeyWord, chatImage, chatQuickLike, chatSticker, clearTags, createChatText, onUploading, openCreateRemind, tagMember } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import words from 'lodash/words';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import ShareFromLibraryModal from 'views/JobDetailPage/ChatComponent/ShareFromLibraryModal';
import StickerModal from 'views/JobDetailPage/ChatComponent/StickerModal';
import TagModal from 'views/JobDetailPage/ChatComponent/TagModal/TagModal';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import Message from '../BodyPart/Message';
import '../Chat.scss';
import ChatBoxInput from './ChatBoxInput';
import QuickLikeIcon from './QuickLikeIcon';
import './styles.scss';

const StyledIcon = styled(Icon)`
  &:hover {
    color : ${props => props.hoverColor}
  }
`
let isPressShift = false;
const FooterPart = ({
  parentMessage,
  setSelectedChat,
  imagesQueue,
  setImagesQueue,
}) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const tagMembers = useSelector(state => state.chat.tagMembers);
  const userId = useSelector(state => state.system.profile.id)
  const listStickers = useSelector(state => state.chat.listStickers);
  const stickerKeyWord = useSelector(state => state.chat.stickerKeyWord);
  const groupActiveColor = useSelector(currentColorSelector)

  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const chatTextRef = useRef('');
  const [chatText, setChatText] = useState('');
  const [isOpenMention, setOpenMention] = useState(false);
  const [isOpenSticker, setOpenSticker] = useState(false);
  const [isShowQuickLike, setShowQuickLike] = useState(false);
  const [isShareFromLib, setShareFromLib] = useState(false);
  const [suggestions, setSuggestions] = useState(members);
  const [imagesQueueUrl, setImagesQueueUrl] = useState([]);

  useEffect(() => {
    async function renderPrepareImages(imagesFiles) {
      const images = [];
      for (let index = 0; index < imagesFiles.length; index++) {
        const file = imagesFiles[index];
        const url = await getFileUrl(file)
        images.push({ url, file })
      }
      setImagesQueueUrl(images)
    }
    renderPrepareImages(imagesQueue)
  }, [imagesQueue]);

  useEffect(() => {
    const content = chatText;
    if (content[0] === '@' && content.indexOf('\n') === -1) {
      const stickerKey = content.slice(1)
      dispatch(changeStickerKeyWord(stickerKey))
      const renderStickersList = listStickers.filter(sticker => words(sticker.host_key).indexOf(stickerKey) !== -1);
      if (renderStickersList.length > 0) {
        setOpenSticker(true)
      }
    }
  }, [chatText, dispatch, listStickers]);

  const onpaste = async function (event) {
    var items = event.clipboardData.items;
    // console.log(JSON.stringify(items)); // will give you the mime types
    const images = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // console.log('Item: ' + item.type);
      if (item.type.indexOf('image') !== -1) {
        //item.
        const file = item.getAsFile();
        const url = await getFileUrl(file)
        images.push({ url, file })
      } else {
        // ignore not images
        // console.log('Discarding not image paste data');
      }
    }
    setImagesQueueUrl(images)
  }

  const handleTriggerUpload = id => {
    document.getElementById(id).click();
  };

  function onUploadingHandler(percent) {
    dispatch(onUploading(percent));
  }

  const handleUploadImage = async e => {
    const { files } = e.target;
    // console.log('upload image', files);
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await getFileUrl(file)
      images.push({ url })
    }

    const data_chat = {
      type: CHAT_TYPE.UPLOADING_IMAGES, images,
      isUploading: true,
      is_me: true,
    }
    dispatch(appendChat({ data_chat }));
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i], files[i].name)
    }
    dispatch(chatImage(taskId, data, onUploadingHandler))
  };

  function onClickDeletePreview(i) {
    return () => {
      // console.log(i)
      const filtered = imagesQueue.filter((img, idx) => idx !== i)
      setImagesQueue([...filtered]);
    }
  }

  const openTag = (evt) => {
    console.log('openTag', evt)
    setOpenMention(true);
  };

  function handleCloseTag() {
    setOpenMention(false)
  }

  const onClickOpenSticker = (evt) => {
    setOpenSticker(!isOpenSticker);
  };

  function handleCloseSticker() {
    setOpenSticker(false)
  }

  function handleClickSticker(id) {
    if (stickerKeyWord) {
      clearChatText()
    }
    dispatch(chatSticker(taskId, id))
    handleCloseSticker()
  }

  function onClickSubTask() {
    dispatch(showTab(2))
  }

  function onClickRemind() {
    // dispatch(showTab(3))
    dispatch(openCreateRemind(true, true))
  }

  function onClickShareFromLibrary() {
    setVisibleSendFile(false)
    setShareFromLib(true)
  }

  function insertMention(label, mention) {
    const tag = ` <span style="color:#03A9F4;">${label}</span>`
    setChatText(chatText + tag)
    // console.log(convertToRaw(newState.getCurrentContent()))
    // focus();
  }

  function handleClickMention(mention) {
    // console.log(mention)
    insertMention(`@${mention.name} `, mention)
    // console.log(convertToRaw(editorState.getCurrentContent()))
    dispatch(tagMember(mention.id))
  }

  const onSearchChange = ({ value }) => {
  };

  const onAddMention = (mention) => {
    // get the mention object selected
    // console.log('onAddMention! ', log)
    dispatch(tagMember(mention.id))
  }

  const focus = () => {
    editorRef.current.focus();
  };

  function sendChatText() {
    const content = chatTextRef.current;
    if (content.trim().length === 0) return;
    dispatch(clearTags());
    const data_chat = {
      id: Date.now(),
      type: CHAT_TYPE.TEXT,
      is_me: true,
      user_create_id: userId,
      task_id: taskId, content,
      parent_id: parentMessage && parentMessage.id,
      tags: tagMembers
    };
    dispatch(appendChat({ data_chat }));
    dispatch(createChatText(data_chat));
    setSelectedChat(null)
    clearChatText()
  }

  async function handleKeyCommand(command) {
    if (command === 'send') {
      // editorRef.current.blur();
      if (imagesQueueUrl.length > 0) {
        const images = [];
        let data = new FormData()
        for (let index = 0; index < imagesQueueUrl.length; index++) {
          const { file, url } = imagesQueueUrl[index];
          images.push({ url })
          data.append("image", file, file.name)
        }
        setImagesQueue([]);
        const data_chat = {
          type: CHAT_TYPE.UPLOADING_IMAGES, images,
          isUploading: true,
          is_me: true,
        }
        dispatch(appendChat({ data_chat }));
        dispatch(chatImage(taskId, data, onUploadingHandler))
        return 'handled';
      }
      sendChatText()
      return 'handled';
    }

    return 'not-handled';
  }

  function sendMessage() {
    if (isShowQuickLike) {
      dispatch(chatQuickLike(taskId))
      editorRef.current.blur();
    } else {
      sendChatText()
    }
  }

  function onKeyDown(event) {
    const keyCode = event.keyCode || event.which
    if (keyCode === 16) {// shift
      isPressShift = true;
    } else if (keyCode === 13 && !isPressShift) {// enter
      sendChatText();
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault()
      // console.log(chatText)
    }
  }

  function onKeyUp(event) {
    const keyCode = event.keyCode || event.which
    isPressShift = false;
    if (keyCode === 50) {// @
      setOpenMention(true)
      focus()
    } else if (keyCode === 32) {// space
      setOpenMention(false)
    }
  }

  function clearChatText() {
    // chatTextRef.current = '';
    setChatText('')
    setShowQuickLike(true)
  }

  function onChangeChatText(value) {
    // chatTextRef.current = value;
    setShowQuickLike(!value)
    setChatText(value)
  }

  useEffect(() => {
    chatTextRef.current = chatText;
  }, [chatText])

  return (
    <div className="footer-chat-container">
      <div className="wrap-function-bar-fp">
        <div>
          <IconButton className="icon-btn" onClick={openTag}>
            <StyledIcon path={mdiAt} size={1.2} hoverColor={groupActiveColor} />
          </IconButton>
          <IconButton className="icon-btn" onClick={onClickOpenSticker}>
            <StyledIcon path={mdiEmoticon} size={1.2} hoverColor={groupActiveColor} />
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
            <StyledIcon path={mdiImage} size={1.2} hoverColor={groupActiveColor} />
          </IconButton>
          <IconButton
            className="icon-btn"
            onClick={() => setVisibleSendFile(true)}
          >
            <StyledIcon path={mdiPaperclip} size={1.2} hoverColor={groupActiveColor} />
          </IconButton>
          <IconButton className="icon-btn" onClick={onClickSubTask}>
            <StyledIcon path={mdiFileTree} size={1.2} hoverColor={groupActiveColor} />
          </IconButton>
          <IconButton className="icon-btn" onClick={onClickRemind}>
            <StyledIcon path={mdiAlarmPlus} size={1.2} hoverColor={groupActiveColor} />
          </IconButton>
        </div>
      </div>
      <Message {...parentMessage} isReply></Message>
      <div className="chatBox--preview">
        {imagesQueueUrl.map(({ url }, i) =>
          <div key={i} className="chatBox--imagePreviewWrap">
            <img className="chatBox--imagePreview" src={url} alt="hd" />
            <IconButton className="chatBox--imagePreviewDelete" onClick={onClickDeletePreview(i)}>
              <Icon path={mdiClose} size={0.6} />
            </IconButton>
          </div>
        )}
      </div>
      <div className="wrap-input-message chatBox" id="input_message"
        onClick={focus}
        onPaste={onpaste}
      >
        <ChatBoxInput
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder="Nhập @ gợi ý, nội dung thảo luận..."
          innerRef={editorRef}
          value={chatText}
          onChange={onChangeChatText}
        />
        <div className="chatBox--send"
          onClick={sendMessage}
          style={{ color: groupActiveColor }}
        >
          {isShowQuickLike ?
            <QuickLikeIcon color={groupActiveColor} />
            : "Gửi"
          }
        </div>
      </div>

      <TagModal
        isOpen={isOpenMention}
        handleClose={handleCloseTag}
        handleClickMention={handleClickMention}
      />
      <StickerModal
        isOpen={isOpenSticker}
        handleClose={handleCloseSticker}
        handleClickSticker={handleClickSticker}
      />
      <SendFileModal
        open={visibleSendFile}
        setOpen={setVisibleSendFile}
        onClickShareFromLibrary={onClickShareFromLibrary}
      />
      <ShareFromLibraryModal
        open={isShareFromLib}
        setOpen={setShareFromLib}
      />
    </div >
  );
};

export default FooterPart;
