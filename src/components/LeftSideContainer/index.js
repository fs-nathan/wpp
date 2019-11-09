import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { mdiBorderNoneVariant } from '@mdi/js';
import { IconButton } from '@material-ui/core';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';

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
  margin: 0 5px;
  color: #222222;
  font-size: 15px;
  text-transform: uppercase;
`;

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  & > div:first-child {
    padding-right: 12px;
    padding-bottom: 12px;
  }
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
  loading = {
    bool: false,
    component: () => null,
  },
}) {

  const parseAction = (action) => (
    action.avatar ? (
      <CustomAvatar src={action.avatar} alt='avatar' />
    ) 
    : typeof(action.onClick) === 'function' ? (
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
      {loading.bool && loading.component()}
      {!loading.bool && (
        <Body
          autoHide
          autoHideTimeout={500}
        >
          {children}
        </Body>
      )}
    </Container>
  )
}

LeftSideContainer.propTypes = {
  leftAction: PropTypes.object,
  rightAction: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.node,
}

export default LeftSideContainer;
