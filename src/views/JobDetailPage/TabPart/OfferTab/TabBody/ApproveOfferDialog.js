import { Avatar, TextField, Typography } from '@material-ui/core';
import { mdiCancel, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { approveOffer } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priorityList } from '../data';
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
    priority_code = 0,
    content,
    title,
    id,
  } = item;
  const priority = priorityList[priority_code].value;

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
      className="approve"
    >
      <React.Fragment>
        <div className="approve--user">
          <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="offerDetail--title" component="div">
            {user_create_name}
            <div className="offerDetail--createdAt">Đã tạo đề xuất lúc {date_create}</div>
            <div className={clsx("approve--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`)}>
              {priority}
            </div>
          </Typography>
        </div>
        <div className="offerDetail--contentLabel">
          {title}
        </div>
        <Typography className="approve--content" >{content}</Typography>
        <Typography className="approve--title" >Nội dung phê duyệt</Typography>
        <div className="approve--select">
          <div className={clsx("approve--option", { "approve--option__green": type === 0 })} onClick={() => setType(0)}>
            <div className={clsx("approve--option-icon")} >
              <Icon path={mdiCheck} size={2} />
            </div>
            <div className={clsx("approve--option-text", { "approve--option__selected": type === 0 })} >
              Đồng ý
          </div>
          </div>
          <div className={clsx("approve--option", { "approve--option__red": type === 1 })} onClick={() => setType(1)}>
            <div className={clsx("approve--option-icon")} >
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