import { Avatar } from '@material-ui/core';
import { loadChat } from 'actions/chat/chat';
import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import queryString from 'query-string';
import React, { useEffect, useRef } from 'react';
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
      const time_create = (chat.time_create || '').slice(-10);
      // console.log(time_create.slice(-10), 'time_create')
      if (prevChat && time_create && prevChat.time_create && prevChat.time_create.slice(-10) !== time_create) {
        chatsWithTime.push({ type: CHAT_TYPE.DATE_TIME_CHAT_HISTORY, time_create })
      }
      chatsWithTime.push(chat)
    }
    const calculatedChats = chatsWithTime.map((chat, i) => {
      let chatPosition = 'top';
      const prevChat = chatsWithTime[i - 1];
      const nextChat = chatsWithTime[i + 1]
      if (
        (chat.type === CHAT_TYPE.FILE || chat.type === CHAT_TYPE.TEXT || chat.type === CHAT_TYPE.CHAT_FORWARD_FILE)
        && (!prevChat || (prevChat.type !== CHAT_TYPE.FILE && prevChat.type !== CHAT_TYPE.TEXT && prevChat.type !== CHAT_TYPE.CHAT_FORWARD_FILE))
        && (!nextChat || (nextChat.type !== CHAT_TYPE.FILE && nextChat.type !== CHAT_TYPE.TEXT && nextChat.type !== CHAT_TYPE.CHAT_FORWARD_FILE))
      ) {
        chatPosition = 'one';
      }
      else if (prevChat && (prevChat.type === CHAT_TYPE.FILE || prevChat.type === CHAT_TYPE.TEXT)) {
        if (prevChat.user_create_id === chat.user_create_id) {
          chatPosition = 'mid';
          if (!nextChat || nextChat.user_create_id !== chat.user_create_id
            || (nextChat.type !== CHAT_TYPE.FILE && nextChat.type !== CHAT_TYPE.TEXT && nextChat.type !== CHAT_TYPE.CHAT_FORWARD_FILE)) {
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
    if (chatRef && chatRef.current && chats.data && chats.data.length) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
      // console.log(chatRef)
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
        loader={<div className="bodyChat--loader" key={0}>Đang tải ...</div>}
        useWindow={false}
        getScrollParent={() => chatRef.current}
      >
        {
          currentPage === 1 &&
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
                  className="bodyChat--buttonAddMember">
                  + Thêm thành viên
            </button>
              </div>
            </div>
            <div className="bodyChat--introRow">
              <div className="bodyChat--introImages">
                <div className="bodyChat--introItem bodyChat--introItem__left">
                  <img alt="intro" src="/images/intro/intro-bg-2.png"></img>
                  <div className="bodyChat--introTitle">
                    Thảo luận
                  </div>
                </div>
                <div className="bodyChat--introItem">
                  <img alt="intro" src="/images/intro/intro-bg-3.png"></img>
                  <div className="bodyChat--introTitle">
                    Quản lý
                  </div>
                </div>
                <div className="bodyChat--introItem bodyChat--introItem__right">
                  <img alt="intro" src="/images/intro/intro-bg-4.png"></img>
                  <div className="bodyChat--introTitle">
                    Chia sẻ
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        }
        {
          showedChats.map((el, id) => <Message {...el}
            key={id}
            handleForwardChat={handleForwardChat(el)}
            handleDetailEmotion={handleDetailEmotion(el)}
            handleReplyChat={handleReplyChat(el)} />)
        }
        {
          isShowSendStatus &&
          (
            <div className="bodyChat--sending">
              {isSending ? 'Đang gửi...' : 'Đã gửi'}
            </div>
          )
        }
        {
          viewedChatMembers.length > 0 &&
          <div className="bodyChat--viewed" onClick={onClickDetailViewed}>
            Đã xem {showMembers.map(({ avatar, name }, i) =>
            <abbr title={name}>
              <Avatar key={i} className="bodyChat--viewedAvatar" src={avatar} />
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
