import React from 'react';
import styled from 'styled-components';
import { ListItem, Avatar } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import SimpleDonutChart from '../../../../../components/SimpleDonutChart';
import avatar from '../../../../../assets/avatar.jpg';

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  & > *:last-child {
    margin-left: auto;
  }
`;

function JobListItem() {
  return (
    <StyledListItem>
      <Avatar src={avatar} alt='avatar' />
      <div>
        <ColorTypo bold>Công việc thiết kế giao diện</ColorTypo>
        <ColorTypo color='red'>&bull; Còn 1 ngày</ColorTypo>
      </div>
      <SimpleDonutChart percentDone={70} color={'#31b586'} variant='small' />
    </StyledListItem>
  )
}

export default JobListItem;
