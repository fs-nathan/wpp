import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { withRouter } from 'react-router-dom';
import {
  mdiEmailMarkAsUnread,
  mdiBell,
  mdiAccountCircle,
  mdiLock
} from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Routes } from '../../../constants/routes';
import '../SettingAccount.scss';

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
  // Get different style of each tab when user change tab
  const getTabButtonStyle = tabId => {
    // Compare tab id with current active tab id
    // Then return compatible style
    return {
      transition: '1s',
      margin: '10px 0',
      backgroundColor:
        props.match.params.type === tabId ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
    };
  };

  return (
    <div className="left-setting-container">
      <div className="header-left">
        <ColorTypo uppercase bold>
          Cài đặt tài khoản
        </ColorTypo>
      </div>
      <StyledList>
        <StyledListItem
          button
          style={getTabButtonStyle('info')}
          onClick={() => props.history.push(Routes.SETTING_ACCOUNT_INFO)}
        >
          <ListItemIcon>
            <IconItem path={mdiAccountCircle} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Thông tin tài khoản</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle('change-password')}
          onClick={() => props.history.push(Routes.SETTING_ACCOUNT_PASSWORD)}
        >
          <ListItemIcon>
            <IconItem path={mdiLock} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Đổi mật khẩu</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle('ticket')}
          onClick={() => props.history.push(Routes.SETTING_ACCOUNT_TICKET)}
        >
          <ListItemIcon>
            <IconItem path={mdiEmailMarkAsUnread} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Quản lý ticket</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem
          button
          style={getTabButtonStyle('notification-wrokplus')}
          onClick={() => props.history.push(Routes.SETTING_ACCOUNT_NOTIFI)}
        >
          <ListItemIcon>
            <IconItem path={mdiBell} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Thông báo của WorkPlus</ColorTypo>
          </ListItemText>
        </StyledListItem>
      </StyledList>
    </div>
  );
};

export default withRouter(ListPart);
