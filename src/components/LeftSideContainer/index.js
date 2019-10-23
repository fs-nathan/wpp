import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiBorderNoneVariant } from '@mdi/js';
import { IconButton } from '@material-ui/core';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 70px calc(100vh - 70px - 50px);
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "body";
`;

const Header = styled.div`
  grid-area: header;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
`;

const Title = styled.p`
  padding: 0;
  margin: 0;
  color: #222222;
  font-size: 15px;
  text-transform: uppercase;
`;

const Body = styled.div`
  grid-area: body;
  height: 100%;
  overflow-y: auto;
`;

const StyledIconButton = styled(IconButton)`
  width: 25px;
  height: 25px;
  & > span:last-child {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
`;

function LeftSideContainer({
  leftAction = {
    iconPath: null,
    onClick: null,
  },
  rightAction = {
    iconPath: null,
    onClick: null,
  },
  title,
  children,
}) {

  const parseAction = (action) => (
    typeof(action.onClick) === 'function' ? (
      <StyledIconButton size='small' onClick={action.onClick}>
        <Icon path={action.iconPath} size={1} color='rgba(0, 0, 0, 0.54)' />
      </StyledIconButton>
    ) : (
      <IconWrapper>
        {action.iconPath ? (
          <Icon path={action.iconPath} size={1} color='rgba(0, 0, 0, 0.54)' />
        ) : (
          <Icon path={mdiBorderNoneVariant} size={1} color='rgba(0, 0, 0, 0)' />
        )}
      </IconWrapper>
    )
  );

  return (
    <Container>
      <Header>
        {parseAction(leftAction)}
        <Title>{title}</Title>
        {parseAction(rightAction)}
      </Header>
      <Body>
        {children}
      </Body>
    </Container>
  )
}

export default LeftSideContainer;
