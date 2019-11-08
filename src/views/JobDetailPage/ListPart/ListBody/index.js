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

const Container = styled.div`
  
  
  overflow: scroll;
  margin-right: -17px;
  margin-bottom: -17px;
`

const detailProject = [
  { progress: 36, title: 'Phân tích ứng dụng ...', description: 'Đã thêm thành viên', status: 'Quá hạn', notification: 2, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' },
  { progress: 90, title: 'Thiết kế giao diện', description: 'Sử dụng phần mềm để thiết lập', status: 'Đang chờ', notification: 1, time: '34 phút' }

]

function ListBody() {
  return (
    
    <Container>
    <StyledList>      
        <ListBodySubHeader subPrimary='Thiết kế giao diện' subSecondary='(2 việc)' />
        {detailProject.map(detail => <ListBodyItem {...detail} />)}
        <ListBodySubHeader subPrimary='Mặc định' subSecondary='(0 việc)' />      
    </StyledList>
    </Container>
    
  )
}

export default ListBody;
