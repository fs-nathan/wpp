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
import Icon from '@mdi/react';
import {
  mdiStarCircle, mdiStarCircleOutline
} from '@mdi/js';

import './styles.scss';

function DemandDetail({
  isOpen,
  handleClickClose,
  item
}) {
  const groupActiveColor = useSelector(state => get(state, 'system.profile.group_active.color'))
  const {
    user_create_avatar,
    user_create_name,
    user_create_role,
    content,
    type,
  } = item;
  const isDemand = type === 1
  return (
    <div>
      <Dialog
        className="demandDetail"
        open={isOpen}
        onClose={handleClickClose}
      >
        <DialogTitle disableTypography>
          <Typography className="demandDetail--title" component="div">
            Chi tiết chỉ đạo / Phê duyệt
          </Typography>
          <IconButton aria-label="close" className="demandDetail--closeButton" onClick={handleClickClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="demandDetail--user">
            <Avatar className="demandDetail--avatar" src={user_create_avatar} alt='avatar' />
            {user_create_name}
            <div className="demandDetail--role">{user_create_role}</div>
          </div>
          <div className="demandDetail--iconContainer" >
            <Icon className={clsx("demandDetail--icon", isDemand ? 'demandDetail--icon__orange' : 'demandDetail--icon__blue')}
              path={isDemand ? mdiStarCircleOutline : mdiStarCircle}
              size={1}
            />
            <Icon className={clsx("demandDetail--icon", isDemand ? 'demandDetail--icon__orange' : 'demandDetail--icon__blue')}
              path={isDemand ? mdiStarCircleOutline : mdiStarCircle}
              size={1}
            />
            <Icon className={clsx("demandDetail--icon", isDemand ? 'demandDetail--icon__orange' : 'demandDetail--icon__blue')}
              path={isDemand ? mdiStarCircleOutline : mdiStarCircle}
              size={1}
            />
          </div>
          <div className="demandDetail--label">
            {isDemand ? 'Chỉ đạo' : 'Quyết định'}
          </div>
          <DialogContentText className="demandDetail--content">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            // style={{ color: groupActiveColor }}
            autoFocus
            onClick={handleClickClose} > Thoát </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DemandDetail