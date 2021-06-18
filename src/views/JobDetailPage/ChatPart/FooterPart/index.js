import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiClose, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, changeStickerKeyWord, chatFile, chatForwardFile, chatImage, chatQuickLike, chatSticker, clearTags, createChatFileFromGoogleDriver, createChatText, onUploading, openCreateRemind, tagMember, viewChat } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import { file as file_icon } from 'assets/fileType';
import { FileType } from 'components/FileType';
import { CHAT_TYPE, getFileUrl, filterMembersByKey } from 'helpers/jobDetail/arrayHelper';
import htmlToText from 'helpers/jobDetail/jsHtmlToText';
import { humanFileSize, transformToGoogleFormData } from 'helpers/jobDetail/stringHelper';
import isEmpty from 'lodash/isEmpty';
import words from 'lodash/words';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import StickerModal from 'views/JobDetailPage/ChatComponent/StickerModal';
import TagModal from 'views/JobDetailPage/ChatComponent/TagModal/TagModal';
import { currentColorSelector, makeSelectIsCanView, getNumberChatNotView } from 'views/JobDetailPage/selectors';
import '../Chat.scss';
import ChatBoxInput from './ChatBoxInput';
import QuickLikeIcon from './QuickLikeIcon';
import ReplyChatPreview from './ReplyChatPreview';
import './styles.scss';
import { lastJobSettingKey } from "views/JobDetailPage/ListPart/ListHeader/CreateJobSetting";
import { setNumberDiscustonNotView } from "actions/system/system"

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    color : ${props => props.hoverColor};
    background-color: #f6f6f6;
  }
  &:focus {
    outline: none;
  }
