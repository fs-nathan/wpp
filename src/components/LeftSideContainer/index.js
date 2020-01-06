import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from '@mdi/react';
import { mdiBorderNoneVariant } from '@mdi/js';
import { IconButton } from '@material-ui/core';
import CustomAvatar from '../CustomAvatar';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import './style.scss';

const Container = ({ className = '', ...rest }) => (<div className={`comp_LeftSideContainer___container ${className}`} {...rest} />);

const Header = ({ className = '', ...rest }) => (<div className={`comp_LeftSideContainer___header ${className}`} {...rest} />);

const Title = ({ className = '', ...rest }) => (<p className={`comp_LeftSideContainer___title ${className}`} {...rest} />);

const Body = ({ className = '', ...rest }) => (<Scrollbars className={`comp_LeftSideContainer___body ${className}`} {...rest} />);

const StyledIconButton = ({ className = '', ...rest }) => (<IconButton className={`comp_LeftSideContainer___icon-button ${className}`} {...rest} />);

const IconWrapper = ({ className = '', ...rest }) => (<div className={`comp_LeftSideContainer___icon-wrapper ${className}`} {...rest} />);

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
    get(action, 'avatar') ? (
      <CustomAvatar src={get(action, 'avatar')} alt='avatar' />
    ) 
    : typeof(get(action, 'onClick') === 'function') ? (
      <StyledIconButton size='small' onClick={get(action, 'onClick')}>
        <abbr
          title={get(action, 'tooltip', '')}
        >
          <div>
            {get(action, 'iconPath') ? (
              <Icon path={get(action, 'iconPath')} size={1} color='rgba(0, 0, 0, 0.54)' />
            ) : (
              <Icon path={mdiBorderNoneVariant} size={1} color='rgba(0, 0, 0, 0)' />
            )}
          </div>
        </abbr>
      </StyledIconButton>
    ) : (
      <IconWrapper>
        {get(action, 'iconPath') ? (
          <Icon path={get(action, 'iconPath')} size={1} color='rgba(0, 0, 0, 0.54)' />
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
