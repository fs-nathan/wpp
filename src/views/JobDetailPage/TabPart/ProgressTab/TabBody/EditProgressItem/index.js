import { Avatar } from '@material-ui/core';
import { mdiClockOutline } from '@mdi/js';
import Icon from '@mdi/react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import React from 'react';
import './styles.scss';


function getFormat(dateString) {
  const date = parse(dateString, 'dd/MM/yyyy HH:mm', new Date())
  return format(date, 'HH:mm dd/MM/yyyy').replace(' ', ' ngày ')
}
function EditProgressItem({ fixedNumber,
  fixStart,
  fixEnd,
  createdAt,
  avatarUrl,
  userName,
}) {

  return (<div className="editProgressItem">
    <abbr title={userName}>
      <Avatar className="editProgressItem--avatar" src={avatarUrl}></Avatar>
    </abbr>
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
        Bắt đầu: {getFormat(fixStart)}
      </div>}
      {fixEnd && <div className="editProgressItem--time">
        <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
          size={1}></Icon>
        Kết thúc: {getFormat(fixEnd)}
      </div>}
    </div>
  </div >)
}

export default EditProgressItem;