`

const StyledChatBox = styled.div`
  .ChatBoxInput:focus {
    background-color: #fff;
    border-top: 1px solid ${props => props.borderColor};
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
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const type = "not-room"
  const isCanView = useSelector(makeSelectIsCanView(type, taskId));
  const numberNewChatWithoutSelf = useSelector(getNumberChatNotView(taskId));

  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const [keyFilter, setKeyFilter] = useState('');
  const [chatText, setChatText] = useState('');
  const [isOpenMention, setOpenMention] = useState(false);
  const [isOpenSticker, setOpenSticker] = useState(false);
  const [isShowQuickLike, setShowQuickLike] = useState(false);
  const [imagesQueueUrl, setImagesQueueUrl] = useState([]);
  const [clipBoardImages, setClipBoardImages] = useState([]);
  const [membersFiltered, setMembersFiltered] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setMembersFiltered(filterMembersByKey(members, keyFilter));
  }, [keyFilter, members])

  useEffect(() => {
    if (isOpenMention) {
      const text = htmlToText(chatText)
      const lastAy = text.lastIndexOf('@')
      const key = text.slice(lastAy + 1)
        .toLowerCase()
        .replace(/&nbsp;/g, '')
        .trim()
      // console.log(text, lastAy, key)
      setKeyFilter(key)
    } else {
      setKeyFilter('')
    }
  }, [chatText, isOpenMention, members])

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
      setImagesQueueUrl([...clipBoardImages, ...images])
    }
    renderPrepareImages(imagesQueue)
  }, [clipBoardImages, imagesQueue]);

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
        images.push({ url, file, name: `clipboard${i}.png` })
      } else {
        // ignore not images
        // console.log('Discarding not image paste data');
      }
    }
    setClipBoardImages(images)
  }

  const handleTriggerUpload = id => {
    document.getElementById(id).click();
  };

  const onUploadingHandler = useCallback(function (percent, id) {
    dispatch(onUploading(percent, id));
  }, [dispatch])

  const handleUploadImage = useCallback(async e => {
    const { files } = e.target;
    console.log('upload image', files);
    const images = [...clipBoardImages];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const url = await getFileUrl(file)
      const [type] = file.type.split('/')
      images.push({ url, type, name: file.name })
    }
    const id = Date.now();
    const data_chat = {
      id,
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
    for (let i = 0; i < clipBoardImages.length; i++) {
      data.append("image", clipBoardImages[i].file, clipBoardImages[i].name)
    }
    dispatch(chatImage(taskId, data, onUploadingHandler, id))
    document.getElementById('upload_image').value= null
    setClipBoardImages([])
  }, [clipBoardImages, dispatch, onUploadingHandler, taskId, userId]);

  function onClickDeletePreview(i) {
    return () => {
      // console.log(i)
      if (clipBoardImages.length > 0) {
        if (i === 0) {
          setClipBoardImages([])
        } else {
          const filtered = imagesQueue.filter((img, idx) => idx !== i - 1)
          setImagesQueue([...filtered]);
        }
      } else {
        const filtered = imagesQueue.filter((img, idx) => idx !== i)
        setImagesQueue([...filtered]);
      }
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

  const getChatContent = useCallback(function (text) {
    let ret = text;
    for (let index = 0; index < tagMembers.length; index++) {
      const { name, id } = tagMembers[index];
      const reg = new RegExp(`@${name}`, 'g');
      ret = ret.replace(reg, `@${id}`)
    }
    return ret;
  }, [tagMembers])

  const handleClickMention = useCallback(function handleClickMention(mention = {}) {
    const tag = `<span class="chatBox--tag" style="color:#03A9F4;font-size:15px;">@${mention.name}</span>&nbsp;`;
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    const { commonAncestorContainer } = preCaretRange;
    const textContent = commonAncestorContainer.textContent || chatText;
    const atIndex = textContent.lastIndexOf('@');
    // console.log('atIndex', textContent, atIndex, chatText.substr(0, atIndex))
    if (atIndex !== -1) {
      // preCaretRange.setStart(preCaretRange.startContainer, atIndex + 1);
      // console.log('preCaretRange', preCaretRange, preCaretRange.toString())
      // preCaretRange.deleteContents();
      // sel.removeAllRanges();
      // sel.addRange(preCaretRange);
      // // console.log('range', range, range.toString())
      // document.execCommand('delete', false);
      setChatText(chatText.substr(0, atIndex) + tag)
      // document.execCommand('insertHTML', false, tag)
    } else if (isOpenMention) {
      document.execCommand('insertHTML', false, tag)
    }
    dispatch(tagMember(mention))
    // setChatText(newContent)
    setKeyFilter('')
    setOpenMention(false)
    editorRef.current.focus()
  }, [chatText, dispatch, isOpenMention])

  const viewNewMessage = () => {
    if (isCanView) {
      dispatch(viewChat(taskId))
      dispatch(setNumberDiscustonNotView({discustion_change: -1}))
    }
  }

  const focus = () => {
    editorRef.current.focus();
    viewNewMessage()
  };

  const sendChatText = useCallback(function () {
    const content = getChatContent(htmlToText(chatText));
    if (content.trim().length === 0) return;
    dispatch(clearTags());
    const chat_parent = isEmpty(parentMessage) ? undefined : { ...parentMessage, isReply: true }
    const id = Date.now();
    const data_chat = {
      id,
      type: CHAT_TYPE.TEXT,
      is_me: true,
      user_create_id: userId,
      task_id: taskId, content,
      parent_id: parentMessage && parentMessage.id,
      chat_parent,
      tags: tagMembers.map(({ id }) => id)
    };
    dispatch(appendChat({ data_chat: { ...data_chat, tags: tagMembers } }));
    dispatch(createChatText(data_chat, id));
    setSelectedChat(null)
    clearChatText()
  }, [chatText, dispatch, getChatContent, parentMessage, setSelectedChat, tagMembers, taskId, userId])

  const handleUploadFile = useCallback(async e => {
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
    const id = Date.now();
    const data_chat = {
      id,
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
    dispatch(chatFile(taskId, data, onUploadingHandler, id));
  }, [dispatch, onUploadingHandler, taskId, userId]);

  const sendMultipleFiles = useCallback(function () {
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
    if (images.length > 0 || clipBoardImages.length > 0)
      handleUploadImage({ target: { files: images } });
    if (others.length > 0)
      handleUploadFile({ target: { files: others } });
    setImagesQueue([]);
  }, [clipBoardImages.length, handleUploadFile, handleUploadImage, imagesQueue, setImagesQueue])

  const sendMessage = useCallback(function () {
    // console.log('sendMessage', imagesQueue.length)
    sendMultipleFiles()
    if (isShowQuickLike) {
      if (imagesQueue.length === 0) {
        dispatch(chatQuickLike(taskId))
      }
      editorRef.current.blur();
    } else {
      sendChatText()
    }
    viewNewMessage()
  }, [dispatch, imagesQueue.length, isShowQuickLike, sendChatText, sendMultipleFiles, taskId])

  function onChooseMention() {
    handleClickMention(membersFiltered[selectedId])
  }

  function onDeleteChar() {
    const content = getChatContent(htmlToText(chatText));
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const delChar = content.charAt(content.length - 1)
    // console.log('chatText', delChar, content)
    if (delChar === '@') {
      setOpenMention(false)
    }
  }

  function onOpenMention() {
    setTimeout(() => {
      setKeyFilter('')
      setOpenMention(true)
      setSelectedId(0)
      focus()
    }, 0)
  }

  function onPressDown() {
    const newSelect = selectedId === membersFiltered.length - 1 ? 0 : selectedId + 1;
    setSelectedId(newSelect)
  }

  function onPressUp() {
    const newSelect = selectedId === 0 ? membersFiltered.length - 1 : selectedId - 1;
    setSelectedId(newSelect)
  }

  function clearChatText() {
    // chatText = '';
    setChatText('')
    setShowQuickLike(true)
  }

  function onChangeChatText(value) {
    // chatText = value;
    setChatText(value)
  }

  function cancelReply() {
    setSelectedChat(null)
  }

  useEffect(() => {
    setShowQuickLike(!chatText && imagesQueueUrl.length === 0)
  }, [chatText, imagesQueueUrl.length])

  function onConfirmShare(selectedFiles) {
    const googleFiles = selectedFiles.filter(({ isGoogleDocument }) => isGoogleDocument)
    const vtaskFiles = selectedFiles.filter(({ isGoogleDocument }) => !isGoogleDocument)
    if (vtaskFiles.length > 0)
      dispatch(chatForwardFile(taskId, vtaskFiles.map(({ id }) => id)))
    if (googleFiles.length > 0)
      dispatch(createChatFileFromGoogleDriver(taskId, googleFiles.map(transformToGoogleFormData)))
  }

  return (
    <div className="footer-chat-container">
      <div className="wrap-function-bar-fp">
        <div>
          <abbr title={t('LABEL_CHAT_TASK_TAG_THANH_VIEN')}>
            <StyledButton className="icon-btn" onClick={openTag} hoverColor={groupActiveColor}>
              <Icon path={mdiAt} size={1.2} />
            </StyledButton>
          </abbr>
          <abbr title={t('LABEL_CHAT_TASK_GUI_STICKER')}>
            <StyledButton className="icon-btn" onClick={onClickOpenSticker} hoverColor={groupActiveColor}>
              <Icon path={mdiEmoticon} size={1.2} />
            </StyledButton>
          </abbr>
          <abbr title={t('LABEL_CHAT_TASK_GUI_ANH')}>
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
          </abbr>
          <abbr title={t('LABEL_CHAT_TASK_GUI_FILE_TAI_LIEU')}>
            <StyledButton
              className="icon-btn"
              onClick={() => setVisibleSendFile(true)}
              hoverColor={groupActiveColor}>
              <Icon path={mdiPaperclip} size={1.2} />
            </StyledButton>
          </abbr>
          <abbr title={t('LABEL_CHAT_TASK_THEM_NHAC_HEN')}>
            <StyledButton className="icon-btn" onClick={onClickRemind} hoverColor={groupActiveColor}>
              <Icon path={mdiAlarmPlus} size={1.2} />
            </StyledButton>
          </abbr>
        </div>
      </div>
      {parentMessage && <ReplyChatPreview {...parentMessage} cancelReply={cancelReply} />}
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
      <StyledChatBox className="chatBox" id="input_message"
        borderColor={groupActiveColor}
        onClick={focus}
        onPaste={onpaste}
      >
        <ChatBoxInput
          placeholder={t('LABEL_CHAT_TASK_NHAP_GOI_Y_NOI_MESSAGE')}
          innerRef={editorRef}
          value={chatText}
          onChange={onChangeChatText}
          onPressUp={onPressUp}
          isOpenMention={isOpenMention}
          onChooseMention={onChooseMention}
          onDeleteChar={onDeleteChar}
          onOpenMention={onOpenMention}
          onPressDown={onPressDown}
          onSendMessage={sendMessage}
          setOpenMention={setOpenMention}
          sendButtonRef={sendButtonRef}
          groupActiveColor={groupActiveColor}
          labelButton={t('LABEL_CHAT_TASK_GUI')}
          isShowQuickLike={isShowQuickLike}
        />
      </StyledChatBox>
      {
        isOpenMention &&
        <TagModal
          isOpen={isOpenMention}
          handleClose={handleCloseTag}
          handleClickMention={handleClickMention}
          selectedId={selectedId}
          members={membersFiltered}
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
        onConfirmShare={onConfirmShare}
        handleUploadFile={handleUploadFile}
      />
    </div >
  );
};

export default FooterPart;
