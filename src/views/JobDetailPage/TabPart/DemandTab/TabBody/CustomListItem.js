import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiClockOutline, mdiDotsVertical, mdiStarCircle, mdiStarCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { compact } from 'lodash';


const CustomListItem = props => {
  const { t } = useTranslation();
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
            {compact([user_create_name, user_create_position, ...user_create_roles]).join(' - ')}
          </div >
          <div className="demandTabItem--time">
            <Icon path={mdiClockOutline} size={1} />
            {isDemand ? t('LABEL_CHAT_TASK_CHI_DAO_LABEL') : t('LABEL_CHAT_TASK_QUYET_DINH_LABEL')}&nbsp;{t('LABEL_CHAT_TASK_LUC', { createdAt: date_create }).toLowerCase()}
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
          onClick={() => {
            onClickDetail();
            setAnchorEl(null);
          }}
        >{t('LABEL_CHAT_TASK_CHI_TIET')}</MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpen();
            setAnchorEl(null);
          }}
        >{t('LABEL_CHAT_TASK_CHINH_SUA')}</MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenModalDelete();
            setAnchorEl(null);
          }}
        >{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
};


export default CustomListItem