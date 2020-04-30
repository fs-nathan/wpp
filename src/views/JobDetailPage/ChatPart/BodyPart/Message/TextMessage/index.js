import { Avatar } from '@material-ui/core';
import { createChatText, deleteFailedChat } from 'actions/chat/chat';
import clsx from 'clsx';
import { getUpdateProgressDate, replaceUrl } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
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

function getRichContent(content = '', tags, color) {
  if (!content) return '';
  let ret = content;
  tags.forEach(({ id, name }) => {
    let reg = new RegExp(`@${id}`, 'g');
    ret = ret.replace(reg, `<span class="TextMessage--tag" style="color: ${color};">@${name}</span>`);
  })
  // console.log(matches)
  ret = ret.replace('\n', '<br/>');
  return replaceUrl(ret);
}

const TextMessage = ({
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  user_create_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  is_deleted,
  chatPosition = "top",
  tags = [],
  data_emotion = [],
  isFails,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const dateFormat = useSelector(state => state.system.profile.format_date);

  function getColor() {
    if (isReply) return "#5b5b5b"
    if (is_me) return "#fff"
    return groupActiveColor;
  }

  function onClickDeleteChat(data) {
    dispatch(deleteFailedChat(id));
  }

  function onClickResendChat() {
    dispatch(createChatText({ content, tags, task_id: taskId, user_create_id }, id));
  }

  return (
    <>
      <div className={clsx("TextMessage", { [`TextMessage__${chatPosition}`]: !isReply, [`TextMessage__replyPosition`]: isReply })}  >
        {!isReply && !is_me &&
          <abbr title={user_create_name}>
            <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
          </abbr>
        }
        {!isReply && is_me && !is_deleted &&
          <CommonMessageAction isSelf chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
        <div className={clsx("TextMessage--rightContentWrap",
          is_me ? `TextMessage--rightContentWrap__self-${chatPosition}`
            : `TextMessage--rightContentWrap__${chatPosition}`,
          {
            "TextMessage--reply": isReply,
            "TextMessage--rightContentWrap__self": is_me,
            "TextMessage--rightContentWrap__deleted ": is_deleted,
            [`TextMessage--rightContentWrap__self-${chatPosition}`]: is_me,
            "TextMessage--rightContentWrap__haveParent": Boolean(chat_parent)
          })}
          style={{ backgroundColor: is_me ? groupActiveColor : '#fff' }}
        >
          <abbr className="TextMessage--tooltip" title={!isReply ? getUpdateProgressDate(time_create, dateFormat) : ''}>
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
            {!is_deleted ? getChatParent(chat_parent) : ''}
            <div className={clsx("TextMessage--content", {
              "TextMessage--content__self": is_me,
              "TextMessage--content__deleted": is_deleted,
            })}
              dangerouslySetInnerHTML={{
                __html: is_deleted ? `Tin nhắn đã ${!is_me ? 'bị' : 'được'} xoá!`
                  : getRichContent(content, tags, getColor())
              }}
            >
            </div>
            {data_emotion.length > 0 &&
              <EmotionReact data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
            }
          </abbr>
        </div>
        {!isReply && !is_me &&
          <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />
        }
      </div >
      {
        isFails && <div className="bodyChat--sending">
          <span className="bodyChat--sendingFail">{t('LABEL_CHAT_TASK_KHONG_THANH_CONG')}</span>
          <span className="bodyChat--sendingDelete" onClick={onClickDeleteChat}>{t('LABEL_CHAT_TASK_XOA')}</span>
          <span className="bodyChat--sendingResend" onClick={onClickResendChat}>{t('LABEL_CHAT_TASK_GUI_LAI')}</span>
        </div>
      }
    </>
  );
}

TextMessage.propTypes = {
  type: PropTypes.number.isRequired,
};

export default TextMessage;
