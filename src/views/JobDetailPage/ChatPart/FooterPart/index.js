import { IconButton } from '@material-ui/core';
import { mdiAlarmPlus, mdiAt, mdiClose, mdiCloudUploadOutline, mdiEmoticon, mdiFileTree, mdiImage, mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, chatFile, chatImage, chatSticker, clearTags, createChatText, loadChat, onUploading } from 'actions/chat/chat';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import { file as file_icon } from 'assets/fileType';
import { convertToRaw, EditorState, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import { humanFileSize } from 'helpers/jobDetail/stringHelper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import SendFileModal from 'views/JobDetailPage/ChatComponent/SendFile/SendFileModal';
import StickerModal from 'views/JobDetailPage/ChatComponent/StickerModal';
import TagModal from 'views/JobDetailPage/ChatComponent/TagModal';
import RemindModal from 'views/JobDetailPage/TabPart/RemindTab/RemindModal';
import Message from '../BodyPart/Message';
import '../Chat.scss';
import './styles.scss';

const { isSoftNewlineEvent } = KeyBindingUtil

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;
  const translateY = props.suggestions.length * 50 + 10;

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

function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

function getChatContent({ blocks, entityMap }) {
  const mapBlocks = blocks.map(block => {
    const { text = '', entityRanges = [] } = block;
    let ret = text;
    for (let index = 0; index < entityRanges.length; index++) {
      const { offset, length, key } = entityRanges[index];
      const { data } = entityMap[key];
      // ret = spliceSlice(ret, offset, length, `{${data.mention.id}}`);
      ret = ret.replace(data.mention.name, `{${data.mention.id}}`)
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

const added = [];

const FooterPart = ({
  parentMessage,
  setSelectedChat,
}) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const tagMembers = useSelector(state => state.chat.tagMembers);

  const [textChat, setTextChat] = useState('');
  const [visibleSendFile, setVisibleSendFile] = useState(false);
  const [isOpenRemind, setOpenRemind] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSticker, setAnchorElSticker] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [suggestions, setSuggestions] = useState(members);
  const [imagesQueue, setImagesQueue] = useState([]);
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

  const handleUploadImage = useCallback(async e => {
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
  });

  const onDrop = useCallback(async (files = []) => {
    // Do something with the files
    function onUploadingHandler(percent) {
      dispatch(onUploading(percent));
    }
    // console.log('onDrop', files)
    const isAllImages = files.every(file => file.type.indexOf('image') !== -1);
    if (isAllImages) {
      // handleUploadImage({ target: { files } })
      setImagesQueue([...imagesQueue, ...files]);
      focus();
    } else {
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
        is_me: true,
      }
      dispatch(appendChat({ data_chat }));
      let data = new FormData()
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i], files[i].name)
      }
      dispatch(chatFile(taskId, data, onUploadingHandler));
    }
  }, [dispatch, imagesQueue, taskId])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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

  const openSticker = (evt) => {
    setAnchorElSticker(evt.currentTarget);
  };

  function handleCloseSticker() {
    setAnchorElSticker(null)
  }

  function onChangeTextChat(event) {
    setTextChat(event.target.value)
  }

  function handleClickSticker(id) {
    dispatch(chatSticker(taskId, id))
    setAnchorElSticker(null)
  }

  function onClickSubTask() {
    dispatch(showTab(2))
  }

  function onClickRemind() {
    // dispatch(showTab(3))
    setOpenRemind(true)
  }

  async function onKeyDownChat(event) {
    if (event.key === "Escape") {
      setSelectedChat(null)
    }
  }

  async function onKeyPressChat(event) {
    console.log('enter press here! ', event.which)
    if (textChat.trim().length === 0) return;
    if (event.key === 'Enter' || event.which === 13) {
      setTextChat('');
      dispatch(clearTags());
      try {
        const { data } = await createChatText({
          task_id: taskId, content: textChat,
          parent_id: parentMessage && parentMessage.id,
          tags: tagMembers.map(index => members[index].id)
        });
        // dispatch(appendChat(data));
        dispatch(loadChat(taskId));
      } catch (error) {
        console.error('error here! ', error)
      }
      setSelectedChat(null)
    }
  }

  const onSearchChange = ({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, members))
  };

  const onAddMention = (mention) => {
    // get the mention object selected
    // console.log('onAddMention! ', log)
    added.push(mention.id)
  }

  const focus = () => {
    editorRef.current.focus();
  };

  async function handleKeyCommand(command) {
    if (command === 'send') {
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
      // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
      // console.log(getChatContent(convertToRaw(editorState.getCurrentContent())))
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      const content = getChatContent(convertToRaw(editorState.getCurrentContent()));
      if (content.trim().length === 0) return;
      // setTextChat('');
      // dispatch(clearTags());
      setEditorState(EditorState.createEmpty())
      try {
        const { data } = await createChatText({
          task_id: taskId, content,
          parent_id: parentMessage && parentMessage.id,
          tags: tagMembers.map(index => members[index].id)
        });
        // dispatch(appendChat(data));
        dispatch(loadChat(taskId));
      } catch (error) {
        console.error('error here! ', error)
      }
      setSelectedChat(null)
      return 'handled';
    }

    return 'not-handled';
  }

  return (
    <div className="footer-chat-container">
      <div className="wrap-function-bar-fp">
        <div >
          <IconButton className="icon-btn" onClick={openTag}>
            <Icon path={mdiAt} size={1.2} />
          </IconButton>
          <IconButton className="icon-btn" onClick={openSticker}>
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
        {/* <div>
          <IconButton className="icon-btn">
            <img
              src={IconLike}
              alt="vtask_like_icon"
              style={{ width: 25, height: 25 }}
            />
          </IconButton>
        </div> */}
      </div>
      <Message {...parentMessage} isReply></Message>
      {/* {tagMembers.map(index => <span key={index} className="footerChat--tag">@{members[index].name}</span>)} */}
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
        {...getRootProps({
          onClick: event => event.stopPropagation()
        })}
        onClick={focus}
      >
        {/* <input
          onKeyPress={onKeyPressChat}
          onKeyDown={onKeyDownChat}
          className="chat-input"
          type="text"
          value={textChat}
          onChange={onChangeTextChat}
          placeholder="Nhập @ gợi ý, nội dung thảo luận..."
        /> */}
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
          placeholder="Nhập @ gợi ý, nội dung thảo luận..."
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
        />
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestions}
          onAddMention={onAddMention}
        />
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="drop-area">
            <div className="dashed-box">
              <Icon
                className="drop-ic-clould"
                path={mdiCloudUploadOutline}
                size={5}
                color={'#c3c3c3'}
              />
              <div className="des-drop">{('IDS_WP_DRAG_FILE')}</div>
            </div>
          </div>
        )}
      </div>

      <TagModal
        anchorEl={anchorEl}
        handleClose={handleCloseTag}
      />
      <StickerModal
        anchorEl={anchorElSticker}
        handleClose={handleCloseSticker}
        handleClickSticker={handleClickSticker}
      />
      <SendFileModal
        open={visibleSendFile}
        setOpen={() => setVisibleSendFile(false)}
      />
      <RemindModal isOpen={isOpenRemind} setOpen={setOpenRemind} isCreate />
    </div>
  );
};

export default FooterPart;
