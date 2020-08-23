import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import { CustomEventDispose, CustomEventListener, DETAIL_STATUS, LIST_PROJECT, UPDATE_STATUS_COPY, UPDATE_STATUS_DATE, UPDATE_STATUS_VIEW } from 'constants/events.js';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
import {UPDATE_NOTIFICATION_SETTING} from "constants/events";

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_ProjectSettingModal___form-control ${className}`}
    {...props}
  />;

const TitleFormLabel = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_ProjectSettingModal___form-title ${className}`}
    {...props}
  />;

const StyledFormLabel = ({ className = '', ...props }) =>
  <FormLabel
    className={`view_ProjectGroup_ProjectSettingModal___form-label ${className}`}
    {...props}
  />;

const CustomFormControlLabel = ({ className = '', ...props }) =>
  <FormControlLabel
    className={`view_ProjectGroup_ProjectSettingModal___form-control-label ${className}`}
    {...props}
  />;

function ProjectSetting({
  open, setOpen, status,
  curProject, canChange,
  handleUpdateStatusCopy,
  handleUpdateStatusDate,
  handleUpdateStatusView,
  handleUpdateNotificationSetting,
  doReload, projectGroupId, timeRange,
}) {
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState(0);
  const [copy, setCopy] = React.useState(0);
  const [view, setView] = React.useState(0);
  const [notification, setNotification] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [mask, setMask] = React.useState(-1);

  React.useEffect(() => {
    setLoading((!(mask === 3 || mask === -1)));
  }, [mask]);

  React.useEffect(() => {
    setProgress(parseInt(get(status.status, 'date', 0)));
    setCopy(get(status.status, 'copy', false) === true ? 1 : 0);
    setView(parseInt(get(status.status, 'view', 0)));
    setNotification(get(status.status, 'notification', true) === true ? 1 : 0);
  }, [status]);

  React.useEffect(() => {
    const fail = () => {
      setMask(-1);
    };
    CustomEventListener(UPDATE_STATUS_COPY.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_DATE.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_VIEW.SUCCESS, doReload);
    CustomEventListener(UPDATE_NOTIFICATION_SETTING.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_COPY.FAIL, fail);
    CustomEventListener(UPDATE_STATUS_DATE.FAIL, fail);
    CustomEventListener(UPDATE_STATUS_VIEW.FAIL, fail);
    CustomEventListener(UPDATE_NOTIFICATION_SETTING.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_STATUS_COPY.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_DATE.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_VIEW.SUCCESS, doReload);
      CustomEventDispose(UPDATE_NOTIFICATION_SETTING.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_COPY.FAIL, fail);
      CustomEventDispose(UPDATE_STATUS_DATE.FAIL, fail);
      CustomEventDispose(UPDATE_STATUS_VIEW.FAIL, fail);
      CustomEventDispose(UPDATE_NOTIFICATION_SETTING.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject, projectGroupId, timeRange]);

  React.useEffect(() => {
    const success = bit => () => {
      setMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setMask(-1);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success(0));
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    CustomEventListener(DETAIL_STATUS.SUCCESS, success(1));
    CustomEventListener(DETAIL_STATUS.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success(0));
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
      CustomEventDispose(DETAIL_STATUS.SUCCESS, success(1));
      CustomEventDispose(DETAIL_STATUS.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject, projectGroupId, timeRange]);

  return (
    <React.Fragment>
      <CustomModal
        title={t("PROJECT_SETTING_MODAL_TITLE")}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        cancleRender={() => t("IDS_WP_EXIT")}
        loading={loading || status.loading}
      >
        {get(canChange, 'date', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_PROGRESS")}</TitleFormLabel>
          <StyledFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_PROGRESS_DESCRIPTION")}</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={progress}
            onChange={evt => {
              handleUpdateStatusDate(parseInt(evt.target.value));
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={2} control={<Radio color={'primary'} />} label={<React.Fragment>{t("PROJECT_SETTING_MODAL_PROGRESS_OPTION_2")} <small>{t("LABEL_CHAT_TASK_MAC_DINH")}</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_PROGRESS_OPTION_1")} />
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_PROGRESS_OPTION_0")} />
          </RadioGroup>
        </StyledFormControl>}
        {get(canChange, 'copy', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_COPYING")}</TitleFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={copy}
            onChange={evt => {
              handleUpdateStatusCopy(parseInt(evt.target.value) === 1 ? true : false);
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={<React.Fragment>{t("PROJECT_SETTING_MODAL_COPYING_OPTION_0")} <small>{t("LABEL_CHAT_TASK_MAC_DINH")}</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_COPYING_OPTION_1")} />
          </RadioGroup>
        </StyledFormControl>}
        {get(canChange, 'view', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_VIEW_TYPE")}</TitleFormLabel>
          <StyledFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_VIEW_TYPE_DESCRIPTION")}</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={view}
            onChange={evt => {
              handleUpdateStatusView(parseInt(evt.target.value));
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={<React.Fragment>{t("PROJECT_SETTING_MODAL_VIEW_TYPE_OPTION_0")} <small>{t("LABEL_CHAT_TASK_MAC_DINH")}</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_VIEW_TYPE_OPTION_1")} />
            <CustomFormControlLabel value={2} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_VIEW_TYPE_OPTION_2")} />
          </RadioGroup>
        </StyledFormControl>}
        <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_NOTIFICATION_SETTING")}</TitleFormLabel>
          <StyledFormLabel component='legend'>{t("PROJECT_SETTING_MODAL_NOTIFICATION_SETTING_DESCRIPTION")}</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={notification}
            onChange={evt => {
              handleUpdateNotificationSetting(parseInt(evt.target.value));
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_NOTIFICATION_ON")} />
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={t("PROJECT_SETTING_MODAL_NOTIFICATION_OFF")} />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
    </React.Fragment>
  )
}

export default ProjectSetting;