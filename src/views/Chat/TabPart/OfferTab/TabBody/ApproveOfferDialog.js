import { Avatar, Box, TextField, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { mdiCancel, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { approveOffer } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { action as _action } from 'views/OfferPage/contants/attrs';
import { handleOfferOfferPage } from 'views/OfferPage/redux/actions';
import { } from 'views/OfferPage/redux/sagas';
import CustomModal from '../../../../../components/CustomModal';
import TitleSectionModal from '../../../../../components/TitleSectionModal';
import { priorityList } from '../data';
import { getCancelBtnTitle, getConfirmBtnTitle } from './i18nSelectors';
import './styles.scss';


const ApproveOfferDialog = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [type, setType] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const { item } = props;
  const {
    action,
    user_create_avatar,
    user_create_name,
    date_create,
    priority_name = '',
    priority_code = 0,
    content,
    title,
    id, learn_more_redirect
  } = item;
  const priority = priorityList[priority_code].value;

  function onClickApproveOffer() {
    if (action === _action.HANDLE_OFFER) {
      dispatch(handleOfferOfferPage({ offer_id: id, content: description, status: type, additionQuery: props.additionQuery }))
      return
    }
    dispatch(approveOffer({ offer_id: id, content: description, status: type, task_id: taskId }));
  }

  return (
    <CustomModal
      title={t('LABEL_CHAT_TASK_PHE_DUYET_DE_XUAT')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => getConfirmBtnTitle(t)}
      onConfirm={onClickApproveOffer}
      cancleRender={() => getCancelBtnTitle(t)}
      className="approve"
    >
      <React.Fragment>
        <div className="approve--user">
          <Avatar className="offerDetail--avatar" src={user_create_avatar} alt='avatar' />
          <Typography className="approve--userName" component="div">
            {user_create_name}
            <div className="offerDetail--createdAt">{t('LABEL_CHAT_TASK_DA_TAO_DE_XUAT_LUC')}{date_create}</div>
            <div className={clsx("approve--priority", `offerTabItem--priority__${priority_name.toLowerCase()}`, `offerTabItem--priority__${priority_code}`)}>
              {priority}
            </div>
          </Typography>
        </div>
        <div className="offerDetail--contentLabel">
          {title}
        </div>
        <Typography className="approve--content" >{content}</Typography>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_NOI_DUNG_PHE_DUYET')} isRequired />
        <div className="approve--select">
          <div className={clsx("approve--option", { "approve--option__green": type === 0 })} onClick={() => setType(0)}>
            <div className={clsx("approve--option-icon")} >
              <Icon path={mdiCheck} size={2} />
            </div>
            <div className={clsx("approve--option-text", { "approve--option__selected": type === 0 })} >{t('LABEL_CHAT_TASK_DONG_Y')}</div>
          </div>
          <div className={clsx("approve--option", { "approve--option__red": type === 1 })} onClick={() => setType(1)}>
            <div className={clsx("approve--option-icon")} >
              <Icon path={mdiCancel} size={2} />
            </div>
            <div className={clsx("approve--option-text", { "approve--option__selected": type === 1 })} >{t('LABEL_CHAT_TASK_TU_CHOI')}</div>
          </div>
        </div>
        <TitleSectionModal label={t('LABEL_CHAT_TASK_MO_TA_THEM_NEU_CO')} />
        <TextField
          className="approve--description"
          fullWidth
          multiline
          rows="6"
          margin="normal"
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
          variant="outlined"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Box className="approve__warning">
          <div className="approve__warning_icon">
            <WarningIcon htmlColor="#fa2500" fontSize="large" />
          </div>
          <p className="approve__warning_content">
            {t("VIEW_OFFER_TEXT_CREATE_APPROVE_WARNING_1")}<br />
            {t("VIEW_OFFER_TEXT_CREATE_APPROVE_WARNING_2")}<b>&#32;<a href={learn_more_redirect} target="_blank">{t("VIEW_OFFER_LABEL_LEARN_MORE")}</a></b>
          </p>
        </Box>
      </React.Fragment>
    </CustomModal>
  )
}

export default ApproveOfferDialog
