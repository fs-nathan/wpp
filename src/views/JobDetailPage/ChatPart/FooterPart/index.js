import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiClose, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, changeStickerKeyWord, chatFile, chatImage, chatQuickLike, chatSticker, clearTags, createChatText, onUploading, openCreateRemind, tagMember } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import { file as file_icon } from 'assets/fileType';
import { FileType } from 'components/FileType';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import htmlToText from 'helpers/jobDetail/jsHtmlToText';
import { humanFileSize } from 'helpers/jobDetail/stringHelper';
import isEmpty from 'lodash/isEmpty';
import words from 'lodash/words';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    color : ${props => props.hoverColor};
    background-color: #f0f0f0;
  }
  &:focus {
    outline: none;
  }
`
let isPressShift = false;

const FooterPart = ({
  parentMessage,
  setSelectedChat,
  imagesQueue,
  setImagesQueue,
}) => {
  const { t } = useTranslation();
  const editorRef = useRef();
  const sendButtonRef = useRef();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
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
  const [imagesQueueUrl, setImagesQueueUrl] = useState([]);

  useEffect(() => {
    async function renderPrepareImages(imagesFiles) {
      const images = [];
      for (let index = 0; index < imagesFiles.length; index++) {
        const file = imagesFiles[index];
        const [type, ext] = file.type.split('/');
        let url = FileType(ext)
        if (type === 'image') {
          url = await getFileUrl(file);
        }
        images.push({ url, file, name: file.name })
      }
      setImagesQueueUrl(images)
    }
    renderPrepareImages(imagesQueue)
  }, [imagesQueue]);

  useEffect(() => {
    const wordsChat = words(chatText)
    if (wordsChat.length > 0) {
      const lastWord = wordsChat[wordsChat.length - 1]
      dispatch(changeStickerKeyWord(lastWord))
      const renderStickersList = listStickers.filter(sticker => words(sticker.host_key).indexOf(lastWord) !== -1);
      if (renderStickersList.length > 0) {
        setOpenSticker(true)
      }
    } else {
      setOpenSticker(false)
      dispatch(changeStickerKeyWord(''))
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
      user_create_id: userId,
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
    setOpenMention(true);
    focus();
  };

  function handleCloseTag() {
    setOpenMention(false)
  }

  const onClickOpenSticker = (evt) => {
    dispatch(changeStickerKeyWord(''))
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

  function handleClickMention(mention) {
    const tag = `<span style="color:#03A9F4;">@${mention.name}</span>&nbsp;`;
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    var preCaretRange = range.cloneRange();
    const { commonAncestorContainer } = preCaretRange;
    const atIndex = commonAncestorContainer.textContent.lastIndexOf('@');
    // console.log('atIndex', commonAncestorContainer, atIndex)
    if (atIndex !== -1 || commonAncestorContainer.textContent === '') {
      preCaretRange.setStart(preCaretRange.startContainer, atIndex + 1);
      // console.log('preCaretRange', preCaretRange, preCaretRange.toString())
      preCaretRange.deleteContents();
      sel.removeAllRanges();
      sel.addRange(preCaretRange);
      // console.log('range', range, range.toString())
      document.execCommand('delete', false)
      document.execCommand('insertHTML', false, tag)
    } else if (isOpenMention) {
      document.execCommand('insertHTML', false, tag)
    }
    dispatch(tagMember(mention))
    // console.log('chatTextRef.current.selectionStart', chatTextRef.current.selectionStart)
    // setChatText(newContent)
  }

  const focus = () => {
    editorRef.current.focus();
  };

  function getChatContent(text) {
    let ret = text;
    for (let index = 0; index < tagMembers.length; index++) {
      const { name, id } = tagMembers[index];
      const reg = new RegExp(`@${name}`, 'g');
      ret = ret.replace(reg, `@${id}`)
    }
    return ret;
  }

  function sendChatText() {
    const content = getChatContent(htmlToText(chatTextRef.current));
    if (content.trim().length === 0) return;
    dispatch(clearTags());
    const chat_parent = isEmpty(parentMessage) ? undefined : { ...parentMessage, isReply: true }
    const data_chat = {
      id: Date.now(),
      type: CHAT_TYPE.TEXT,
      is_me: true,
      user_create_id: userId,
      task_id: taskId, content,
      parent_id: parentMessage && parentMessage.id,
      chat_parent,
      tags: tagMembers.map(({ id }) => id)
    };
    dispatch(appendChat({ data_chat: { ...data_chat, tags: tagMembers } }));
    dispatch(createChatText(data_chat));
    setSelectedChat(null)
    clearChatText()
  }

  const handleUploadFile = async e => {
    const { files } = e.target;
    // console.log('upload file', files);
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await getFileUrl(file)
      images.push({
        url, name: file.name, file_icon,
        size: humanFileSize(file.size)
      })
    }
    const data_chat = {
      type: CHAT_TYPE.UPLOADING_FILE, files: images,
      isUploading: true,
      user_create_id: userId,
      is_me: true,
    }
    dispatch(appendChat({ data_chat }));
    let data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i], files[i].name)
    }
    dispatch(chatFile(taskId, data, onUploadingHandler));
  };

  function sendMultipleFiles() {
    const images = [];
    const others = [];
    for (let index = 0; index < imagesQueue.length; index++) {
      const file = imagesQueue[index];
      const [type] = file.type.split('/');
      if (type === 'image') {
        images.push(file)
      } else {
        others.push(file)
      }
    }
    handleUploadImage({ target: { files: images } });
    handleUploadFile({ target: { files: others } });
    setImagesQueue([]);
  }

  function sendMessage() {
    console.log('sendMessage', imagesQueue.length)
    if (imagesQueue.length > 0) {
      sendMultipleFiles()
    } else if (isShowQuickLike) {
      dispatch(chatQuickLike(taskId))
      editorRef.current.blur();
    } else {
      sendChatText()
    }
  }

  function onKeyDown(event) {
    const keyCode = event.keyCode || event.which
    console.log('onKeyDown', imagesQueue.length)
    if (keyCode === 16) {// shift
      isPressShift = true;
    } else if (keyCode === 13 && !isPressShift) {// enter
      // sendMessage();
      sendButtonRef.current.click();
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault()
    } else if (keyCode === 50 && isPressShift) {// @
      setOpenMention(true)
      focus()
    } else if (keyCode === 32) {// space
      setOpenMention(false)
    }
  }

  function onKeyUp(event) {
    isPressShift = false;
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
          <StyledButton className="icon-btn" onClick={openTag} hoverColor={groupActiveColor}>
            <Icon path={mdiAt} size={1.2} />
          </StyledButton>
          <StyledButton className="icon-btn" onClick={onClickOpenSticker} hoverColor={groupActiveColor}>
            <Icon path={mdiEmoticon} size={1.2} />
          </StyledButton>
          <StyledButton
            className="icon-btn"
            onClick={() => handleTriggerUpload('upload_image')}
            hoverColor={groupActiveColor} >
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
          </StyledButton>
          <StyledButton
            className="icon-btn"
            onClick={() => setVisibleSendFile(true)}
            hoverColor={groupActiveColor}>
            <Icon path={mdiPaperclip} size={1.2} />
          </StyledButton>
          <StyledButton className="icon-btn" onClick={onClickSubTask} hoverColor={groupActiveColor}>
            <Icon path={mdiFileTree} size={1.2} />
          </StyledButton>
          <StyledButton className="icon-btn" onClick={onClickRemind} hoverColor={groupActiveColor}>
            <Icon path={mdiAlarmPlus} size={1.2} />
          </StyledButton>
        </div>
      </div>
      <Message {...parentMessage} isReply></Message>
      {imagesQueueUrl.length ? <div className="chatBox--preview">
        {imagesQueueUrl.map(({ url, name }, i) =>
          <div key={i} className="chatBox--imagePreviewWrap">
            <img className="chatBox--imagePreview" src={url} alt="hd" />
            <IconButton className="chatBox--imagePreviewDelete" onClick={onClickDeletePreview(i)}>
              <Icon path={mdiClose} size={0.6} />
            </IconButton>
            <div className="chatBox--namePreview" >{name}</div>
          </div>
        )}
      </div> : null}
      <div className="chatBox" id="input_message"
        onClick={focus}
        onPaste={onpaste}
      >
        <ChatBoxInput
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={t('LABEL_CHAT_TASK_NHAP_GOI_Y_NOI')}
          innerRef={editorRef}
          value={chatText}
          onChange={onChangeChatText}
        />
        <div className="chatBox--send"
          onClick={sendMessage}
          ref={sendButtonRef}
          style={{ color: groupActiveColor }}
        >
          {isShowQuickLike ?
            <QuickLikeIcon color={groupActiveColor} />
            : "Gửi"
          }
        </div>
      </div>
      {
        isOpenMention &&
        <TagModal
          isOpen={isOpenMention}
          handleClose={handleCloseTag}
          handleClickMention={handleClickMention}
        />
      }
      {
        isOpenSticker &&
        <StickerModal
          isOpen={isOpenSticker}
          handleClose={handleCloseSticker}
          handleClickSticker={handleClickSticker}
        />
      }
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
