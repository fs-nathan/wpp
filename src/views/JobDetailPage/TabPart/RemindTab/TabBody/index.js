import React from 'react';
import styled from 'styled-components';
import { Avatar, } from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';

const __data = [
  { badge: 'Hằng ngày', content: 'Liên hệ chăm sóc khách hàng', title: 'Nhắc hẹn vào lúc 08:30 ngày 12/12/2012' },
  { badge: 'Đạt 55%', content: 'Liên hệ bộ phận đặt vật liệu đầu vào', title: 'Nhắc hẹn theo tiến độ thực tế' },
  { badge: 'Đạt 70%', content: 'Bộ phận marketing phải chăm sóc lại khách hàng', title: 'Nhắc hẹn theo tiến độ kế hoạch' },
  { badge: 'Trên 10%', content: 'Báo TGĐ để thịt', title: 'Tiến độ thực tế chậm so với kế hoạch' },
];

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 5px;
  }
`;

const StyledContentBox = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  background-color: #eee;
  padding: 8px 10px;
  border-radius: 999px;
  font-weight: bold;
`;

const Container = styled.div`
  padding: 10px 0;
`;

const RemindList = () => {
  const [data] = React.useState(__data);

  return (
    <StyledList>
      {data.map((elem, index) => {
        return (
          <StyledListItem key={index}>
            <StyledTitleBox>
              <Avatar style={{ width: 25, height: 25 }} src={avatar} alt='avatar' />
              <ColorTypo variant='body1'>{elem.title}</ColorTypo>
              <ColorChip color='orange' size='small' badge label={elem.badge} />
            </StyledTitleBox>
            <StyledContentBox>
              {elem.content}
            </StyledContentBox>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

function TabBody() {
  return (
    <Container>
      <SearchInput placeholder={'Nhập từ khóa'} fullWidth/>
      <RemindList />
    </Container>
  )
}

export default TabBody;
