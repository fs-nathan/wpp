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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

const typesRemind = [
  'Nhắc 1 lần',
  'Nhắc theo ngày',
  'Nhắc theo tuần',
  'Nhắc theo tháng',
]

function DetailRemind() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
  const isOpenDetailRemind = useSelector(state => state.chat.isOpenDetailRemind);
  const dataRemind = useSelector(state => state.chat.dataRemind);

  function setCloseDetailRemind() {
    dispatch(openDetailRemind(false))
  }

  function openEdit() {
    dispatch(openCreateRemind(true, false, dataRemind))
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
  } = dataRemind || {};
  const [day, month] = created_at.split('/');

  return (
    <div>
      <Dialog
        className="detailRemind"
        open={isOpenDetailRemind}
        onClose={setCloseDetailRemind}
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
          <DialogContentText className="detailRemind--content">
            {content}
          </DialogContentText>
          <div className="detailRemind--main">
            <div className="detailRemind--time" style={{ backgroundColor: groupActiveColor }}>
              <div className="detailRemind--month">{t('LABEL_CHAT_TASK_THANG', { month })}
              </div>
              <div className="detailRemind--day">
                {day}
              </div>
            </div>
            <div className="detailRemind--data" >{t('LABEL_CHAT_TASK_TAO_LUC', { created_at })}
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
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: groupActiveColor }}
            autoFocus
            onClick={openEdit} >{t('LABEL_CHAT_TASK_CHINH_SUA')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DetailRemind