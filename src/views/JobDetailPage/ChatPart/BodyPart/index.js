import { Avatar } from '@material-ui/core';
import { loadChat } from 'actions/chat/chat';
import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import queryString from 'query-string';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import ForwardMessageDialog from './ForwardMessageDialog';
import Message from './Message';
import './styles.scss';

const BodyPart = props => {
  const chatRef = useRef();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats);
  // const userId = useSelector(state => state.system.profile.order_user_id)
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const searchChatKey = useSelector(state => state.chat.searchChatKey)

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [isOpenForward, setOpenForward] = React.useState(false);
  const [forwardChat, setForwardChat] = React.useState(false);
  const chatData = !Boolean(chats.data) ? [] : chats.data.filter(chat => {
    return !searchChatKey
      || (chat.content && chat.content.indexOf(searchChatKey) !== -1)
  });
  chatData.reverse();
  const calculatedChats = chatData.map((chat, i) => {
    let chatPosition = 'top';
    const prevChat = chatData[i - 1];
    if (prevChat && prevChat.user_create_id === chat.user_create_id) {
      chatPosition = 'mid';
      const nextChat = chatData[i + 1]
      if (!nextChat || nextChat.user_create_id !== chat.user_create_id) {
        chatPosition = 'bot';
      }
    }
    return { ...chat, chatPosition }
  })
  // console.log(calculatedChats, 'calculatedChats')
  const {
    date_create,
    name,
    description,
    start_date,
    end_date,
    user_create = {},
  } = detailTask || {}
  useEffect(() => {
    if (chatRef && chatRef.current) {
      // chatRef.current.scrollTop = chatRef.current.scrollHeight;
      // console.log(chatRef)
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
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

  return (
    <div className={clsx("bodyChat", { "bodyChat__reply": props.isReply })} >
      <div className="wrap-time">
        <div className="line" />
        <div className="time">{date_create}</div>
      </div>
      <div className="wrap-common-row">
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
      <div className="wrap-common-row">
        <div className="bodyChat--introImages">
          <div className="bodyChat--introItem">
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
          <div className="bodyChat--introItem">
            <img alt="intro" src="/images/intro/intro-bg-4.png"></img>
            <div className="bodyChat--introTitle">
              Chia sẻ
          </div>
          </div>
        </div>
      </div>
      {
        calculatedChats.map((el, id) => <Message {...el}
          key={id}
          handleForwardChat={handleForwardChat(el)}
          handleReplyChat={handleReplyChat(el)} />)
      }
      <div ref={chatRef} />
      <ForwardMessageDialog isOpen={isOpenForward} setOpen={setOpenForward} chat={forwardChat} />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  );
};
export default withRouter(BodyPart);
