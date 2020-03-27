import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import CustomModal from 'components/CustomModal';
import get from 'lodash/get';
import React from 'react';
import { useSelector } from 'react-redux';
import { getStatusName, priorityList } from '../data';
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
    priority_code = 0,
    content,
    date_create,
    user_can_handers = [],
    user_monitors = [],
    data_handers = [],
    total_accepted,
    total_approved,
    total_rejected,
  } = item;
  const priority = priorityList[priority_code].value;
  const status = getStatusName(total_rejected, total_approved);

  return (
    <CustomModal
      title={props.isOffer ? "Chỉnh sửa đề xuất" : 'Tạo đề xuất'}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => props.isOffer ? "Chỉnh sửa" : "Hoàn Thành"}
      onConfirm={props.isOffer ? onClickUpdateOffer : onClickCreateOffer}
      canConfirm={validate()}
      className="offerModal"
    >
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
              <div className="offerDetail--createdAt">Đã tạo đề xuất lúc: {date_create}</div>

            </Typography>
            <IconButton aria-label="close" className="offerDetail--closeButton" onClick={handleClickClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="offerDetail--container">
              <div className="offerDetail--content">
                {content}
              </div>
              <div className="offerDetail--priority">
                <div className="offerDetail--label">
                  Mức độ:
          </div>
                <div className="offerDetail--data">
                  <div className={clsx("offerDetail--priorityLabel", `offerDetail--priorityLabel__${priority_name.toLowerCase()}`)}>
                    {priority}
                  </div>
                </div>
              </div>
              <div className="offerDetail--handler">
                <div className="offerDetail--label">
                  Phê duyệt ({user_can_handers.length})
          </div>
                <div className="offerDetail--data">
                  {user_can_handers.map(({ avatar, name }, index) =>
                    <div className="offerDetail--user">
                      <Avatar
                        className="offerDetail--avatarIcon"
                        key={index}
                        alt="avatar" src={avatar}
                      />
                      <div className="offerDetail--userName">
                        {name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="offerDetail--monitor">
                <div className="offerDetail--label">
                  Giám sát ({user_monitors.length})
          </div>
                <div className="offerDetail--data">
                  {user_monitors.map(({ avatar, name }, index) =>
                    <div className="offerDetail--user">
                      <Avatar
                        className="offerDetail--avatarIcon"
                        key={index}
                        alt="avatar" src={avatar}
                      />
                      <div className="offerDetail--userName">
                        {name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="offerDetail--result">
                <div className="offerDetail--label">
                  Kết quả phê duyệt
            </div>
                <div className="offerDetail--data">
                  {status} ({total_accepted}/{total_approved} đồng ý - {total_rejected}/{total_approved} từ chối)
          </div>
              </div>
            </div>
            {/* {
            data_handers.map((res, index) =>
              <OfferDetailItem
                {...res}
                key={index}
                handleOpenModalDelete={handleOpenModalDelete}
                handleClickOpen={handleClickEditItem}
              />
            )
          } */}
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
    </DialogWrap>
  );
}

export default OfferDetail