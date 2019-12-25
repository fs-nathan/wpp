import React from 'react';
import Icon from '@mdi/react';
import { withRouter, Link } from 'react-router-dom';
import './LeftSetting.scss';
// import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from '@material-ui/core';
import { StyledList, StyledListItem, Primary, Secondary } from '../CustomList';
import LeftSideContainer from '../LeftSideContainer';

const LeftSetting = props => {
  const { pathname } = props.location;

  return (
    <LeftSideContainer
      title={props.title}
      rightAction={{
        iconPath: props.iconTitle || null
      }}
    >
      <StyledList>
        {props.listMenu.map((item, index) => (
          <StyledListItem
            to={item.url}
            component={Link}
            key={index}
            onClick={() => {
              if (item.action) item.action();
            }}
            className={`${pathname === item.url ? 'item-actived' : ''}`}
          >
            <Icon
              className="left-setting-icon"
              path={item.icon}
              size={1.4}
              color={item.color || 'rgba(0, 0, 0, 0.54)'}
            />
            <ListItemText
              primary={
                <Primary className="title-setting-item">{item.title}</Primary>
              }
              secondary={<Secondary>{item.subtile}</Secondary>}
            />
          </StyledListItem>
        ))}
      </StyledList>
    </LeftSideContainer>
  );
};

export default withRouter(LeftSetting);
