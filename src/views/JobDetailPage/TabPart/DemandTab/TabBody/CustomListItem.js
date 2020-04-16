import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiClockOutline, mdiDotsVertical, mdiStarCircle, mdiStarCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';


const CustomListItem = props => {
  const { isDemand,
    item,
    onClickDetail,
    handleClickOpen,
    handleOpenModalDelete,
  } = props;
  const { content,
    user_create_avatar,
    user_create_name,
    date_create,
    user_create_roles = [],
    user_create_position,
  } = item;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <li className="demandTabItem">
        <Icon className={clsx("demandTabItem--icon", isDemand ? 'demandTabItem--icon__orange' : 'demandTabItem--icon__blue')}
          path={isDemand ? mdiStarCircleOutline : mdiStarCircle}
          size={2}
          onClick={onClickDetail}
        />
        <div className="demandTabItem--items" onClick={onClickDetail}>
          <div className="demandTabItem--title">{content}</div>
          <div className="demandTabItem--creator">
            <Avatar className="demandTabItem--avatar" src={user_create_avatar} alt="avatar" />
            {[user_create_name, user_create_position, ...user_create_roles].join(' - ')}
          </div >
          <div className="demandTabItem--time">
            <Icon path={mdiClockOutline} size={1} />
            {isDemand ? 'Chỉ đạo' : 'Quyết định'} lúc {date_create}
          </div>
        </div>
        <div className="demandTabItem--menu">
          <IconButton className="demandTabItem--button" size="small" onClick={handleClick}>
            <Icon path={mdiDotsVertical} size={1} />
          </IconButton>
        </div>
      </li>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={onClickDetail}
        >
          Chi tiết
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpen();
            setAnchorEl(null);
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenModalDelete();
            setAnchorEl(null);
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};


export default CustomListItem