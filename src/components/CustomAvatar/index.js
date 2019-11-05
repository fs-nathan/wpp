import React from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';

function CustomAvatar({ src, ...rest }) {
  return (
    <Avatar 
      src={src || 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'}
      onError={(evt) => {
        if (evt.target.src !== 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png') {
          evt.target.src = 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png';
          evt.target.onerror = null;
        }
      }}
      {...rest} 
    />
  )
}

CustomAvatar.propTypes = {
  src: PropTypes.string,
};

export default CustomAvatar;
