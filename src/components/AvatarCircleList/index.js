import React from 'react';
import { get } from 'lodash';
import ColorTypo from '../ColorTypo';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';
import './style.scss';

function AvatarCircle({ user }) {
  return (
    <CustomAvatar
      style={{ width: 20, height: 20, }} 
      src={get(user, 'avatar')} alt='avatar'
    />
  );
}

function AvatarCircleList({ display, users = [], className = '', }) {

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
                  />
                </div>
              </abbr>
            )
          })}
          {display < users.length && (  
            <div>
              <div>{users.length-display}+</div>
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
