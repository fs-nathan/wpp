import { Avatar } from '@material-ui/core';
import { loadChat } from 'actions/chat/chat';
import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import { CHAT_TYPE, isOneOf } from 'helpers/jobDetail/arrayHelper';
import { getChatDate } from 'helpers/jobDetail/stringHelper';
import queryString from 'query-string';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import DetailEmotionModal from './DetailEmotionModal';
import DetailViewedModal from './DetailViewedModal';
import ForwardMessageDialog from './ForwardMessageDialog';
import Message from './Message';
import './styles.scss';

const BodyPart = props => {
  const { t } = useTranslation();
  const chatRef = useRef();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats);
  const userId = useSelector(state => state.system.profile.id);
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)
  const isSending = useSelector(state => state.chat.isSending);
  const isShowSendStatus = useSelector(state => state.chat.isShowSendStatus);
  const viewedChatMembers = useSelector(state => state.chat.viewedChatMembers);

  const [openViewedModal, setOpenViewedModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [isOpenForward, setOpenForward] = React.useState(false);
  const [forwardChat, setForwardChat] = React.useState(null);
  const [chatEmotion, setChatEmotion] = React.useState([]);
  const [openDetailEmotionModal, setOpenDetailEmotionModal] = React.useState(false);
  const [showMembers, setShowMembers] = React.useState(viewedChatMembers);
  const [showedChats, setShowChats] = React.useState(viewedChatMembers);

  const imgNum = 5;
  const plusMember = viewedChatMembers.length - imgNum;
  useEffect(() => {
    if (plusMember > 0) {
      setShowMembers(viewedChatMembers.slice(0, imgNum))
    } else {
      setShowMembers(viewedChatMembers)
    }
    // eslint-disable-next-line
  }, [viewedChatMembers])

  const { total_page, page } = chats.paging || {};
  const currentPage = page === null ? total_page : page
  useEffect(() => {
    const chatData = !Boolean(chats.data) ? [] : chats.data.filter(chat => {
      return !searchChatKey
        || (chat.content && chat.content.indexOf(searchChatKey) !== -1)
    });
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
      const messageStyledTypes = [CHAT_TYPE.FILE, CHAT_TYPE.TEXT, CHAT_TYPE.CHAT_FORWARD_FILE];
      if (
        isOneOf(chat.type, messageStyledTypes)
        && (!prevChat || !isOneOf(prevChat.type, messageStyledTypes))
        && (!nextChat || !isOneOf(nextChat.type, messageStyledTypes))
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
  }, [chats.data, searchChatKey, userId])

  const {
    date_create,
    name,
    description,
    start_date,
    end_date,
    user_create = {},
  } = detailTask || {}
  useEffect(() => {
    let rqId;
    if (chatRef && chatRef.current && chats.data && chats.data.length) {
      rqId = requestAnimationFrame(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
      })
    }
    return () => {
      cancelAnimationFrame(rqId);
    }
  }, [chatRef, chats.data]);
  useEffect(() => {
    const task_id = queryString.parse(props.location.search).task_id
    dispatch(loadChat(task_id));
    // eslint-disable-next-line
  }, []);
  // console.log('chats', chats);
  function onClickCreateMember() {
    setOpenAddModal(true)
    dispatch(getMember({ task_id: taskId }))
    dispatch(getMemberNotAssigned({ task_id: taskId }))
  }

  function handleReplyChat(data) {
    return () => props.setSelectedChat(data)
  }

  function handleForwardChat(data) {
    return () => {
      // console.log('handleForwardChat', data);
      setOpenForward(true);
      setForwardChat(data);
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
  }

  function loadMoreChat() {
    // console.log('loadMoreChat', currentPage)
    if (currentPage > 1)
      dispatch(loadChat(taskId, currentPage - 1, true));
  }

  return (
    <div
      className={clsx("bodyChat", { "bodyChat__reply": props.isReply })}
      ref={chatRef}
    >
      <InfiniteScroll
        className="bodyChat--scroll"
        isReverse
        pageStart={currentPage}
        loadMore={loadMoreChat}
        hasMore={currentPage > 1}
        loader={<div className="bodyChat--loader" key={0}>{t('LABEL_CHAT_TASK_DANG_TAI')}</div>}
        useWindow={false}
        getScrollParent={() => chatRef.current}
      >
        {
          currentPage === 1 && !searchChatKey &&
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
                <div className="bodyChat--notifyName">{`${user_create.name} đã tạo công việc mới`}</div>
                <div className="bodyChat--projectName">{name}</div>
                <div className="bodyChat--projectProgress">{`Tiến độ: ${start_date} - ${end_date}`}</div>
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
        {
          searchChatKey && showedChats.length === 0 &&
          <div className="bodyChat--searchEmpty">
            Không tìm thấy kết quả
          </div>
        }
        {
          showedChats.map((el, id) => <Message {...el}
            key={id}
            handleForwardChat={handleForwardChat(el)}
            handleDetailEmotion={handleDetailEmotion(el)}
            handleReplyChat={handleReplyChat(el)} />)
        }
        {
          isShowSendStatus && !searchChatKey &&
          (
            <div className="bodyChat--sending">
              {isSending ? 'Đang gửi...' : 'Đã gửi'}
            </div>
          )
        }
        {
          viewedChatMembers.length > 0 && !searchChatKey &&
          <div className="bodyChat--viewed" onClick={onClickDetailViewed}>{t('LABEL_CHAT_TASK_DA_XEM')}{showMembers.map(({ avatar, name }, i) =>
            <abbr title={name} key={i}>
              <Avatar className="bodyChat--viewedAvatar" src={avatar} />
            </abbr>
          )}
            {(plusMember > 0) && <Avatar className="bodyChat--viewedAvatar" >{plusMember}</Avatar>}
          </div>
        }
      </InfiniteScroll >
      <ForwardMessageDialog isOpen={isOpenForward} setOpen={setOpenForward} chat={forwardChat} />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
      <DetailEmotionModal isOpen={openDetailEmotionModal} setOpen={setOpenDetailEmotionModal} data_emotion={chatEmotion} />
      <DetailViewedModal isOpen={openViewedModal} setOpen={setOpenViewedModal} />
    </div>
  );
};
export default withRouter(BodyPart);
