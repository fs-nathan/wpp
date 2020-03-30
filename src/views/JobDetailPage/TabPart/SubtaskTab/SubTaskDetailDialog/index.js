import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import CustomModal from 'components/CustomModal';
import React from 'react';
import './styles.scss';

function SubTaskDetailDialog({
  isOpen,
  item,
  setOpen,
}) {
  const {
    user_create_name,
    user_create_avatar,
    user_complete_name,
    user_complete_avatar,
    time_complete,
    description,
    name,
    created_at,
    status,
  } = item || {};

  return (
    <CustomModal
      open={isOpen}
      setOpen={setOpen}
      confirmRender={null}
      className="subTaskDetailDialog"
      titleRender={
        <div className="subTaskDetailDialog--titleWrap">
          <Avatar className="subTaskDetailDialog--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="subTaskDetailDialog--title" component="div">
            {user_create_name}
            <div className="subTaskDetailDialog--createdAt">
              Đã tạo công việc lúc: {created_at}</div>
          </Typography>
        </div>
      }
    >
      <div className="subTaskDetailDialog--container">
        <div className="subTaskDetailDialog--contentLabel">
          {name}
        </div>
        <div className="subTaskDetailDialog--row">
          <div className="subTaskDetailDialog--label">
            Trạng thái:
          </div>
          <div className={clsx("subTaskDetailDialog--content", { "subTaskDetailDialog__finished": status === 1 })}>
            {status === 0 ? "Đang làm" : "Hoàn thành"}
          </div>
        </div>
        <div className="subTaskDetailDialog--row">
          <div className="subTaskDetailDialog--label">
            Hoàn thành:
          </div>
          <div className="subTaskDetailDialog--content">
            <Avatar className="subTaskDetailDialog--avatarCompleted" src={user_complete_avatar} alt='avatar' />
            {user_complete_name}
          </div>
        </div>
        <div className="subTaskDetailDialog--row">
          <div className="subTaskDetailDialog--label">
            Ngày hoàn thành:
            </div>
          <div className="subTaskDetailDialog--content">
            {time_complete}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default SubTaskDetailDialog