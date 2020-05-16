import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { openDetailSubTask } from 'actions/chat/chat';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

function SubTaskDetailDialog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpenDetailSubTask = useSelector(state => state.chat.isOpenDetailSubTask);
  const dataSubTask = useSelector(state => state.chat.dataSubTask);
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
  } = dataSubTask || {};

  function setOpenDetailSubTask(isOpen) {
    dispatch(openDetailSubTask(isOpen))
  }

  return (
    <JobDetailModalWrap
      open={isOpenDetailSubTask}
      setOpen={setOpenDetailSubTask}
      confirmRender={null}
      className={clsx("subTaskDetailDialog", { "modal_height_30vh": !user_complete_name, "modal_height_50vh": user_complete_name })}
      titleRender={
        <div className="subTaskDetailDialog--titleWrap">
          <Avatar className="subTaskDetailDialog--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="subTaskDetailDialog--title" component="div">
            {user_create_name}
            <div className="subTaskDetailDialog--createdAt">{t('LABEL_CHAT_TASK_DA_TAO_CONG_VIEC_LUC', { created_at })}</div>
          </Typography>
        </div>
      }
    >
      <div className="subTaskDetailDialog--container">
        <div className="subTaskDetailDialog--contentLabel">
          {name}
        </div>
        <div className="subTaskDetailDialog--row">
          <div className="subTaskDetailDialog--label">{t('LABEL_CHAT_TASK_TRANG_THAI')}</div>
          <div className={clsx("subTaskDetailDialog--content", { "subTaskDetailDialog__finished": status === 1 })}>
            {status === 0 ? t('LABEL_CHAT_TASK_DANG_LAM') : t('LABEL_CHAT_TASK_HOAN_THANH')}
          </div>
        </div>
        {user_complete_name &&
          <>
            <div className="subTaskDetailDialog--row">
              <div className="subTaskDetailDialog--label">{t('LABEL_CHAT_TASK_HOAN_THANH')}</div>
              <div className="subTaskDetailDialog--content">
                {user_complete_name &&
                  <Avatar className="subTaskDetailDialog--avatarCompleted" src={user_complete_avatar} alt='avatar' />
                }
                {user_complete_name}
              </div>
            </div>
            <div className="subTaskDetailDialog--row">
              <div className="subTaskDetailDialog--label">{t('LABEL_CHAT_TASK_NGAY_HOAN_THANH')}</div>
              <div className="subTaskDetailDialog--content">
                {time_complete}
              </div>
            </div>
          </>
        }
      </div>
    </JobDetailModalWrap>
  );
}

export default SubTaskDetailDialog