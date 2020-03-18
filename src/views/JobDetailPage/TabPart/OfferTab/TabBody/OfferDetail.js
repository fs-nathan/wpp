import React from 'react';
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
  handleCloseModal,
  handleOpenEdit,
  item
}) {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  const {
    user_create_avatar,
    user_create_name,
    status,
    content,
    created_at,
    handlers = [],
    members = [],
    monitors = [],
    results,
  } = item
  return (
    <div>
      <Dialog
        className="offerDetail"
        open={isOpen}
        onClose={handleCloseModal}
      >
        <DialogTitle disableTypography>
          <Typography className="offerDetail--title" component="div">
            <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
            {user_create_name}
            <div>{created_at}</div>
            {status}
          </Typography>
          <IconButton aria-label="close" className="offerDetail--closeButton" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="offerDetail--content">
            {content}
          </DialogContentText>
          <div className="offerDetail--handler">
            {handlers.map((index) =>
              <Avatar
                className="offerDetail--avatarIcon"
                key={index}
                alt="avatar" src={members[index].avatar}
              />
            )}
          </div>
          <div className="offerDetail--monitor">
            {monitors.map((index) =>
              <Avatar
                className="offerDetail--avatarIcon"
                key={index}
                alt="avatar" src={members[index].avatar}
              />
            )}
          </div>
            Ket qua phe duyet
            {
            results.map((res, index) =>
              <OfferDetailItem
                {...res}
                key={index}
              />
            )
          }
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

export default OfferDetail