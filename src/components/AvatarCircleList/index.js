import React from 'react';
import { get } from 'lodash';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';
import './style.scss';

function AvatarCircle({ user, size }) {
  return (
    <CustomAvatar
      style={{ width: size, height: size, }} 
      src={get(user, 'avatar')} alt='avatar'
    />
  );
}

function AvatarCircleList({ display, users = [], size = 20, className = '', }) {

  return (
    <div className={`comp_AvatarCircleList___container ${className}`}>
      {users.length > 0 && (
        <React.Fragment>
          {users.slice(0, display).map((user, index) => {
            return (
              <abbr 
                key={index}
                title={get(user, 'name', '')}
              >
                <div>  
                  <AvatarCircle 
                    user={user}
                    size={size}
                  />
                </div>
              </abbr>
            )
          })}
          {display < users.length && (  
            <div style={{ width: size, height: size }}>
              <div style={{ fontSize: `${size / 2}px`}}>+{users.length-display}</div>
            </div>
          )}
        </React.Fragment>
      )}
      {users.length === 0 && (null)}
    </div>
  )
}

AvatarCircleList.propTypes = {
  display: PropTypes.number,
  users: PropTypes.array,
}

export default AvatarCircleList;
