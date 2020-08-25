import React from 'react';
import styled from 'styled-components';
import ColorTypo from '../../../../../components/ColorTypo';
import { List, ListItem, Checkbox  } from '@material-ui/core';

const Container = styled.div`
  padding: 8px;
  border-right: 1px solid rgba(0, 0, 0, .1);
  & > hr {
    border: 1px solid rgba(0, 0, 0, .1);
  }
`;

const CustomListItem = styled(ListItem)`
  padding: 8px 0;
  display: flex;
  & > *:last-child {
    margin-left: 16px;
  }
`;

function LeftPart() {
  return (
    <Container>
      <ColorTypo bold>Ẩn/hiện cột danh sách thành viên</ColorTypo>
      <ColorTypo variant='caption'>Tích vào các cột cần hiển thị</ColorTypo>
      <hr />
      <List>
        <CustomListItem>
          <Checkbox disabled checked />
          <ColorTypo>Tên thành viên</ColorTypo>
        </CustomListItem>
        <CustomListItem>
          <Checkbox checked />
          <ColorTypo>Chức danh</ColorTypo>
        </CustomListItem>
        <CustomListItem>
          <Checkbox />
          <ColorTypo>Giới tính</ColorTypo>
        </CustomListItem>
      </List>
    </Container>
  )
}

export default LeftPart;
