import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import ColorTypo from '../ColorTypo';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    z-index: 1;
    margin-left: -2px;
    border-radius: 100%;
    background-color: #fff;
    &:not(:first-child) {
      box-shadow: -4px -1px #f8f9fa;
    }
    &:last-child {
      background-color: #31b586;
      color: #fff;
      & > div {
        font-size: 10px;
      }
    }
  }
`;

function AvatarCircle({ user }) {
  return (
    <CustomAvatar
      style={{ width: 20, height: 20, }} 
      src={get(user, 'avatar')} alt='avatar'
    />
  );
}

function AvatarCircleList({ display, users = [] }) {

  return (
    <Container>
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
      {users.length === 0 && (
        <ColorTypo color='gray' variant='caption'>
          Không có dữ liệu
        </ColorTypo>
      )}
    </Container>
  )
}

AvatarCircleList.propTypes = {
  display: PropTypes.number,
  users: PropTypes.array,
}

export default AvatarCircleList;
