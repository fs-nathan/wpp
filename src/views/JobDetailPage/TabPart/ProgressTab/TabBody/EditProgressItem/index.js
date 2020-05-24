import { Avatar } from '@material-ui/core';
import { mdiClockOutline } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import format from 'date-fns/format';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function getFormat(dateString) {
  try {
    const date = new Date(dateString)
    return format(date, 'HH:mm dd/MM/yyyy').replace(' ', ' ngày ')
  } catch (error) {
    return ''
  }
}

function EditProgressItem({ fixedNumber,
  fixStart,
  fixEnd,
  createdAt,
  avatarUrl,
  userName,
  isNewEnd,
  isNewStart,
}) {
  const { t } = useTranslation();

  return (<div className="editProgressItem">
    <abbr title={userName}>
      <Avatar className="editProgressItem--avatar" src={avatarUrl}></Avatar>
    </abbr>
    <div className="editProgressItem--change" >
      <div className="editProgressItem--changeNumber">{t('LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO_LAN', { fixedNumber })}
      </div>
      <div className="editProgressItem--time">{t('LABEL_CHAT_TASK_LUC', { createdAt: getFormat(createdAt) })}
      </div>
      {fixStart && <div className={clsx("editProgressItem--time", { "editProgressItem--time__new": isNewStart })}>
        <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
          size={1}></Icon>{t('LABEL_CHAT_TASK_BAT_DAU', { start: getFormat(fixStart) })}
      </div>}
      {fixEnd && <div className={clsx("editProgressItem--time", { "editProgressItem--time__new": isNewEnd })}>
        <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
          size={1}></Icon>{t('LABEL_CHAT_TASK_KET_THUC', { end: getFormat(fixEnd) })}
      </div>}
    </div>
  </div >)
}

export default EditProgressItem;