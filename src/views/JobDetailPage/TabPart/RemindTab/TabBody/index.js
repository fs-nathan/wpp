import React from 'react';
import styled from 'styled-components';
import {
  Avatar, IconButton, Menu, MenuItem
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import ColorChip from '../../../../../components/ColorChip';
import SearchInput from '../../../../../components/SearchInput';
// import avatar from '../../../../../assets/avatar.jpg';
// import colorPal from '../../../../../helpers/colorPalette';
import RemindModal from '../RemindModal';
import { Scrollbars } from 'react-custom-scrollbars';
import ModalDeleteConfirm from '../../ModalDeleteConfirm'
// import { convertDateToText } from '../../../../../helpers/jobDetail/stringHelper';


// const StyledList = styled.ul`
//   margin-top: 20px;
//   padding-inline-start: 0 !important;
//   list-style-type: none;
//   & > li {
//     padding: 8px 0;
//   }
// `;

// const StyledListItem = styled.li`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledTitleBox = styled.div`
//   display: flex;
//   align-items: center;
//   & > *:not(:first-child) {
//     margin-left: 5px;
//   }
// `;

// const StyledContentBox = styled.div`
//   margin: 10px 0 30px 30px;
//   background-color: #f8f8f8;
//   padding: 13px 15px;
//   border-radius: 10px;
//   font-weight: bold;
// `;

// const Container = styled.div`
//   padding: 10px 20px;
//   height: 100%;
// `;

// const Content = styled.div`
//   display: flex;
//   justify-content: space-between;
// `
const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`
const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
const UserAvatar = styled(Avatar)`
width: 25px;
height: 25px;
`

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
  
`;
// const StyledMenu = styled.div`
//   opacity: 0 ;
//   ${StyledListItem}:hover & {
//     opacity: 1;
//   }
// `
const MemberMenuLists = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    props.deleteRemindWByRemindId({remindId:props.item.id, taskId: props.taskId})
  }

  return (
    <div className="styled-menu" >
      <ButtonIcon onClick={e => handleClick(e)} aria-controls={"simple-menu" + props.idx} aria-haspopup="true">
        <Icon path={mdiDotsVertical} size={1} />
      </ButtonIcon>
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
        <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
      </Menu>
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        // task={props.task.id} 
        {...props} />
    </div>
  )
}

const selector = [
  {
    value: 0,
    label: 'Nhắc hẹn theo thời gian',
  },
  {
    value: 1,
    label: 'Nhắc hẹn theo tiến độ thực tế',
  }
  // ,
  // {
  //   value: 2,
  //   label: 'Nhắc hẹn theo tiến độ kế hoạch',
  // },
  // {
  //   value: 3,
  //   label: 'Nhắc hẹn theo chênh lệch tiến độ hoàn thành giữa Kế hoạch - Thực tế',
  // },
];
const badges = [
  {
    value: 0,
    label: 'Nhắc 1 lần',
  },
  {
    value: 1,
    label: 'Theo ngày',
  },
  {
    value: 2,
    label: 'Theo tuần',
  },
  {
    value: 3,
    label: 'Theo tháng',
  },
]

const RemindList = (props) => {
  const [isRemind] = React.useState(true)
  const [open, _setOpen] = React.useState(false);
  const [elemState, _setElem] = React.useState(null)

  // const [data] = React.useState(__data);

  // Toogle popup array contains status of each popup
  const handleClickOpen = (item) => {
    _setOpen(true)
    _setElem(item)
  };

  const handleClickClose = () => {
    _setOpen(false)
  };

  const getRemindTextByType = (typeId, date, time) => {
    return typeId ? selector[typeId].label : "Nhắc hẹn vào ngày " + date + " lúc " + time
  }
  const getRemindProgressByType = (typeId, duration, typeRemind) => {

    return (
      ((typeId === 0) ? (
        (typeRemind ?
          <Badge color='orangelight' size='small' badge label={badges[typeRemind].label} />
          :
          <Badge color='orangelight' size='small' badge label={"Nhắc 1 lần"} />
        )
      )
        :
        (typeId === 1) ?
          (duration.map((item, key) => (
            <Badge key={key} color='orangelight' size='small' badge label={"Đạt " + item + "%"} />
          )))
          // : (typeId === 3) ? (
          //   (duration.map((item, key) => (
          //     <Badge key={key} color='orangelight' size='small' badge label={"Trên " + item + "%"} />
          //   )))
          // )
          :
          null
      )
    )
  }
  return (
    <ul className="styled-list">
      {props.remind.map((item, idx) => {
        return (
          <li className="styled-list-item" key={idx} {...props}>
            <div className="content-list-item">
              <div className="styled-title-box-rt">
                <UserAvatar src={item.user_create_avatar} alt='avatar' />
                <ColorTypo variant='body1'>
                  {getRemindTextByType(item.type, item.date_remind, item.time_remind)}
                </ColorTypo>
                {/* {item.duration && item.duration.map((item, key) => (
                  <Badge key={key} color='orangelight' size='small' badge label={item + ""} />))
                } */}
                {getRemindProgressByType(item.type, item.duration, item.type_remind)}
              </div>

              <MemberMenuLists idx={idx} handleClickOpen={() => handleClickOpen(item)} item={item} {...props} />

            </div>
            <div className="styled-content-box-rt">
              {item.content}
            </div>

          </li>
        );
      })}
      <RemindModal isOpen={open} handleClickClose={() => handleClickClose()} data={elemState} isRemind={isRemind} />
    </ul>
  );
}

function TabBody(props) {
  const searchRemindTabPart = (e) => {
    props.searchRemind(e.target.value)
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-tabbody-remind">
        <SearchInput 
          placeholder={'Nhập từ khóa'} 
          fullWidth
          onChange={e => searchRemindTabPart(e)}
        />
        <RemindList {...props} />
      </div>
    </Body>
  )
}

export default TabBody;
