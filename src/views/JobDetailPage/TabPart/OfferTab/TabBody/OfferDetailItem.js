import React from 'react';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiCancel, mdiCheck } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem,
} from '@material-ui/core';

function OfferDetailItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return <div className="offerDetail--result">
    <Avatar
      className="offerDetail--avatarIcon"
      alt="avatar" src={props.avatar}
    />
    <div className="offerDetail--data" >
      <div className="offerDetail--itemName">
        {props.name}
        <div className="offerDetail--itemRole">
          {props.role}
        </div>
      </div>
      <div className="offerDetail--itemStatus">
        {props.role}
      </div>
      <div className="offerDetail--itemComment">
        {props.role}
      </div>
    </div>
    <div className="offerDetail--iconStatus" >
      <Icon path={props.status ? mdiCancel : mdiCheck} size={2} />
    </div>
    <IconButton size='small' onClick={handleClick} >
      <Icon path={mdiDotsHorizontal} size={1} />
    </IconButton>
    <Menu
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
        props.handleClickOpen()
        setAnchorEl(null)
      }}>Chỉnh sửa</MenuItem>
      <MenuItem onClick={() => {
        props.handleOpenModalDelete(props.offer)
        setAnchorEl(null)
      }}>Xóa</MenuItem>
    </Menu>
  </div>
}
export default OfferDetailItem