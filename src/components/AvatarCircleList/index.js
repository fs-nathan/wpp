import React from 'react';
import { get } from 'lodash';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';
import './style.scss';
import { ActionList } from 'components/CustomTable/TableMain/TableBodyGroupRow/TableBodyRow/ActionGroup';

function AvatarCircle({ user, size }) {
  return (
    <CustomAvatar
      style={{ width: size, height: size, }} 
      src={get(user, 'avatar')} alt='avatar'
    />
  );
}

function AvatarCircleList({ row,display, users = [], size = 20, className = '', }) {
  // const { options, columns } = React.useContext(CustomTableContext);

  return (
    <>
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
            <div style={{ width: size, height: size, background: "rgb(0, 150, 136)", color: "#fff", boxShadow: "rgb(248, 249, 250) -2px 0px" }}>
              <div style={{ fontSize: `${size / 2}px`}}>+{users.length-display < 100 ? users.length-display : 99}</div>
            </div>
          )}
        </React.Fragment>
      )}
      {users.length === 0 && (null)}
    </div>
    {row && 
    <div className="list-backup">
      <ActionList row={row} />
    </div>
    }
    </>
  )
}

AvatarCircleList.propTypes = {
  display: PropTypes.number,
  users: PropTypes.array,
}

export default AvatarCircleList;
