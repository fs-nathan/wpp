import React from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import ListBodySubHeader from './ListBodySubHeader';
import ListBodyItem from './ListBodyItem';

const StyledList = styled(List)`
  padding: 10px 0; 
  & > li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const detailProject = [
  { progress: 36, title: 'Phân tích ứng dụng ...', description: 'Đã thêm thành viên', status: 'Quá hạn', notification: 2, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' }
  
]

function ListBody() {
  return (
    <StyledList>
      <ListBodySubHeader subPrimary='Thiết kế giao diện' subSecondary='(2 việc)'/>
      {detailProject.map(detail => <ListBodyItem {...detail} />)}
      <ListBodySubHeader subPrimary='Mặc định' subSecondary='(0 việc)'/>
    </StyledList>
  )
}

export default ListBody;
