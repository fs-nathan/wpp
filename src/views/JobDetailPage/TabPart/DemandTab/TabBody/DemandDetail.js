import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { mdiStarCircle, mdiStarCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openDetailDemand } from 'actions/chat/chat';

function DemandDetail({ }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.chat.isOpenDetailDemand);
  const dataDemand = useSelector(state => state.chat.dataDemand);

  function setOpen(open) {
    dispatch(openDetailDemand(open))
  }

  const {
    date_create,
    user_create_name,
    user_create_roles,
    user_create_avatar,
    content,
    type,
  } = dataDemand || {};
  const isDemand = type === 1
  return (
    <JobDetailModalWrap
      open={isOpen}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t('LABEL_CHAT_TASK_THOAT')}
      className="subTaskDetailDialog modal_height_50vh"
      titleRender={
        <div className="subTaskDetailDialog--titleWrap">
          <Avatar className="subTaskDetailDialog--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="subTaskDetailDialog--title" component="div">
            {user_create_name}
            <div className="subTaskDetailDialog--createdAt">{t('LABEL_CHAT_TASK_DA_CHI_DAO_LUC')}{date_create}</div>
          </Typography>
        </div>
      }
    >
      <>
        <div className="demandDetail--label">
          {isDemand ? t('LABEL_CHAT_TASK_CHI_DAO_LABEL') : t('LABEL_CHAT_TASK_QUYET_DINH_LABEL')}
        </div>
        <div className="demandDetail--iconContainer" >
          <div className="demandDetail--line">
          </div>
          <Icon className={clsx("demandDetail--icon", isDemand ? 'demandDetail--icon__orange' : 'demandDetail--icon__blue')}
            path={isDemand ? mdiStarCircleOutline : mdiStarCircle}
            size={2}
          />
          <div className="demandDetail--line">
          </div>
        </div>
        <DialogContentText className="demandDetail--content">
          {content}
        </DialogContentText>
      </>
    </JobDetailModalWrap>
  );
}

export default DemandDetail