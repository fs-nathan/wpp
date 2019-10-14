import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { 
  mdiClockOutline,
  mdiFileDocumentBox,
  mdiFileMoveOutline,
  mdiFileUndoOutline,
  mdiBriefcaseAccount,
  mdiGoogleDrive,
  mdiTrashCan,
 } from '@mdi/js';
import ColorTypo from '../../../components/ColorTypo';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

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

function ListPart() {
  return (
    <Container>
      <Header>
        <ColorTypo uppercase bold>Quản lý tài liệu</ColorTypo>
      </Header>
      <StyledList>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiClockOutline} size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Gần đây</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiFileDocumentBox } size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Tài liệu dự án</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiFileMoveOutline} size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Đã chia sẻ</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiFileUndoOutline} size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Được chia sẻ với tôi</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiBriefcaseAccount} size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Tài liệu của tôi</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiGoogleDrive} size={2} />
          </ListItemIcon>
          <ListItemText>
            <ColorTypo bold>Google Drive</ColorTypo>
          </ListItemText>
        </StyledListItem>
        <StyledListItem button>
          <ListItemIcon>
            <Icon path={mdiTrashCan} size={2} />
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
