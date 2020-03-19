import React from 'react';
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiCancel, mdiCheck } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import { priorityList } from '../data';

import './styles.scss';

function getStatus(total_rejected, total_approved) {
  if (total_rejected > 0) return 'rejected';
  if (total_approved > 0) return 'approve';
  return 'normal';
}

const CustomListItem = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    content, dataHander, date_create, priority_code = 0, priority_name = '',
    user_create_avatar, user_create_name,
    total_approved,
    total_accepted,
    total_rejected,
  } = props.offer || {}

  const priority = priorityList[priority_code].value;
  const status = getStatus(total_rejected, total_approved);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function onClickDetail() {
    props.handleClickDetail(props.offer);
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <li className="offerTabItem">
        <ColorTypo className="offerTabItem--content">{content}</ColorTypo>
        <ColorTypo className="offerTabItem--user" color='orange' variant='caption'>
          <Avatar className="offerTabItem--avatar" src={user_create_avatar} alt='avatar' />
          Lúc {date_create}
          <span className={clsx("offerTabItem--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`)}>
            {priority_name}
          </span>
        </ColorTypo>
        <div className="offerTabItem--status">
          <div className={clsx("offerTabItem--statusIcon", `offerTabItem--statusIcon__${status}`)}>
            <Icon path={status === 'rejected' ? mdiCancel : mdiCheck} size={1} />
          </div>
          <div className="offerTabItem--vote" >
            {total_accepted}/{total_approved} đồng ý - {total_rejected}/{total_approved} từ chối
          </div>
        </div>
        <IconButton className="offerTabItem--button" size='small' onClick={handleClick} >
          <Icon path={mdiDotsHorizontal} size={1} />
        </IconButton>
      </li>
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
        <MenuItem onClick={onClickDetail}>Chi tiết</MenuItem>
        <MenuItem onClick={() => {
          props.handleClickOpen()
          setAnchorEl(null)
        }}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={() => {
          props.handleOpenModalDelete(props.offer)
          setAnchorEl(null)
        }}>Xóa</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default CustomListItem