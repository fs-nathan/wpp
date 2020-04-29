import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import { getStatusName, priorityList } from '../data';
import './styles.scss';

function OfferDetail({
  isOpen,
  handleOpenModalDelete,
  handleClickEditItem,
  handleClickApprove,
  item,
  setOpen,
}) {
  const { t } = useTranslation();
  const groupActiveColor = useSelector(currentColorSelector)
  const {
    user_create_avatar,
    user_create_name,
    priority_name = '',
    priority_code = 0,
    content,
    title,
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
    <JobDetailModalWrap
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => " Phê duyệt"}
      onConfirm={handleClickApprove}
      canConfirm={true}
      className="offerDetail"
      titleRender={
        <div className="offerDetail--titleWrap">
          <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="offerDetail--title" component="div">
            {user_create_name}
            <div className="offerDetail--createdAt">{t('LABEL_CHAT_TASK_DA_TAO_DE_XUAT_LUC')}{date_create}</div>
          </Typography>
        </div>
      }
    >
      <div className="offerDetail--container">
        <div className="offerDetail--contentLabel">
          {title}
        </div>
        <div className="offerDetail--content">
          {content}
        </div>
        <div className="offerDetail--priority offerDetail--row">
          <div className="offerDetail--label">{t('LABEL_CHAT_TASK_MUC_DO')}</div>
          <div className="offerDetail--data">
            <div className={clsx("offerDetail--priorityLabel", `offerDetail--priorityLabel__${priority_name.toLowerCase()}`)}>
              {priority}
            </div>
          </div>
        </div>
        <div className="offerDetail--row">
          <div className="offerDetail--label">{t('LABEL_CHAT_TASK_PHE_DUYET')}{user_can_handers.length})
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
        <div className="offerDetail--row">
          <div className="offerDetail--label">{t('LABEL_CHAT_TASK_GIAM_SAT')}{user_monitors.length})
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
        <div className="offerDetail--row">
          <div className="offerDetail--label">{t('LABEL_CHAT_TASK_KET_QUA_PHE_DUYET')}</div>
          <div className="offerDetail--data">
            {status} ({total_accepted}/{total_approved}{t('LABEL_CHAT_TASK_DONG_Y')}{total_rejected}/{total_approved}{t('LABEL_CHAT_TASK_TU_CHOI')}</div>
        </div>
      </div>
    </JobDetailModalWrap>
  );
}

export default OfferDetail