import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import ColorTypo from '../ColorTypo';
import { Tooltip } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
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
    & > img {
      width: 20px;
      height: 20pxl
      border-radius: 100%;
    }
  }
`;

function AvatarCircle({ user, ...props }) {
  return (
    <div {...props}>
      <img src={get(user, 'avatar')} alt='avatar' />
    </div>
  );
}

function AvatarCircleList({ display, users = [] }) {
  return (
    <Container>
      {users.length > 0 && (
        <React.Fragment>
          {users.slice(display).map((user, index) => {
            return (
              <Tooltip 
                key={index}
                title={get(user, 'name', '')}
              >
                <AvatarCircle 
                  user={user}
                />
              </Tooltip>
            )
          })}
          <div>
            <div>{users.length-display}+</div>
          </div>
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

export default AvatarCircleList;
