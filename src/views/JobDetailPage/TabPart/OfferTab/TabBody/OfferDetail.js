import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import OfferDetailItem from './OfferDetailItem';

import './styles.scss';

function OfferDetail({
  isOpen,
  handleClickClose,
  handleOpenModalDelete,
  handleClickEditItem,
  handleClickApprove,
  item
}) {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  const {
    user_create_avatar,
    user_create_name,
    priority_name = '',
    content,
    date_create,
    user_can_handers = [],
    user_monitors = [],
    data_handers = [],
  } = item;
  return (
    <div>
      <Dialog
        className="offerDetail"
        open={isOpen}
        onClose={handleClickClose}
      >
        <DialogTitle disableTypography>
          <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="offerDetail--title" component="div">
            {user_create_name}
            <div className="offerDetail--createdAt">Đã tạo đề xuất lúc {date_create}</div>
            <div className={clsx("offerDetail--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`)}>
              {priority_name}
            </div>
          </Typography>
          <IconButton aria-label="close" className="offerDetail--closeButton" onClick={handleClickClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="offerDetail--content">
            {content}
          </DialogContentText>
          <div className="offerDetail--handler">
            <div className="offerDetail--label">
              Phê duyệt ({user_can_handers.length})
          </div>
            {user_can_handers.map(({ avatar }, index) =>
              <Avatar
                className="offerDetail--avatarIcon"
                key={index}
                alt="avatar" src={avatar}
              />
            )}
          </div>
          <div className="offerDetail--monitor">
            <div className="offerDetail--label">
              Giám sát ({user_monitors.length})
          </div>
            {user_monitors.map(({ avatar }, index) =>
              <Avatar
                className="offerDetail--avatarIcon"
                key={index}
                alt="avatar" src={avatar}
              />
            )}
          </div>
          <div className="offerDetail--result">
            Kết quả phê duyệt ({data_handers.length})
          </div>
          {
            data_handers.map((res, index) =>
              <OfferDetailItem
                {...res}
                key={index}
                handleOpenModalDelete={handleOpenModalDelete}
                handleClickOpen={handleClickEditItem}
              />
            )
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickClose} style={{ color: '#222222' }} >
            Thoát
        </Button>
          <Button
            style={{ color: groupActiveColor }}
            autoFocus
            onClick={handleClickApprove} > Phê duyệt </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OfferDetail