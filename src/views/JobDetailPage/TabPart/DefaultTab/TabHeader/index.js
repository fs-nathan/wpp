import React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import avatar from '../../../../../assets/avatar.jpg';
// import EditWorkModal from '../EditWorkModal'
import EditJobModal from '../../../ListPart/ListHeader/CreateJobModal'
const Container = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  height: 85px;
  position: sticky;
  top: 0;
`;

const TagsContainer = styled.div`
  margin-left: 10px;
  & > p {
    font-size: 16px;
  }
  & > span:nth-child(1) {
    color: #007bff;
    text-transform: unset;
    font-size: 13px;
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

function TabHeader(props) {
  const [isRight, setIsRight] = React.useState(true);
  // 
  // const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClickClose = () => {
  //   setOpen(false);
  // };
  // 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }
  //  bien tam dung
  const [pause, setIsPause] = React.useState(true)
  const handleClickPause = () => {
    setIsPause(!pause)
  }
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  return (
    <Container>
      <Avatar style={{ width: 60, height: 60 }} src={avatar} alt='avatar' />
      <TagsContainer>
        <ColorTypo bold >Nguyễn Hữu Thành</ColorTypo>
        <ColorTypo color={'blue'} variant='caption' style={{ fontSize: 13 }}>Giám đốc - Phụ trách</ColorTypo>
        <br />
        <ColorTypo variant='caption' style={{ color: 'rgb(174, 168, 168)', fontSize: 12 }}>Đã được giao lúc 08:00 ngày 12/12/2012</ColorTypo>
      </TagsContainer>
      <StyledIconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </StyledIconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          handleClose()
          setOpenCreateJobModal(true)
        }}>Chỉnh sửa</MenuItem>
        {pause ?
          <MenuItem onClick={() => {
            props.onClickPause()
            handleClickPause()
          }}>Tạm dừng</MenuItem>
          :
          <MenuItem onClick={() => {
            props.onClickPause()
            handleClickPause()
          }}>Hủy tạm dừng</MenuItem>
        }
        <MenuItem onClick={handleCloseMenu}>Xóa</MenuItem>
      </Menu>
      <EditJobModal isOpen={openCreateJobModal} setOpen={setOpenCreateJobModal} isRight={isRight} />
    </Container>
  );
}

export default TabHeader