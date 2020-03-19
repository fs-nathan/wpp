import React from 'react';
import clsx from 'clsx';
import { mdiAccountArrowRight, mdiCancel, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, IconButton, TextField, Typography, Avatar, Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { approveOffer } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';

import './styles.scss';

const ApproveOfferDialog = (props) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [type, setType] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const { item } = props;
  const {
    user_create_avatar,
    user_create_name,
    date_create,
    priority_name = '',
    content,
    id,
  } = item;

  function onClickApproveOffer() {
    dispatch(approveOffer({ offer_id: id, content: description, status: type, task_id: taskId }));
  }

  return (
    <DialogWrap
      title={'Phê duyệt đề xuất'}
      isOpen={props.isOpen}
      handleClickClose={props.handleClickClose}
      successLabel={"Hoàn Thành"}
      onClickSuccess={onClickApproveOffer}
    >
      <React.Fragment>
        <div className="approve--user">
          <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="offerDetail--title" component="div">
            {user_create_name}
            <div className="offerDetail--createdAt">Đã tạo đề xuất lúc {date_create}</div>
            <div className={clsx("offerDetail--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`)}>
              {priority_name}
            </div>
          </Typography>
        </div>
        <Typography className="approve--content" >{content}</Typography>
        <Typography className="approve--title" >Nội dung phê duyệt</Typography>
        <div className="approve--select">
          <div className="approve--option" onClick={() => setType(0)}>
            <div className={clsx("approve--option-icon", { "approve--option__green": type === 0 })} >
              <Icon path={mdiCheck} size={2} />
            </div>
            <div className={clsx("approve--option-text", { "approve--option__selected": type === 0 })} >
              Đồng ý
          </div>
          </div>
          <div className="approve--option" onClick={() => setType(1)}>
            <div className={clsx("approve--option-icon", { "approve--option__red": type === 1 })} >
              <Icon path={mdiCancel} size={2} />
            </div>
            <div className={clsx("approve--option-text", { "approve--option__selected": type === 1 })} >
              Từ chối
          </div>
          </div>
        </div>
        <Typography className="approve--title" >Mô tả thêm (nếu có)</Typography>
        <TextField
          className="approve--description"
          fullWidth
          multiline
          rows="6"
          margin="normal"
          placeholder="Nhập nội dung"
          variant="outlined"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </React.Fragment>
    </DialogWrap>
  )
}

export default ApproveOfferDialog