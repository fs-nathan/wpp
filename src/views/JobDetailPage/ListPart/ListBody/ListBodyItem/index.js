import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';
import SimpleDonutChart from '../../../../../components/SimpleDonutChart';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import Chip from '@material-ui/core/Chip';
import avatar from '../../../../../assets/avatar.jpg';

const Container = styled(ListItem)`
  padding: 0 8px;
  & > *:first-child {
    margin-right: 5px;
  }
`;

const NameContainer = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  & > *:not(:first-child) {
    margin-top: 5px;
  }
  & > div {
    display: flex;
    align-items: center;
    & > *:first-child {
      margin-right: 10px;
    }
  }
`;

function JobName() {
  return (
    <NameContainer variant='space-between'>
      <ColorTypo bold style={{ fontSize: 16 }}>Phân tích ứng dụng ...</ColorTypo>
      <Chip label={1} size='small' style={{ borderRadius: '50%', width: 16, height: 16, color: 'white', backgroundColor: 'red' }} />
    </NameContainer>
  )
}
function JobContent() {
  return (
    <ContentContainer>
      <div>
        <Avatar src={avatar} alt='avatar' style={{ width: 20, height: 20 }} />
        <ColorTypo variant='body2'>Do something</ColorTypo>
      </div>
      <div>
        <ColorChip color='grey' badge label={'Quá hạn'} size='small' style={{ borderRadius: '2px' }} />
        <Icon color={'#6e6e6e'} style={{ transform: 'rotate(35deg)' }} path={mdiPin} size={0.8} />
      </div>
    </ContentContainer>
  )
}

function ListBodyItem() {
  return (
    <Container button style={{ padding: '0 0 10px 0' }}>
      <ListItemAvatar>
        <SimpleDonutChart percentDone={38} />
      </ListItemAvatar>
      <ListItemText disableTypography>
        <JobName />
        <JobContent />
      </ListItemText>
    </Container>
  )
}

export default ListBodyItem;
