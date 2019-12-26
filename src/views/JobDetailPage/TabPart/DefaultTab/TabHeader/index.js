import React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
// import avatar from '../../../../../assets/avatar.jpg';
// import EditWorkModal from '../EditWorkModal'
import EditJobModal from '../../../ListPart/ListHeader/CreateJobModal'
import { WrapperContext } from '../../../index';

// const Container = styled.div`
//   padding: 0 20px;
//   display: flex;
//   align-items: center;
//   background-color: #fff;
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
//   height: 85px;
//   position: sticky;
//   top: 0;
// `;

const AvatarHeader = styled(Avatar)`
  width: 60px;
  height: 60px;
`

// const TagsContainer = styled.div`
//   margin-left: 10px;
//   & > p {
//     font-size: 16px;
//   }
//   & > span:nth-child(1) {
//     color: #007bff;
//     text-transform: unset;
//     font-size: 13px;
//   }
// `;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

// function convertDate(convert_day){
//   return convert_day.split('-').reverse().join('-');
// }
function TabHeader(props) {
  // const [isRight, setIsRight] = React.useState(true);
  // 
  // const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClickClose = () => {
  //   setOpen(false);
  // };
  // 
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
  const value = React.useContext(WrapperContext)

  let avatar, name, roles
  if (value) {
    let detailTask = value.detailTask
    if (detailTask) {
      let user_create = detailTask.user_create
      if (user_create) {
        avatar = user_create.avatar
        name = user_create.name
        roles = user_create.roles
      }
    }
  }
  return (
    <div className="container-dt-tabheader">
      <AvatarHeader src={avatar} alt='avatar' />
      <div className="tags-container">
        <ColorTypo bold >{name}</ColorTypo>
        <ColorTypo color={'blue'} variant='caption' style={{ fontSize: 13 }}>{roles}</ColorTypo>
        <br />
        {value.detailTask &&
          <ColorTypo variant='caption' style={{ color: 'rgb(174, 168, 168)', fontSize: 12 }}>Đã được giao ngày {value.detailTask.date_create}</ColorTypo>
        }
      </div>
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
          setOpenCreateJobModal(true)
          setAnchorEl(null);
        }}>Chỉnh sửa</MenuItem>
        {pause ?
          <MenuItem onClick={() => {
            props.onClickPause()
            handleClickPause()
            setAnchorEl(null);
          }}>Tạm dừng</MenuItem>
          :
          <MenuItem onClick={() => {
            props.onClickPause()
            handleClickPause()
            setAnchorEl(null);
          }}>Hủy tạm dừng</MenuItem>
        }
        <MenuItem onClick={() => {
          handleCloseMenu()
          setAnchorEl(null)
        }}>Xóa</MenuItem>
      </Menu>
      <EditJobModal isOpen={openCreateJobModal} setOpen={setOpenCreateJobModal} isRight={true} data={value.detailTask}/>
    </div>
  );
}

export default TabHeader