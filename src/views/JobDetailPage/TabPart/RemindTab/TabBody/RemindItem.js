import { Avatar } from '@material-ui/core';
import { mdiClockOutline, mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import { openDetailRemind } from 'actions/chat/chat';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import MemberMenuLists from './MemberMenuLists';
import './styles.scss';

export const typesRemind = [
  'Nhắc 1 lần',
  'Nhắc theo ngày',
  'Nhắc theo tuần',
  'Nhắc theo tháng',
]

function RemindItem(props) {
  const { t } = useTranslation();
  const {
    user_create_avatar, type,
    date_remind,
    time_remind,
    duration,
    type_remind,
    idx,
    created_at,
    content,
    is_ghim,
  } = props
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const [day, month] = created_at.split('/');

  function handleClickOpen() {
    dispatch(openDetailRemind(true, props))
  }

  return (
    <li className="remindItem" key={idx}>
      <div className="remindItem--time" style={{ color: groupActiveColor }} onClick={handleClickOpen}>
        <div className="remindItem--month">{t('LABEL_CHAT_TASK_THANG', { month })}
        </div>
        <div className="remindItem--day">
          {day}
        </div>
      </div>
      <div className="remindItem--content" onClick={handleClickOpen}>
        <div className="remindItem--title">
          {content}
        </div>
        <div className="remindItem--creator">
          <Avatar className="remindItem--avatar" src={user_create_avatar} alt='avatar' />{t('LABEL_CHAT_TASK_TAO_LUC', { created_at })}
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
      <MemberMenuLists className="remindItem--menu" idx={idx} item={props} />
    </li>
  );
}

export default RemindItem