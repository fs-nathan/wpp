import { IconButton } from '@material-ui/core';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { searchChat, loadChat } from 'actions/chat/chat';
import { unPinRemind } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import SearchInput from 'components/SearchInput';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { typesRemind } from '../TabPart/RemindTab/TabBody/RemindItem';
import BodyPart from './BodyPart';
import FooterPart from './FooterPart';
import HeaderPart from './HeaderPart';
import './styles.scss';

function ChatPart(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  // const reminds = useSelector(state => state.taskDetail.taskRemind.remind);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)
  const userId = useSelector(state => state.system.profile.id)
  const pinnedRemind = useSelector(state => state.chat.pinnedRemind)

  const [selectedChat, setSelectedChat] = useState();
  const [isShowSearch, setShowSearch] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [imagesQueue, setImagesQueue] = useState([]);

  useEffect(() => {
    setShowSearch(false)
    dispatch(searchChat(''))
  }, [dispatch, taskId]);

  function onChangeKey(evt) {
    dispatch(searchChat(evt.target.value))
  }

  function onClickSearch() {
    dispatch(loadChat(taskId, undefined, false, undefined, undefined, searchChatKey))
  }

  function hideSearch() {
    setShowSearch(false)
    if (searchChatKey) {
      dispatch(searchChat(''))
      dispatch(loadChat(taskId))
    }
  }

  function onClickClosePin() {
    dispatch(unPinRemind({ remind_id: pinnedRemind.id, taskId }))
  }

  const onDrop = useCallback(async (files = []) => {
    // Do something with the files
    setImagesQueue([...imagesQueue, ...files]);
  }, [imagesQueue])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className="container-chatpart chatPart"
      {...getRootProps({
        onClick: event => event.stopPropagation()
      })}
    >
      <div className="wrap-header">
        <HeaderPart {...props} setShowSearch={setShowSearch} setOpenAddModal={setOpenAddModal}/>
      </div>
      <div className={clsx("chatPart--searchWrap", { 'chatPart__showSearch': isShowSearch })}>
        <SearchInput className="chatPart--search"
          onClickSearch={onClickSearch}
          placeholder={t('LABEL_CHAT_TASK_TIM_NOI_DUNG_TRONG_HOI_THAO')} value={searchChatKey} onChange={onChangeKey} />
        <abbr title={t('LABEL_CHAT_TASK_DONG')}>
          <IconButton className="chatPart--close" onClick={hideSearch}>
            <Icon path={mdiClose} size={1.2} className="job-detail-icon" />
          </IconButton>
        </abbr>
      </div>
      {
        pinnedRemind &&
        <div className={clsx("chatPart--pinRemind", { 'chatPart__showPinRemind': true })}>
          <img className="chatPart--pinImage" src="/images/alarm-clock.png" alt="pin"></img>
          <div className="chatPart--pinRight">
            <div className="chatPart--pinContent">
              {pinnedRemind.content}
            </div>
            <div className="chatPart--pinType">
              {pinnedRemind.type === 0 ?
                t('LABEL_CHAT_TASK_LUC_NGAY', {
                  time_remind: pinnedRemind.time_remind,
                  date_remind: pinnedRemind.date_remind,
                  remind: t(typesRemind[pinnedRemind.type_remind])
                })
                :
                t('LABEL_CHAT_TASK_NHAC_THEO_TIEN_DO', {
                  remind: pinnedRemind.duration.map(dr => `${dr}%`).join(', ')
                })
              }
            </div>
          </div>
          <abbr title={t('LABEL_CHAT_TASK_DONG')}>
            <IconButton className="chatPart--close" onClick={onClickClosePin}>
              <Icon path={mdiClose} size={1.2} className="job-detail-icon" />
            </IconButton>
          </abbr>
        </div>
      }
      <BodyPart {...props} setSelectedChat={setSelectedChat} openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} isReply={Boolean(selectedChat)} />
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
            <div className="des-drop">{t('LABEL_CHAT_TASK_THA_FILE_VAO_DAY')}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPart;
