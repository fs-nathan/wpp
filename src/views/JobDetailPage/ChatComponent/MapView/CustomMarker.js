import React from 'react';
import './styles.scss';
import { ic_share_location } from 'assets';

const CustomMarker = (props) => {
  const { user_share_avatar } = props;
  return (
    <div className="CustomMarker"{...props}>
      <img className="CustomMarker--share" src={ic_share_location} alt="share"></img>
      <img className="CustomMarker--user" src={user_share_avatar} alt="user"></img>
    </div>
  );
};

export default CustomMarker;