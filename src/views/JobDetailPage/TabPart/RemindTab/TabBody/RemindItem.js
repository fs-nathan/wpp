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
import { filter, get, isNull } from "lodash";
import * as images from 'assets';
import clsx from 'clsx';

export const typesRemind = [
  'LABEL_CHAT_TASK_NHAC_1_LAN_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_NGAY_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_TUAN_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_THANG_LABEL'
]

function RemindItem(props) {
  const { t } = useTranslation();
  const {
    user_create_avatar,
    type,
    date_remind,
    time_remind,
    duration,
    type_remind,
    idx,
    created_at,
    content,
    is_ghim,
    time_remind_next = '',
    month_remind_next = '',
    day_remind_next = ''
  } = props
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const [day, month] = [day_remind_next, month_remind_next]

  function handleClickOpen() {
    dispatch(openDetailRemind(true, props))
  }

  return (
    <li className="remindItem" key={idx}>
      <div className={clsx("remindItem--time", { "remindItem--time__completed": isNull(time_remind_next) })}
        style={{ color: groupActiveColor }}
        onClick={handleClickOpen}>
        {
          isNull(time_remind_next) ? (
            <img
              src={images.ic_alarm_complete}
              alt="ic_alarm_complete"
              width="40px"
            />
          ) :
            <>
              <div className="remindItem--month">{t('LABEL_CHAT_TASK_THANG', { month })}
              </div>
              <div className="remindItem--day">
                {day}
              </div>
            </>
        }
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
          {
            isNull(time_remind_next) ?
              <ColorTypo variant='body1' component="div">
                {t('LABEL_CHAT_TASK_NHAC_HEN_HOAN_THANH')}
              </ColorTypo>
              :
              <ColorTypo variant='body1' component="div">
                {
                  type === 1 ?
                    <span className="remindItem--remindText">{t('LABEL_CHAT_TASK_NHAC_THEO_TIEN_DO')}</span> :
                    t('LABEL_CHAT_TASK_LUC_REMIND_TIME', { type: t(typesRemind[type_remind]), time: `${time_remind} ${date_remind}` })
                }
                {
                  (type === 1) &&
                  (duration.map((item, key) => (
                    <ColorChip key={key} color='orangelight' size='small' badge label={t('LABEL_CHAT_TASK_DAT_PERCENT', { percent: item })} />
                  )))
                }
              </ColorTypo>
          }
          {is_ghim && <Icon className="remindItem--pinned" path={mdiPin} color="rgba(0, 0, 0, 0.54)"
            size={1} />}
        </div>
      </div>
      <MemberMenuLists className="remindItem--menu" idx={idx} item={props} />
    </li>
  );
}

export default RemindItem