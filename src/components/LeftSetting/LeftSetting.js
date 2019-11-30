import React from 'react';
import Icon from '@mdi/react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './LeftSetting.scss';
import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from '@material-ui/core';

import { StyledList, StyledListItem, Primary, Secondary } from '../CustomList';
import LeftSideContainer from '../LeftSideContainer';

const LeftSetting = props => {
  // const getTabButtonStyle = tabId => {
  //   const { type } = props.match.params;
  //   return {
  //     transition: '1s',
  //     margin: '10px 0',
  //     backgroundColor:
  //       type.indexOf(tabId) !== -1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
  //   };
  // };

  return (
    <React.Fragment>
      <LeftSideContainer
        title={props.title}
        rightAction={{
          iconPath: props.iconTitle || null
        }}
      >
        <StyledList>
          {props.listMenu.map((item, index) => (
            <StyledListItem to={item.url} component={Link} key={index}>
              <div>
                <Icon
                  path={mdiDragVertical}
                  size={1}
                  color={'rgba(0, 0, 0, 0)'}
                />
              </div>
              {/* <CustomAvatar
                      style={{ height: 50, width: 50 }}
                      alt="avatar"
                    /> */}
              <Icon
                className="left-setting-icon"
                path={item.icon}
                size={1.8}
                color="rgba(0, 0, 0, 0.54)"
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
    </React.Fragment>
  );
};

export default connect(
  state => ({
    // visibleNoticeModal: state.system.visibleNoticeModal
  }),
  null
)(withRouter(LeftSetting));
