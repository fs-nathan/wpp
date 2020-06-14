import { Avatar, IconButton } from '@material-ui/core';
import { mdiMenuDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { forwardMessage, getViewedChat, loadChat, clearFocus } from 'actions/chat/chat';
import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import { CHAT_TYPE, isOneOf } from 'helpers/jobDetail/arrayHelper';
import { getChatDate } from 'helpers/jobDetail/stringHelper';
import React, { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import DetailEmotionModal from './DetailEmotionModal';
import DetailViewedModal from './DetailViewedModal';
import Message from './Message';
import './styles.scss';

let lastScroll = 0;

const BodyPart = props => {
  const { t } = useTranslation();
  const chatRef = useRef();
  const chatRefScroll = useRef();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats);
  const isMore = useSelector(state => state.chat.isMore);
  const isLoading = useSelector(state => state.chat.isLoading);
  const userId = useSelector(state => state.system.profile.id);
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)
  const isSending = useSelector(state => state.chat.isSending);
  const isShowSendStatus = useSelector(state => state.chat.isShowSendStatus);
  const viewedChatMembers = useSelector(state => state.chat.viewedChatMembers);
  const focusId = useSelector(state => state.chat.focusId);
  const focusTopId = useSelector(state => state.chat.focusTopId);

  const [isCanLoadMore, setCanLoadMore] = React.useState(false);
  const [isMyLastChat, setMyLastChat] = React.useState(false);
  const [isShowScroll, setShowScroll] = React.useState(false);
  const [openViewedModal, setOpenViewedModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [chatEmotion, setChatEmotion] = React.useState([]);
  const [openDetailEmotionModal, setOpenDetailEmotionModal] = React.useState(false);
  const [showMembers, setShowMembers] = React.useState(viewedChatMembers);
  const [showedChats, setShowChats] = React.useState(viewedChatMembers);

  const imgNum = 5;
  const plusMember = viewedChatMembers.length - imgNum;

  useEffect(() => {
    let rqId;
    if (focusId) {
      // console.log('focusId', focusId)
      const ele = document.getElementById(focusId)
      if (ele) {
        rqId = setTimeout(function () {
          ele.scrollIntoView({ block: "end", inline: "nearest", behavior: 'smooth' })
          dispatch(clearFocus());
        }, 10)
      }
    } else if (focusTopId) {
      const ele = document.getElementById(focusTopId);
      if (ele) {
        // console.log('focusTopId', ele.offsetTop)
        rqId = setTimeout(function () {
          chatRef.current.scrollTop(ele.offsetTop)
          // ele.scrollIntoView({ block: "start", inline: "nearest", behavior: 'auto' })
          dispatch(clearFocus());
        }, 10)
      }
    }
    return () => {
      clearTimeout(rqId);
    }
  })

  useEffect(() => {
    if (plusMember > 0) {
      setShowMembers(viewedChatMembers.slice(0, imgNum))
    } else {
      setShowMembers(viewedChatMembers)
    }
    // eslint-disable-next-line
  }, [viewedChatMembers])

  const { last_id } = chats || {};

  useEffect(() => {
    // const chatData = !Boolean(chats.data) ? [] : chats.data.filter(chat => {
    //   return !searchChatKey
    //     || (chat.content && chat.content.indexOf(searchChatKey) !== -1)
    // });
    setMyLastChat(chats.data && chats.data.length > 0 && chats.data[0].user_create_id === userId)
    const chatData = [...chats.data]
    chatData.reverse();
    const chatsWithTime = [];
    for (let index = 0; index < chatData.length; index++) {
      const chat = chatData[index];
      const prevChat = chatData[index - 1];
      const time_create = getChatDate(chat.time_create);
      // console.log(time_create.slice(-10), 'time_create')
      if (prevChat && time_create && prevChat.time_create && getChatDate(prevChat.time_create) !== time_create) {
        chatsWithTime.push({ type: CHAT_TYPE.DATE_TIME_CHAT_HISTORY, time_create })
      }
      chatsWithTime.push(chat)
    }
    const calculatedChats = chatsWithTime.map((chat, i) => {
      let chatPosition = 'top';
      const prevChat = chatsWithTime[i - 1];
      const nextChat = chatsWithTime[i + 1];
      const messageStyledTypes = [CHAT_TYPE.FILE, CHAT_TYPE.TEXT, CHAT_TYPE.CHAT_FORWARD_FILE, CHAT_TYPE.QUICK_LIKE];
      if (
        isOneOf(chat.type, messageStyledTypes)
        && (!prevChat || !isOneOf(prevChat.type, messageStyledTypes) || prevChat.user_create_id !== chat.user_create_id)
        && (!nextChat || !isOneOf(nextChat.type, messageStyledTypes) || nextChat.user_create_id !== chat.user_create_id)
      ) {
        chatPosition = 'one';
      }
      else if (prevChat && isOneOf(prevChat.type, messageStyledTypes)) {
        if (prevChat.user_create_id === chat.user_create_id) {
          chatPosition = 'mid';
          if (!nextChat || nextChat.user_create_id !== chat.user_create_id
            || !isOneOf(nextChat.type, messageStyledTypes)) {
            chatPosition = 'bot';
          }
        }
      }
      return { ...chat, chatPosition, is_me: userId === chat.user_create_id }
    })
    setShowChats(calculatedChats)
  }, [chats.data, userId])

  const {
    date_create,
    name = '',
    description,
    start_date = '',
    end_date = '',
    user_create = {},
  } = detailTask || {};

  useEffect(() => {
    setCanLoadMore(!!last_id && !isLoading && chats.data.length > 0)
  }, [chats.data.length, isLoading, last_id])

  useEffect(() => {
    chatRef.current && chatRef.current.scrollToBottom()
    // eslint-disable-next-line
  }, [taskId])

  useEffect(() => {
    let rqId;
    if (chatRef && chatRef.current && chats.data && chats.data.length
      && !isMore && !isLoading && !focusId) {
      rqId = setTimeout(function () {
        // chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
        chatRef.current.scrollToBottom()
      }, 0)
    }
    return () => {
      clearTimeout(rqId);
    }
    // eslint-disable-next-line
  }, [chatRef, taskId, chats.data.length, isLoading, focusId]);

  // useEffect(() => {
  //   let rqId;
  //   if (isLoading) {
  //     const scrollHeight = chatRef.current.getScrollHeight()
  //     const scrollTop = scrollHeight - lastScroll
  //     // console.log('getScrollTop()', scrollHeight, lastScroll, scrollTop)
  //     rqId = setTimeout(function () {
  //       requestAnimationFrame(() => {
  //         // chatRef.current.scrollTop = 250
  //         // chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
  //         chatRef.current.scrollTop(scrollTop)
  //       })
  //     })
  //     lastScroll = scrollHeight
  //   }
  //   return () => {
  //     clearTimeout(rqId);
  //   }
  // }, [isLoading])

  // console.log('chats', chats);
  function onClickCreateMember() {
    setOpenAddModal(true)
    dispatch(getMember({ task_id: taskId }))
    dispatch(getMemberNotAssigned({ task_id: taskId }))
  }

  function onClickScrollToBottom(data) {
    if (isMore === false) {
      dispatch(loadChat(taskId));
    } else {
      chatRef.current.scrollToBottom()
    }
  }

  function handleReplyChat(data) {
    return () => props.setSelectedChat(data)
  }

  function handleForwardChat(data) {
    return () => {
      // console.log('handleForwardChat', data);
      dispatch(forwardMessage(true, data));
    }
  }

  function handleDetailEmotion(data) {
    return () => {
      setOpenDetailEmotionModal(true);
      // dispatch(getEmotionsReactMember(taskId, data.id, 0));
      setChatEmotion(data.data_emotion)
    }
  }

  function onClickDetailViewed(data) {
    setOpenViewedModal(true);
    dispatch(getViewedChat(taskId));
  }

  function loadMoreChat() {
    // console.log('loadMoreChat', currentPage)
    if (last_id && !isLoading)
      dispatch(loadChat(taskId, last_id, true));
  }

  function handleScrollFrame(data) {
    const { scrollTop, scrollHeight, clientHeight } = data;
    // console.log('handleScrollFrame', scrollTop < scrollHeight - 1000)
    if (scrollTop < scrollHeight - clientHeight * 3) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
  }

  function onScrollStop() {
    const scrollTop = chatRef.current.getScrollTop()
    if (isCanLoadMore && scrollTop < 10) {
      loadMoreChat()
    }
  }

  return (
    <div
      className={clsx("bodyChat", { "bodyChat__reply": props.isReply })}
    >
      <Scrollbars autoHide autoHideTimeout={500}
        ref={chatRef}
        onScrollFrame={handleScrollFrame}
        onScrollStop={onScrollStop}
        renderView={props => <div {...props} ref={chatRefScroll} className="bodyChat--scrollWrap" />}
      >
        <div
          className="bodyChat--scroll"
        // isReverse
        // loadMore={loadMoreChat}
        // hasMore={isCanLoadMore}
        // loader={<div className="bodyChat--loader" key={0}>{t('LABEL_CHAT_TASK_DANG_TAI')}</div>}
        // useWindow={false}
        // getScrollParent={() => chatRefScroll.current}
        >
          {
            !last_id && !searchChatKey &&
            <React.Fragment>
              <div className="wrap-time">
                <div className="time">{date_create}</div>
              </div>
              <div className="wrap-common-row">
                <div className="bodyChat--project">
                  <Avatar
                    alt="creator"
                    src={user_create.avatar}
                    className="bodyChat--projectAvatar"
                  />
                  <div className="bodyChat--notifyName">{t('LABEL_CHAT_TASK_DA_TAO_CONG_VIEC_MOI', { name: user_create.name || '' })}</div>
                  <div className="bodyChat--projectName">{name}</div>
                  <div className="bodyChat--projectProgress">{t('LABEL_CHAT_TASK_TIEN_DO_FROM_TO', { start_date, end_date })}</div>
                  <button onClick={onClickCreateMember}
                    className="bodyChat--buttonAddMember">{t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}</button>
                </div>
              </div>
              <div className="bodyChat--introRow">
                <div className="bodyChat--introImages">
                  <div className="bodyChat--introItem bodyChat--introItem__left">
                    <img alt="intro" src="/images/intro/intro-bg-2.png"></img>
                    <div className="bodyChat--introTitle">{t('LABEL_CHAT_TASK_THAO_LUAN')}</div>
                  </div>
                  <div className="bodyChat--introItem">
                    <img alt="intro" src="/images/intro/intro-bg-3.png"></img>
                    <div className="bodyChat--introTitle">{t('LABEL_CHAT_TASK_QUAN_LY')}</div>
                  </div>
                  <div className="bodyChat--introItem bodyChat--introItem__right">
                    <img alt="intro" src="/images/intro/intro-bg-4.png"></img>
                    <div className="bodyChat--introTitle">{t('LABEL_CHAT_TASK_CHIA_SE')}</div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
          {isLoading && isMore &&
            <div className="bodyChat--loader" key={0}>{t('LABEL_CHAT_TASK_DANG_TAI')}</div>
          }
          {
            showedChats.length === 0 && searchChatKey &&
            <div className="bodyChat--searchEmpty">
              <img src="/images/ic_not_found.png" alt="no result" />
              <br />
              {t('LABEL_CHAT_TASK_KHONG_TIM_THAY_KET_QUA')}</div>
          }
          {
            showedChats.map((el, id) => <Message {...el}
              key={id}
              handleForwardChat={handleForwardChat(el)}
              handleDetailEmotion={handleDetailEmotion(el)}
              handleReplyChat={handleReplyChat(el)} />)
          }
          <div id="chatStatusDiv" className="bodyChat--chatStatus">
            {
              viewedChatMembers.length > 0 &&
              <div className="bodyChat--viewed" onClick={onClickDetailViewed}>{t('LABEL_CHAT_TASK_DA_XEM')}
                {showMembers.map(({ avatar, name }, i) =>
                  <abbr title={name} key={i}>
                    <Avatar className="bodyChat--viewedAvatar" src={avatar} />
                  </abbr>
                )}
                {(plusMember > 0) && <Avatar className="bodyChat--viewedAvatar" >{plusMember}</Avatar>}
              </div>
            }
            {
              isShowSendStatus && isMyLastChat &&
              (
                <div className="bodyChat--sending">
                  {isSending ? t('LABEL_CHAT_TASK_DANG_GUI') : t('LABEL_CHAT_TASK_DA_GUI')}
                </div>
              )
            }
          </div>
        </div >
      </Scrollbars>
      {(isShowScroll || isMore === false) &&
        <IconButton className="bodyChat--buttonToBot" onClick={onClickScrollToBottom}>
          <Icon path={isMore === false ? mdiClose : mdiMenuDown} size={1.5} ></Icon>
        </IconButton>
      }
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
      <DetailEmotionModal isOpen={openDetailEmotionModal} setOpen={setOpenDetailEmotionModal} data_emotion={chatEmotion} />
      <DetailViewedModal isOpen={openViewedModal} setOpen={setOpenViewedModal} />
    </div>
  );
};
export default withRouter(BodyPart);
