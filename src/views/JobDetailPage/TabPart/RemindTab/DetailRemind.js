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
import ColorChip from 'components/ColorChip';
import ColorTypo from 'components/ColorTypo';
import get from 'lodash/get';
import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';


const typesRemind = [
  'Nhắc 1 lần',
  'Nhắc theo ngày',
  'Nhắc theo tuần',
  'Nhắc theo tháng',
]

function DetailRemind({
  isOpen,
  handleCloseModal,
  handleOpenEdit,
  item
}) {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
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
    user_create_role = '',
  } = item
  const [day, month] = created_at.split('/');
  return (
    <div>
      <Dialog
        className="detailRemind"
        open={isOpen}
        onClose={handleCloseModal}
      >
        <DialogTitle disableTypography>
          <Typography className="detailRemind--title" component="div">
            <Avatar className="detailRemind--avatar" src={user_create_avatar} alt='avatar' />
            {user_create_name}
            <div className="detailRemind--role">{user_create_role}</div>
          </Typography>
          <IconButton aria-label="close" className="detailRemind--closeButton" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="detailRemind--content">
            {content}
          </DialogContentText>
          <div className="detailRemind--main">
            <div className="detailRemind--time" style={{ backgroundColor: groupActiveColor }}>
              <div className="detailRemind--month">
                Tháng {month}
              </div>
              <div className="detailRemind--day">
                {day}
              </div>
            </div>
            <div className="detailRemind--data" >
              Tạo lúc {created_at}
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
            onClick={handleOpenEdit} > Chỉnh sửa </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DetailRemind