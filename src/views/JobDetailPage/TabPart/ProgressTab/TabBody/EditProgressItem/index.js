import React from 'react';
import { Avatar } from '@material-ui/core';
import { mdiClockOutline } from '@mdi/js';
import Icon from '@mdi/react'

import './styles.scss'

function EditProgressItem({ fixedNumber,
  fixStart,
  fixEnd,
  createdAt,
  avatarUrl, }) {

  return (<div className="editProgressItem">
    <Avatar className="editProgressItem--avatar" src={avatarUrl}></Avatar>
    <div className="editProgressItem--change" >
      <div className="editProgressItem--changeNumber">
        Điều chỉnh tiến độ lần {fixedNumber}
      </div>
      <div className="editProgressItem--time">
        Lúc: {createdAt}
      </div>
      {fixStart && <div className="editProgressItem--time">
        <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
          size={1}></Icon>
        {fixStart}
      </div>}
      {fixEnd && <div className="editProgressItem--time">
        <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
          size={1}></Icon>
        {fixEnd}
      </div>}
    </div>
  </div >)
}

export default EditProgressItem;