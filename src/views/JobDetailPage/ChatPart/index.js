import { IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { appendChat, chatFile, onUploading, searchChat } from 'actions/chat/chat';
import { file as file_icon } from 'assets/fileType';
import clsx from 'clsx';
import SearchInput from 'components/SearchInput';
import { CHAT_TYPE, getFileUrl } from 'helpers/jobDetail/arrayHelper';
import { humanFileSize } from 'helpers/jobDetail/stringHelper';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import BodyPart from './BodyPart';
import FooterPart from './FooterPart';
import HeaderPart from './HeaderPart';
import './styles.scss';

function ChatPart(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)
  const [selectedChat, setSelectedChat] = useState();
  const [isShowSearch, setShowSearch] = useState(false);
  const [imagesQueue, setImagesQueue] = useState([]);

  function onChangeKey(evt) {
    dispatch(searchChat(evt.target.value))
  }

  function hideSearch() {
    setShowSearch(false)
  }
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
      // focus();
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

  return (
    <div className="container-chatpart chatPart"
      {...getRootProps({
        onClick: event => event.stopPropagation()
      })}
    >
      <div className="wrap-header">
        <HeaderPart {...props} setShowSearch={setShowSearch} />
      </div>
      <div className={clsx("chatPart--searchWrap", { 'chatPart__showSearch': isShowSearch })}>
        <SearchInput className="chatPart--search"
          placeholder='Tìm nội dung trong hội thảo' value={searchChatKey} onChange={onChangeKey} />
        <IconButton className="chatPart--close" onClick={hideSearch}>
          <Icon path={mdiClose} size={1.2} className="job-detail-icon" />
        </IconButton>
      </div>
      <BodyPart {...props} setSelectedChat={setSelectedChat} isReply={Boolean(selectedChat)} />
      <div className="wrap-footer">
        <FooterPart {...props}
          parentMessage={selectedChat}
          imagesQueue={imagesQueue}
          setImagesQueue={setImagesQueue}
          setSelectedChat={setSelectedChat} />
      </div>
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="drop-area">
          <div className="dashed-box">
            <div className="des-drop">{('Thả file vào đây')}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPart;
