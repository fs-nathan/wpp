import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import CommonMessageAction from '../CommonMessageAction';
import FileMessage from '../FileMessage';
import ImageMessage from '../ImageMessage';
import './styles.scss';

function getChatParent(chat_parent) {
  if (!chat_parent) return null;
  if (chat_parent.type === 1)
    return <FileMessage {...chat_parent} isReply></FileMessage>
  if (chat_parent.type === 2)
    return <ImageMessage {...chat_parent} isReply></ImageMessage>
  return <TextMessage {...chat_parent} isReply></TextMessage>
}

function getContentMention(content = '', members, color) {
  if (!content) return '';
  let ret = content;
  const reg = /@{(.*?)}/g;
  const matches = content.match(reg);
  if (matches && matches.length) {
    for (let index = 0; index < matches.length; index++) {
      const element = matches[index];
      const mentionId = element.replace('@', '').replace('{', '').replace('}', '');
      const member = members.find(({ id }) => mentionId === id);
      ret = ret.replace(element,
        `<span className="TextMessage--tag" style={{ color: ${color} }}>@${member.name}</span>`
        // `@${member.name}`
      );
    }
  }
  // console.log(matches)
  // return matches.join(' ')
  return ret;
}

const TextMessage = ({
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
  tags = [],
  data_emotion = [],
}) => {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  const members = useSelector(state => state.chat.members);

  function getColor() {
    if (isReply) return "#5b5b5b"
    if (is_me) return "#fff"
    return groupActiveColor;
  }

  return (
    <div className={clsx("TextMessage", `TextMessage__${chatPosition}`)}  >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
      }
      {!isReply && is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
      <div className={clsx("TextMessage--rightContentWrap",
        `TextMessage--rightContentWrap__${chatPosition}`,
        {
          "TextMessage--reply": isReply,
          "TextMessage--rightContentWrap__self": is_me,
          "TextMessage--rightContentWrap__haveParent": Boolean(chat_parent)
        })}
      >
        {
          ((chatPosition === 'top' && !is_me) || isReply) &&
          <div className="TextMessage--sender"  >
            {isReply &&
              <Avatar className="TextMessage--avatarReply" src={user_create_avatar} />
            }
            <div className="TextMessage--name"  >
              {user_create_name}
            </div>
            <div className="TextMessage--position"  >
              {user_create_position}
            </div>
            {user_create_roles[0] &&
              <div className="TextMessage--room"  >
                {user_create_roles[0]}
              </div>
            }
          </div>
        }
        {getChatParent(chat_parent)}
        {/* {tags.map(({ name, id }) => <span key={id} className="TextMessage--tag" style={{ color: getColor() }}>@{name}</span>)} */}
        <div className={clsx("TextMessage--content", { "TextMessage--content__self": is_me })}
          dangerouslySetInnerHTML={{ __html: getContentMention(content, members, getColor()) }}
        >
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {time_create}
          </div>
        }
        {data_emotion.length > 0 &&
          <EmotionReact data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
        }
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />
      }
    </div >
  );
}

TextMessage.propTypes = {
  user_create_name: PropTypes.string.isRequired,
};

export default TextMessage;
