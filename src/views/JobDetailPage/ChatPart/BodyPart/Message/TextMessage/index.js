import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';


const TextMessage = ({
  user_create_name,
  user_create_avatar,
  position,
  room,
  content,
  time_create,
  isReply,
  quote
}) => {

  return (
    <div className="TextMessage"  >
      <Avatar className="TextMessage--Avatar" src={user_create_avatar} />
      <div className="TextMessage--rightContentWrap"  >
        <div className="TextMessage--sender"  >
          <div className="TextMessage--name"  >
            {user_create_name}
          </div>
          <div className="TextMessage--position"  >
            {position}
          </div>
          <div className="TextMessage--room"  >
            {room}
          </div>
        </div>
        <div className="TextMessage--content"  >
          {isReply && <div className="TextMessage--quote"  >
            <div className="TextMessage--sender"  >
              <div className="TextMessage--name"  >
                {user_create_name}
              </div>
              <div className="TextMessage--position"  >
                {position}
              </div>
              <div className="TextMessage--room"  >
                {room}
              </div>
            </div>
            <div className="TextMessage--content"  >
              {quote}
            </div>
          </div>

          }
          {content}
        </div>
        <div className="TextMessage--time"  >
          {time_create}
        </div>
      </div>
    </div >
  );
}

TextMessage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextMessage;
