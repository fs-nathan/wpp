import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { openCreateRemind, openDetailRemind } from 'actions/chat/chat';
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';
import * as images from 'assets';

const typesRemind = [
  'LABEL_CHAT_TASK_NHAC_1_LAN_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_NGAY_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_TUAN_LABEL',
  'LABEL_CHAT_TASK_NHAC_THEO_THANG_LABEL'
]

function DetailRemind() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const isOpenDetailRemind = useSelector(state => state.chat.isOpenDetailRemind);
  const dataRemind = useSelector(state => state.chat.dataRemind);
  console.log(dataRemind)

  function setCloseDetailRemind() {
    dispatch(openDetailRemind(false))
  }

  function openEdit() {
    dispatch(openCreateRemind(true, false, dataRemind))
    dispatch(openDetailRemind(false))
  }

  const {
    user_create_avatar,
    type,
    date_remind,
    time_remind,
    duration,
    type_remind,
    created_at = '',
    content,
    is_ghim,
    user_create_name,
    user_create_position = '',
    time_remind_next = '',
    month_remind_next = '',
    day_remind_next = ''
  } = dataRemind || {};
  const [day, month] = [day_remind_next, month_remind_next]

  return (
    <Dialog
      className="detailRemind"
      open={isOpenDetailRemind}
      onClose={setCloseDetailRemind}
      maxWidth="md"
    >
      <DialogTitle disableTypography>
        <Typography className="detailRemind--title" component="div">
          <Avatar className="detailRemind--avatar" src={user_create_avatar} alt='avatar' />
          <div className="detailRemind--user">
            {user_create_name}
            <br />
            <div className="detailRemind--role">{user_create_position}</div>
          </div>
        </Typography>
        <IconButton aria-label="close" className="detailRemind--closeButton" onClick={setCloseDetailRemind}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Scrollbars>
          <div className="detail-remind-top">
            {
              time_remind_next === '' || time_remind_next === null ? (
                <img
                  src={images.ic_alarm_complete}
                  alt="ic_alarm_complete"
                  width="40px"
                />
              ) : <>
                <div className="step-time-next" style={{ backgroundColor: groupActiveColor }}>
                  <div className="step-time-next-month">{t('LABEL_CHAT_TASK_THANG', { month })}
                  </div>
                  <div className="step-time-next-day">
                    {day}
                  </div>
                </div>
              </>
            }
            <div className="detailRemind--data" >{t('LABEL_CHAT_TASK_TAO_LUC', { created_at })}
              {
                time_remind_next === '' || time_remind_next === null ?
                <ColorTypo variant='body1' component="div">
                  {t('LABEL_CHAT_TASK_NHAC_HEN_HOAN_THANH')}
                </ColorTypo> :
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
          </div>
          </div>
          <DialogContentText className="detailRemind--content">
            {content}
          </DialogContentText>
        </Scrollbars>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: groupActiveColor }}
          autoFocus
          onClick={openEdit} >{t('LABEL_CHAT_TASK_CHINH_SUA')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailRemind