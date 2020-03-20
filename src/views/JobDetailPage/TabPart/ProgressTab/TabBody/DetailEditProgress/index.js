import React, { useState, useEffect } from 'react';
import clsx from 'classnames';
import { mdiTimelineClockOutline, mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react'

import EditProgressItem from './EditProgressItem';

import './styles.scss'

function DetailEditProgress({ trackings }) {
  const [showDetail, setShowDetail] = useState(false);

  function toggleDetail() {
    setShowDetail(!showDetail)
  }

  return (<div className="detailEditProgress">
    <div className="detailEditProgress--header">
      <Icon
        path={mdiTimelineClockOutline}
        color="rgba(0, 0, 0, 0.54)"
        size={1}
      />
      <div className="detailEditProgress--change">
        Điểu chỉnh tiến độ: {trackings.length} lần
    <div className="detailEditProgress--detail" onClick={toggleDetail}>
          {showDetail ? 'Thu gọn lịch sử điều chỉnh tiến độ' : 'Xem lịch sử điều chỉnh tiến độ'}
          <Icon
            path={mdiMenuDown}
            color="rgba(0, 0, 0, 0.54)"
            size={1}
            className={clsx('detailEditProgress--icon', { 'detailEditProgress__expanded': showDetail })}
          />
        </div>
      </div>
    </div>
    {showDetail && trackings.map((track, i) => (<EditProgressItem
      key={i}
      fixedNumber={i + 1}
      fixStart={track.new_start}
      fixEnd={track.new_end}
      createdAt={track.time_create}
      avatarUrl={track.user_create_avatar}
    // userName={track.user_created}
    ></EditProgressItem>))}
  </div>)
}

export default DetailEditProgress;