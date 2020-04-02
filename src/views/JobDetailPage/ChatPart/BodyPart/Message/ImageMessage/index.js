import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';


const ImageMessage = ({
  images,
  user_create_avatar,
  user_create_name,
  time_create,
  position,
  room,
}) => {

  return (
    <div className="ImageMessage"  >
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
        {
          images.map(({ url }) =>
            <div key={url} className="ImageMessage--wrap" >
              <div className="ImageMessage--quality" >
                HD
            </div>
              <img className="ImageMessage--img" src={url} alt="hd" />
            </div>
          )
        }
        <div className="TextMessage--time"  >
          {time_create}
        </div>
      </div>
    </div>
  );
}

ImageMessage.propTypes = {
  images: PropTypes.array.isRequired,

};

export default ImageMessage;
