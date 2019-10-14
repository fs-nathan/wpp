import React from 'react';
import styled from 'styled-components';
import avatar from '../../assets/avatar.jpg';

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

function AvatarCircleList({ total, display }) {
  return (
    <Container>
      {Array.from({ length: display }).map((_, index) => {
        return (
          <div key={index}>
            <img src={avatar} alt='avatar' />
          </div>
        );
      })}
      <div>
        <div>{total-display}+</div>
      </div>
    </Container>
  )
}

export default AvatarCircleList;
