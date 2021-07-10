import { showTab } from 'actions/taskDetail/taskDetailActions';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './styles.scss';

const UpdateDurationMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  new_task_name,
  time_changes = [],
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dateFormat = useSelector(state => state.system.profile.format_date);

  function onClickViewDetail() {
    dispatch(showTab(1))
  }

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      isHideFooterIcon
      onClickViewDetail={onClickViewDetail}
      actionName={t('LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO_THUC_HIEN')}
      newUi={true}
    >
      <>
        {time_changes.start &&
          <>
            <div className="UpdateDurationMessage--content" onClick={onClickViewDetail}>
              <span className="member-name">
                {t('LABEL_CHAT_TASK_BAT_DAU')}
                {t('LABEL_CHAT_TASK_TU_SANG', {
                  from: getUpdateProgressDate(time_changes.start.old, dateFormat),
                  to: getUpdateProgressDate(time_changes.start.new, dateFormat)
                })}
              </span>
              <ArrowForwardIosIcon className="icon-view-more" />
            </div>
          </>
        }
        {time_changes.end &&
          <>
            <div className="UpdateDurationMessage--content" onClick={onClickViewDetail}>
              <span className="member-name">
                {t('LABEL_CHAT_TASK_KET_THUC')}
                {t('LABEL_CHAT_TASK_TU_SANG', {
                  from: getUpdateProgressDate(time_changes.end.old, dateFormat),
                  to: getUpdateProgressDate(time_changes.end.new, dateFormat)
                })}
              </span>
              <ArrowForwardIosIcon className="icon-view-more" />
            </div>
          </>
        }
      </>
    </DialogMessageWrap>
  );
}

UpdateDurationMessage.propTypes = {

};

export default UpdateDurationMessage;
