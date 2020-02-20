import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import AvatarCircleList from '../../../components/AvatarCircleList';
import { CHAT_TYPE } from '../../../helpers/jobDetail/arrayHelper';
import DetailMessage from './DetailMessage';
import RemindMessage from './RemindMessage';
import WrapMessage from './WrapMessage';
import ContentMessage from './ContentMessage';
import QuoteMessage from './QuoteMessage';
import { getListChatService, getListChat } from '../../../actions/chat/chat';
import { isEmpty } from '../../../helpers/utils/isEmpty';

const MemberText = styled(Typography)`
  font-weight: bold;
  color: #7f7f7f;
`;

const SubText = styled(Typography)`
  color: #b1b1b1;
`;

const ProjectText = styled(Typography)`
  color: #00af6e;
  font-weight: bold;
`;

const NotifyText = props => {
  return (
    <div className="wrap-common-row">
      <MemberText>{'Nguyễn Hữu Thành'}</MemberText>
      <SubText>&nbsp;{'đã tạo công việc mới'}</SubText>
    </div>
  );
};

const TimeText = props => {
  return (
    <div className="wrap-time">
      <div className="line" />
      <div className="time">09:03 hôm nay</div>
    </div>
  );
};

const ProjectDetailMessage = props => {
  return (
    <div className="wrap-common-row">
      <div className="wrap-project-message">
        <ProjectText>Xây dựng phương án kinh doanh cho công ty</ProjectText>
        <SubText>Bắt đầu: 09:25 ngày 12/09/2019</SubText>
        <SubText>Kết thúc: 19:00 ngày 22/09/2019</SubText>
        <SubText>Mức độ ưu tiên: Trung bình</SubText>
        <AvatarCircleList total={18} display={4} />
      </div>
    </div>
  );
};

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

// let FAKE_DATA = [
//   { type: 0 },
//   { type: 3, isUser: true, content: 'Test' },
//   {
//     type: 3,
//     content: 'Xây dựng phương án quản lí dự án',
//     name: 'Quan',
//     role: 'Trưởng phòng',
//     projectRole: 'Admin',
//     authorityList: ['Thực hiện']
//   },
//   {
//     type: 3,
//     hideAvatar: true,
//     content: '123456',
//     role: 'Trưởng phòng',
//     projectRole: 'Admin',
//     authorityList: ['Thực hiện']
//   },
//   {
//     type: 3,
//     hideAvatar: true,
//     content: 'Ok em',
//     quote: { name: 'Phong', content: 'Xin phép sếp, em đến muộn 10 phút' },
//     role: 'Trưởng phòng',
//     projectRole: 'Admin',
//     authorityList: ['Thực hiện']
//   }
// ];

const BodyPart = props => {
  let chatRef = null;

  useEffect(() => {
    if (chatRef) {
      chatRef.scrollTop = 700;
      // console.log(chatRef)
      // chatRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatRef]);
  useEffect(() => {
    fetchListChat();
    // eslint-disable-next-line
  }, []);
  const fetchListChat = async () => {
    try {
      const { data } = await getListChatService(
        queryString.parse(props.location.search).task_id
      );
      props.getListChat(data);
    } catch (error) {}
  };
  console.log('chats', props.chats);

  return (
    <div>
      <div ref={ref => (chatRef = ref)}>
        <TimeText />
        <NotifyText />
        <ProjectDetailMessage />
        {/* {FAKE_DATA.map((data, idx) => (
          <Message {...data} key={idx} />
        ))} */}
        {!isEmpty(props.chats.data) &&
          props.chats.data.map(el => <Message {...el} key={el.id} />)}
        {/* <MessageParent isUser content="Tạo project mới" /> */}
        {/* <MessageParent content="Ae triển khai công việc nhé !!!" /> */}
        <DetailMessage />
      </div>
    </div>
  );
};
export default connect(
  state => ({
    chats: state.chat.chats
  }),
  { getListChat }
)(withRouter(BodyPart));
