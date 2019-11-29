import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { withRouter } from 'react-router-dom';
import {
  mdiCart,
  mdiCreditCardOutline,
  mdiAccountMultiple,
  mdiSettings
} from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Routes } from '../../../constants/routes';
import { SETTING_GROUP } from '../../../constants/constants';

const StyledList = styled(List)`
  padding: 20px 0;
`;

const StyledListItem = styled(ListItem)`
  & > div:first-child {
    margin-right: 20px;
  }
`;

const IconItem = styled(Icon)`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 30px;
`;

const ListPart = props => {
  const getTabButtonStyle = tabId => {
    const { type } = props.match.params;
    return {
      transition: '1s',
      margin: '10px 0',
      backgroundColor:
        type.indexOf(tabId) !== -1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
    };
  };

  return (
    <div className="left-setting-container">
      <div className="header-left">
        <ColorTypo uppercase bold>
          Cài đặt nhóm
        </ColorTypo>
      </div>
      <StyledList>
        <StyledListItem
          button
          style={getTabButtonStyle(SETTING_GROUP.INFO)}
          onClick={() => props.history.push(Routes.SETTING_GROUP_INFO)}
        >
          <ListItemIcon>
            <IconItem path={mdiAccountMultiple} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Thông tin nhóm</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle(SETTING_GROUP.SETTING)}
          onClick={() => props.history.push(Routes.SETTING_GROUP_SETTING)}
        >
          <ListItemIcon>
            <IconItem path={mdiSettings} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Cài đặt</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle(SETTING_GROUP.ORDER)}
          onClick={() => props.history.push(Routes.SETTING_GROUP_ORDER)}
        >
          <ListItemIcon>
            <IconItem path={mdiCart} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Đơn hàng</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle(SETTING_GROUP.PAYMENT)}
          onClick={() => props.history.push(Routes.SETTING_GROUP_PAYMENT)}
        >
          <ListItemIcon>
            <IconItem path={mdiCreditCardOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Thanh toán</ColorTypo>
          </ListItemText>
        </StyledListItem>
      </StyledList>
    </div>
  );
};

export default withRouter(ListPart);
