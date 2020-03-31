import { Avatar } from '@material-ui/core';
import { getListChat, getListChatService } from 'actions/chat/chat';
import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import { CHAT_TYPE } from 'helpers/jobDetail/arrayHelper';
import { isEmpty } from 'helpers/utils/isEmpty';
import queryString from 'query-string';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import ContentMessage from '../ContentMessage';
import DetailMessage from '../DetailMessage';
import QuoteMessage from '../QuoteMessage';
import RemindMessage from '../RemindMessage';
import WrapMessage from '../WrapMessage';
import './styles.scss';

const TextMessage = props => {
  return (
    <WrapMessage {...props}>
      {props.quote && <QuoteMessage {...props.quote} />}
      <ContentMessage content={props.content} />
    </WrapMessage>
  );
};

const Message = props => {
  switch (props.type) {
    case CHAT_TYPE.REMIND_TASK:
      return <RemindMessage {...props} />;
    case CHAT_TYPE.TEXT:
      return <TextMessage {...props} />;
    default:
      return <div>Tin nhắn này bị lỗi hiển thị</div>;
  }
};

const BodyPart = props => {
  const chatRef = useRef();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats)
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [openAddModal, setOpenAddModal] = React.useState(false);

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
      chatRef.current.scrollTop = 700;
      // console.log(chatRef)
      // chatRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatRef]);
  useEffect(() => {
    const fetchListChat = async () => {
      try {
        const { data } = await getListChatService(
          queryString.parse(props.location.search).task_id
        );
        dispatch(getListChat(data));
      } catch (error) { }
    };
    fetchListChat();
    // eslint-disable-next-line
  }, []);
  console.log('chats', chats);
  function onClickCreateMember() {
    setOpenAddModal(true)
    dispatch(getMember({ task_id: taskId }))
    dispatch(getMemberNotAssigned({ task_id: taskId }))
  }
  return (
    <div className="bodyChat" ref={chatRef}>
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
      {!isEmpty(chats.data) &&
        chats.data.map(el => <Message {...el} key={el.id} />)}
      <DetailMessage />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  );
};
export default withRouter(BodyPart);
