import { Avatar } from '@material-ui/core';
import { mdiAlarm } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import { getDialogDate } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import { useTranslation } from 'react-i18next';

const DialogMessageWrap = ({
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  time_create,
  chatPosition = "top",
  titleHeader,
  taskName,
  isHideFooterIcon = false,
  footerText,
  onClickViewDetail,
  className,
  children
}) => {
  const { t } = useTranslation();
  const dateFormat = useSelector(state => state.system.profile.format_date);

  return (
    <div
      id={id}
      className={clsx("DialogMessageWrap", className)} >
      <div className="DialogMessageWrap--header" >
        {titleHeader || t('IDS_WP_NOTICE')}
      </div>
      {user_create_name && <div className="DialogMessageWrap--sender" >
        <abbr title={user_create_name}>
          <Avatar className="DialogMessageWrap--avatar" src={user_create_avatar} />
        </abbr>
      </div>}
      {taskName && <div className="DialogMessageWrap--title" >
        <span className="DialogMessageWrap--name" >
          {user_create_name}
        </span>
        <span className="DialogMessageWrap--position" >
          {user_create_position ? ` - ${user_create_position} ` : ' '}
        </span>
        <span className="DialogMessageWrap--task" >
          {t('LABEL_CHAT_TASK_DA_DO_TASK', { taskName })}
        </span>
      </div>}
      <div className="DialogMessageWrap--content" >
        {children}
        {time_create &&
          <div className={clsx("DialogMessageWrap--time")} >
            {getDialogDate(t, time_create, dateFormat)}
          </div>
        }
      </div>
      <div className="DialogMessageWrap--footer" >
        {!isHideFooterIcon &&
          <Icon className="DialogMessageWrap--icon" path={mdiAlarm}></Icon>
        }
        {
          footerText !== "" &&
          <span className="DialogMessageWrap--detail" onClick={onClickViewDetail}>
            {footerText || t('LABEL_CHAT_TASK_XEM_CHI_TIET')}
          </span>
        }
      </div>
    </div>
  );
}

DialogMessageWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DialogMessageWrap;
