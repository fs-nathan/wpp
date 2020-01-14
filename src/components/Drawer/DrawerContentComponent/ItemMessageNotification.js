import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

// import * as image from '../../../assets/index';

import '../Drawer.scss';

const ItemMessageNotification = props => {
  const { item } = props;
  const time = moment(item.data_notification.createt_at, 'YYYY-MM-DD HH:mm');

  const getCreateToNow = () => {
    const now = moment();
    let numDayToNow = now.diff(time, 'days');
    let sAgo = '';
    if (numDayToNow === 0) {
      sAgo = `${now.diff(time, 'hours')} giờ trước`;
    } else if (numDayToNow > 0 && numDayToNow <= 30) {
      sAgo = `${numDayToNow} ngày trước`;
    } else if (numDayToNow > 30 && numDayToNow <= 365) {
      sAgo = `${numDayToNow / 30} tháng trước`;
    } else {
      sAgo = `${numDayToNow / 365} năm trước`;
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
            {getCreateToNow()} vào lúc {time.format('HH:mm')} ngày{' '}
            {time.format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemMessageNotification;
