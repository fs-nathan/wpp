import React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

// import * as image from '../../../assets/index';

import '../Drawer.scss';

const ItemMessageNotification = props => {
  const { t } = useTranslation();
  const { item } = props;
  const time = moment(item.data_notification.createt_at, 'YYYY-MM-DD HH:mm');

  const getCreateToNow = () => {
    const now = moment();
    let numDayToNow = now.diff(time, 'days');
    let sAgo = '';
    if (numDayToNow === 0) {
      sAgo = `${now.diff(time, 'hours')} ${t('IDS_WP_HOURS_AGO')}`;
    } else if (numDayToNow > 0 && numDayToNow <= 30) {
      sAgo = `${numDayToNow} ${t('IDS_WP_DAY_AGO')}`;
    } else if (numDayToNow > 30 && numDayToNow <= 365) {
      sAgo = `${numDayToNow / 30} ${t('IDS_WP_MONTH_AGO')}`;
    } else {
      sAgo = `${numDayToNow / 365} ${t('IDS_WP_YEAR_AGO')}`;
    }
    return sAgo;
  };

  return (
    <div
      className={`item-message ${item.isViewed ? '' : 'un-read'}`}
      key={item.id}
    >
      <div className="avatar-item-message">
        <Avatar
          alt="Remy Sharp"
          src={item.user_from.avatar}
          className="avatar"
        />
        {!item.isViewed && <span className="badge-un-read"></span>}
      </div>
      <div>
        <div className="name-message">
          <span className="text-name-message">
            {item.data_notification.content}
          </span>
        </div>
        <div className="des-message">
          <span>
            {getCreateToNow()} {t('IDS_WP_AT')} {time.format('HH:mm')}{' '}
            {t('IDS_WP_DATE_UNIT')} {time.format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemMessageNotification;
