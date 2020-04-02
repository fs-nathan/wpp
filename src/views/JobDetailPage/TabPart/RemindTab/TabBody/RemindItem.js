import { Avatar } from '@material-ui/core';
import { mdiClockOutline, mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import get from 'lodash/get';
import React from 'react';
import { useSelector } from 'react-redux';
import MemberMenuLists from './MemberMenuLists';
import './styles.scss';


const typesRemind = [
  'Nhắc 1 lần',
  'Nhắc theo ngày',
  'Nhắc theo tuần',
  'Nhắc theo tháng',
]

function RemindItem(props) {
  const { user_create_avatar, type,
    date_remind,
    time_remind,
    duration,
    type_remind,
    idx,
    created_at,
    content,
    handleClickOpen,
    is_ghim,
    onClick,
  } = props
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  const [day, month] = created_at.split('/');
  return (
    <li className="remindItem" key={idx}>
      <div className="remindItem--time" style={{ color: groupActiveColor }} onClick={onClick}>
        <div className="remindItem--month">
          Tháng {month}
        </div>
        <div className="remindItem--day">
          {day}
        </div>
      </div>
      <div className="remindItem--content" onClick={onClick}>
        <div className="remindItem--title">
          {content}
        </div>
        <div className="remindItem--creator">
          <Avatar className="remindItem--avatar" src={user_create_avatar} alt='avatar' /> Tạo lúc {created_at}
        </div>
        <div className="remindItem--remind">
          <Icon path={mdiClockOutline} color="rgba(0, 0, 0, 0.54)"
            size={1} />
          <ColorTypo variant='body1' component="div">
            {
              type === 1 ?
                'Nhắc theo tiến độ' :
                `${typesRemind[type_remind]} lúc ${time_remind} ${date_remind}`
            }
            {
              (type === 1) &&
              (duration.map((item, key) => (
                <ColorChip key={key} color='orangelight' size='small' badge label={"Đạt " + item + "%"} />
              )))
            }
          </ColorTypo>
          {is_ghim && <Icon className="remindItem--pinned" path={mdiPin} color="rgba(0, 0, 0, 0.54)"
            size={1} />}
        </div>
      </div>
      <MemberMenuLists className="remindItem--menu" idx={idx} handleClickOpen={() => handleClickOpen(props)} item={props} />
    </li>
  );
}

export default RemindItem