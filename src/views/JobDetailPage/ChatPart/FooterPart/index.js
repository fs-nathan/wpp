import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiClose, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, changeStickerKeyWord, chatImage, chatQuickLike, chatSticker, clearTags, createChatText, onUploading, openCreateRemind, tagMember } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import { convertToRaw, EditorState, Entity, getDefaultKeyBinding, KeyBindingUtil, Modifier } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import get from 'lodash/get';
import words from 'lodash/words';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import ShareFromLibraryModal from 'views/JobDetailPage/ChatComponent/ShareFromLibraryModal';
import StickerModal from 'views/JobDetailPage/ChatComponent/StickerModal';
import TagModal from 'views/JobDetailPage/ChatComponent/TagModal';
import Message from '../BodyPart/Message';
import '../Chat.scss';
import './styles.scss';

const { isSoftNewlineEvent } = KeyBindingUtil

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;
  const translateY = props.suggestions.length * 20 + 200;

  if (state.isActive && props.suggestions.length > 0) {
    transform = `translateY(-${translateY}px) scaleY(1)`;
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = `translateY(-${translateY}px) scaleY(0)`;
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform,
    transition,
  };
};

function getChatContent({ blocks, entityMap }) {
  const mapBlocks = blocks.map(block => {
    const { text = '', entityRanges = [] } = block;
    let ret = text;
    for (let index = 0; index < entityRanges.length; index++) {
      const { offset, length, key } = entityRanges[index];
      const { data } = entityMap[key];
      // ret = spliceSlice(ret, offset, length, `{${data.mention.id}}`);
      if (data.mention) {
        const reg = new RegExp(`@${data.mention.name}`, 'g');
        ret = ret.replace(reg, `${data.mention.id}`)
      }
    }
    return ret;
  })
  return mapBlocks.join('\n')
}

const mentionPlugin = createMentionPlugin({
  mentionPrefix: '@',
  positionSuggestions,
});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

function myKeyBindingFn(e) {
  if (e.keyCode === 13 /* `enter` key */ && !isSoftNewlineEvent(e)) {
    return 'send';
  }

  return getDefaultKeyBinding(e);
}

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
  const userId = useSelector(state => state.system.profile.order_user_id)
  const listStickers = useSelector(state => state.chat.listStickers);
  const stickerKeyWord = useSelector(state => state.chat.stickerKeyWord);
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))

  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenSticker, setOpenSticker] = useState(false);
  const [isShowQuickLike, setShowQuickLike] = useState(false);
  const [isShareFromLib, setShareFromLib] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
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
    const content = getChatContent(convertToRaw(editorState.getCurrentContent()));
    setShowQuickLike(!content)
  }, [dispatch, editorState]);

  useEffect(() => {
    const content = getChatContent(convertToRaw(editorState.getCurrentContent()));
    if (content[0] === '@' && content.indexOf('\n') !== -1) {
      const stickerKey = content.slice(1)
      dispatch(changeStickerKeyWord(stickerKey))
      const renderStickersList = listStickers.filter(sticker => words(sticker.host_key).indexOf(stickerKey) !== -1);
      if (renderStickersList.length > 0) {
        setOpenSticker(true)
      }
    }
  }, [dispatch, editorState, listStickers]);

  useEffect(() => {
    document.onpaste = async function (event) {
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
          console.log('Discarding not image paste data');
        }
      }
      setImagesQueueUrl(images)
    }
  }, [])

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
    setAnchorEl(evt.currentTarget);
  };

  function handleCloseTag() {
    setAnchorEl(null)
  }

  const onClickOpenSticker = (evt) => {
    setOpenSticker(!isOpenSticker);
  };

  function handleCloseSticker() {
    setOpenSticker(false)
  }

  function handleClickSticker(id) {
    if (stickerKeyWord) {
      setEditorState(EditorState.createEmpty())
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
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const entityKey = Entity.create('mention', 'SEGMENTED', { mention });
    const textWithEntity = Modifier.insertText(currentContent, selection, label, null, entityKey);
    const newState = EditorState.push(editorState, textWithEntity, 'insert-characters')
    setEditorState(newState);
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
    setSuggestions(defaultSuggestionsFilter(value, members))
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
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    // console.log(getChatContent(convertToRaw(editorState.getCurrentContent())))
    // Perform a request to save your contents, set
    // a new `editorState`, etc.
    const content = getChatContent(convertToRaw(editorState.getCurrentContent()));
    if (content.trim().length === 0) return;
    // setTextChat('');
    dispatch(clearTags());
    setEditorState(EditorState.createEmpty())
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

  return (
    <div className="footer-chat-container">
      <div className="wrap-function-bar-fp">
        <div >
          <IconButton className="icon-btn" onClick={openTag}>
            <Icon path={mdiAt} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn" onClick={onClickOpenSticker}>
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
          <IconButton className="icon-btn" onClick={onClickSubTask}>
            <Icon path={mdiFileTree} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn" onClick={onClickRemind}>
            <Icon path={mdiAlarmPlus} size={1.2} />
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
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          placeholder="Nhập @ gợi ý, nội dung thảo luận..."
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
        />
        <div className="chatBox--send"
          onClick={sendMessage}
          style={{ color: groupActiveColor }}
        >
          {isShowQuickLike ?
            <svg version="1.1" x="0px" y="0px"
              width="30px" height="30px"
              viewBox="40 40 50 50"
              className="chatBox--sendIcon"
            >
              <g>
                <path fill={groupActiveColor} d="M51.608,83.699h-3.925c-1.961,0-3.051-3.216-3.051-9.486s1.09-9.486,3.051-9.486h3.925
		c0.962,0,1.742,0.655,1.742,1.459v16.051C53.35,83.043,52.57,83.699,51.608,83.699 M62.483,46.124c0-1.003,0.73-1.776,1.746-1.779
		c2.098,0,6.976,1.378,6.976,9.787c0,2.847-0.346,4.391-0.495,5.416c0,0.003,0,0.006,0,0.01c-0.051,0.407,0.27,0.77,0.689,0.77
		c8.364,0,12.83,2.215,12.83,4.473c0,1.103-0.451,2.099-1.172,2.832c1.248,0.709,2.1,2.018,2.1,3.534
		c0,1.723-1.003,3.182-2.532,3.791c0.478,0.662,0.76,1.472,0.76,2.343c0,1.873-1.121,3.434-2.877,3.922
		c0.164,0.406,0.265,0.846,0.265,1.309c0,2.011-3.384,3.635-11.316,3.635c-5.795,0-9.794-1.034-11.333-1.78
		c-1.131-0.545-2.615-1.534-2.615-4.447V68.368c0-6.513,7.412-8.718,7.412-15.127C62.918,49.207,62.483,47.505,62.483,46.124"/>
              </g>
            </svg>
            : "Gửi"
          }
        </div>
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestions}
          onAddMention={onAddMention}
        />
      </div>

      <TagModal
        anchorEl={anchorEl}
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
