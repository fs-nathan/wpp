import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import { getStatus, getStatusName, priorityList } from '../data';
import './styles.scss';

const CustomListItem = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    title, dataHander, date_create, priority_code = 0, priority_name = '',
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
        <div className="offerTabItem--content" onClick={onClickDetail}>{title}</div>
        <div className="offerTabItem--user">
          <Avatar className="offerTabItem--avatar" src={user_create_avatar} alt='avatar' />
          {`${user_create_name} đề xuất lúc ${date_create}`}
        </div>
        <div className="offerTabItem--status">
          <span className={clsx("offerTabItem--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`)}>
            {priority}
          </span>
          <div className={clsx("offerTabItem--statusIcon", `offerTabItem--statusIcon__${status}`)}>
            {/* <Icon path={status === 'rejected' ? mdiCancel : mdiCheck} size={1} />
             */}
            {getStatusName(total_rejected, total_approved)}
          </div>
          <div className="offerTabItem--vote" >
            {total_accepted}/{total_approved}{t('LABEL_CHAT_TASK_DONG_Y')}{total_rejected}/{total_approved}{t('LABEL_CHAT_TASK_TU_CHOI')}</div>
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
        <MenuItem onClick={onClickDetail}>{t('LABEL_CHAT_TASK_CHI_TIET')}</MenuItem>
        <MenuItem onClick={() => {
          props.handleClickOpen()
          setAnchorEl(null)
        }}>{t('LABEL_CHAT_TASK_CHINH_SUA')}</MenuItem>
        <MenuItem onClick={() => {
          props.handleOpenModalDelete(props.offer)
          setAnchorEl(null)
        }}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default CustomListItem