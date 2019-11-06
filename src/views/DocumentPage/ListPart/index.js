import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiClockOutline,
  mdiFileDocumentBox,
  mdiFileDocumentBoxOutline,
  mdiFolderOpenOutline,
  mdiFileMoveOutline,
  mdiFileUndoOutline,
  mdiBriefcaseAccount,
  mdiGoogleDrive,
  mdiTrashCan,
  mdiTrashCanOutline
} from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as TABS from '../../../constants/documentTab'

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
  padding: 15px;

`;

const Header = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledList = styled(List)`
 padding: 20px 0;
`;

const StyledListItem = styled(ListItem)`
 & > div:first-child {
   margin-right: 20px;
 }
`

const IconItem = styled(Icon)`
 background-color: rgba(0, 0, 0, 0.1);
 padding: 8px;
 border-radius: 30px
`

function ListPart(props) {

  // Handle change tab event of user
  const changeTab = tabId => () => {
    props.changeTab(tabId)
  }

  // Get different style of each tab when user change tab
  const getTabButtonStyle = tabId => {
    // Compare tab id with current active tab id
    // Then return compatible style
    return {
      transition: "1s",
      margin: "10px 0",
      backgroundColor: props.activeTabId === tabId
        ? "rgba(0, 0, 0, 0.1)"
        : "transparent"
    }
  }

  return (
    <Container>
      <Header>
        <ColorTypo uppercase bold>Quản lý tài liệu</ColorTypo>
      </Header>
      <StyledList>
        <StyledListItem button
          style={getTabButtonStyle(TABS.RECENT_TAB.id)}
          onClick={changeTab(TABS.RECENT_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiClockOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>
              Gần đây
            </ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.PROJECT_DOCUMENT_TAB.id)}
          onClick={changeTab(TABS.PROJECT_DOCUMENT_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiFileDocumentBoxOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>
              Tài liệu dự án
            </ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.MY_SHARING_TAB.id)}
          onClick={changeTab(TABS.MY_SHARING_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiFileMoveOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>
              Đã chia sẻ
            </ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.OTHER_SHARING_TAB.id)}
          onClick={changeTab(TABS.OTHER_SHARING_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiFileUndoOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo
              bold>
              Được chia sẻ với tôi
              </ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.MY_DOCUMENT_TAB.id)}
          onClick={changeTab(TABS.MY_DOCUMENT_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiFolderOpenOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>
              Tài liệu của tôi
            </ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.GOOGLE_DRIVE_TAB.id)}
          onClick={changeTab(TABS.GOOGLE_DRIVE_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiGoogleDrive} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Google Drive</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button
          style={getTabButtonStyle(TABS.BIN_TAB.id)}
          onClick={changeTab(TABS.BIN_TAB.id)}>
          <ListItemIcon>
            <IconItem path={mdiTrashCanOutline} size={1.5} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Thùng rác</ColorTypo>
          </ListItemText>
        </StyledListItem>
      </StyledList>
    </Container>
  )
}

export default ListPart;