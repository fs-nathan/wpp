import React from 'react';
import styled from 'styled-components';
import {
  Avatar, IconButton, Menu, MenuItem,
  MenuList, Popper, Grow, Paper, ClickAwayListener
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
import avatar from '../../../../../assets/avatar.jpg';
import colorPal from '../../../../../helpers/colorPalette';
import RemindModal from '../RemindModal'


const __data = [
  { badge: 'Hằng ngày', content: 'Liên hệ chăm sóc khách hàng', title: 'Nhắc hẹn vào lúc 08:30 ngày 12/12/2012' },
  { badge: 'Đạt 55%', content: 'Liên hệ bộ phận đặt vật liệu đầu vào', title: 'Nhắc hẹn theo tiến độ thực tế' },
  { badge: 'Đạt 70%', content: 'Bộ phận marketing phải chăm sóc lại khách hàng', title: 'Nhắc hẹn theo tiến độ kế hoạch' },
  { badge: 'Trên 10%', content: 'Báo TGĐ để thịt', title: 'Tiến độ thực tế chậm so với kế hoạch' },
];

let mockDataEle = [
  { badge: ['Hằng ngày'], content: 'Liên hệ chăm sóc khách hàng', title: 'Nhắc hẹn theo thời gian', date: '12/12/2012', time: '08:30' },
  { badge: ['Đạt 55%'], content: 'Liên hệ bộ phận đặt vật liệu đầu vào', title: 'Nhắc hẹn theo tiến độ thực tế' },
  { badge: ['Đạt 70%'], content: 'Bộ phận marketing phải chăm sóc lại khách hàng', title: 'Nhắc hẹn theo tiến độ kế hoạch' },
  { badge: ['Trên 10%'], content: 'Báo TGĐ để thịt', title: 'Nhắc hẹn theo chênh lệch tiến độ hoàn thành giữa Kế hoạch - Thực tế' },
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
  margin: 10px 0 30px 30px;
  background-color: #eee;
  padding: 13px 15px;
  border-radius: 10px;
  font-weight: bold;
`;

const Container = styled.div`
  padding: 10px 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const MemberMenuLists = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }
  return (
    <div>
      <IconButton onClick={e => handleClick(e)} aria-controls={"simple-menu" + props.idx} aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} color={'rgba(0, 0, 0, 1)'} />
      </IconButton>
      <Menu
            id={"simple-menu" + props.idx}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => {
              props.handleClickOpen(props.idx);
              handleClose();
              }}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={() => {handleClose()}}>Xóa</MenuItem>
          </Menu> 

    </div>
  )
}

const RemindList = () => {

  const [open, _setOpen] = React.useState(false);
  const [elemState, _setElem] = React.useState({})

  const [data] = React.useState(__data);
  // Toogle popup array contains status of each popup
  let arrOpens = mockDataEle.map(() => ({ isOpen: false }))
  const [isOpens, setOpen] = React.useState(arrOpens);
  const handleClickOpen = (elem) => {
    _setOpen(true)
    _setElem(elem)
    
  };
  const handleClickClose = () => {
    _setOpen(false)
  };
  
  return (
    <StyledList>
      {mockDataEle.map((elem, idx) => {
        return (
          <StyledListItem key={idx}>
            <Content>
              <StyledTitleBox>
                <Avatar style={{ width: 25, height: 25 }} src={avatar} alt='avatar' />
                <ColorTypo variant='body1'>{elem.title}</ColorTypo>
                {elem && elem.badge.map((item, key) => (
                  <ColorChip key={key} color='orangelight' size='small' badge label={item + "" + key} />))
                }
              </StyledTitleBox>

              <MemberMenuLists idx={idx} handleClickOpen={() => handleClickOpen(elem)}/>

            </Content>
            <StyledContentBox>
              {elem.content}
            </StyledContentBox>
            
          </StyledListItem>
        );
      })}
      <RemindModal isOpen={open} handleClickClose={() => handleClickClose()} data={elemState} />
    </StyledList>
  );
}

function TabBody() {
  return (
    <Container>
      <SearchInput placeholder={'Nhập từ khóa'} fullWidth />
      <RemindList />
    </Container>
  )
}

export default TabBody;
