import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiCancel, mdiCheck } from '@mdi/js';
import {
  Avatar, IconButton, Menu, MenuItem,
} from '@material-ui/core';

import './styles.scss';

function OfferDetailItem(props) {
  const { t } = useTranslation();
  const {
    avatar,
    user_hander_name,
    user_hander_position,
    date_hander,
    content_hander,
    status,
    handleClickOpen,
    handleOpenModalDelete,
    offer,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  const statusLabel = status === 0 ? 'ok' : 'denied';
  const statusContent = status === 0 ? 'Đồng ý' : 'Từ chối';
  return <div className="offerDetailItem">
    <Avatar
      className="offerDetailItem--avatarIcon"
      alt="avatar" src={avatar}
    />
    <div className="offerDetailItem--data" >
      <div className="offerDetailItem--itemName">
        {user_hander_name}
        <span className="offerDetailItem--itemRole">
          - {user_hander_position}
        </span>
      </div>
      <div className={clsx("offerDetailItem--itemStatus", `offerDetailItem--itemStatus__${statusLabel}`)}>
        {statusContent}{t('LABEL_CHAT_TASK_DE_XUAT_LUC')}{date_hander}
      </div>
      <div className="offerDetailItem--itemComment">
        {content_hander}
      </div>
    </div>
    <div className={clsx("offerDetailItem--iconStatus", `offerDetailItem--iconStatus__${statusLabel}`)} >
      <Icon path={status ? mdiCancel : mdiCheck} size={2} />
    </div>
    <IconButton className="offerDetailItem--buttonMore" size='small' onClick={handleClick} >
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
        handleClickOpen()
        setAnchorEl(null)
      }}>{t('LABEL_CHAT_TASK_CHINH_SUA')}</MenuItem>
      <MenuItem onClick={() => {
        handleOpenModalDelete(offer)
        setAnchorEl(null)
      }}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
    </Menu>
  </div>
}
export default OfferDetailItem