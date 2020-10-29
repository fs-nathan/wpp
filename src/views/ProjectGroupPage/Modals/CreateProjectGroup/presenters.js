import CustomAvatar from 'components/CustomAvatar';
import CustomModal, {Title} from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import UploadButton from 'components/UploadButton';
import {
  CREATE_PROJECT_GROUP,
  CustomEventDispose,
  CustomEventListener,
  DETAIL_PROJECT_GROUP,
  EDIT_PROJECT_GROUP,
  LIST_PROJECT_GROUP
} from 'constants/events.js';
import {useMaxlenString, useRequiredString} from 'hooks';
import {get, isNil, indexOf} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './style.scss';
import {Box, Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import apiConstant from "../../../../constants/apiConstant";

const LogoBox = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_Create_ProjectGroup___logo-box ${className}`}
    {...props}
  />;

function CreateProjectGroup({
  updatedProjectGroup,
  open, setOpen,
  handleCreateOrEditProjectGroup, handleOpenModal,
  doReloadDetail, doReloadList, createSuccessCallBack = () => {}
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: '',
    url_sort: '',
  });
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [workingTypes, setWorkingTypes] = React.useState([
    {type: t("IDS_WP_JOB"), value: 0, checked: true, disabled: false},
    {type: t("IDS_WP_PROJECT"), value: 1, checked: true, disabled: false},
    {type: t("IDS_WP_PROCESS"), value: 2, checked: true, disabled: false}
  ]);

  const handleWorkingTypeChange = index => {
    const _workingTypes = [...workingTypes];
    _workingTypes[index].checked = !_workingTypes[index].checked;
    setWorkingTypes(_workingTypes);
  }

  React.useEffect(() => {
    setName(get(updatedProjectGroup, 'name'));
    setDescription(get(updatedProjectGroup, 'description'));
    setIcon({
      url_full: get(updatedProjectGroup, 'icon', ''),
      url_sort: get(updatedProjectGroup, 'icon', '')
        .replace(apiConstant.BASE_IMG, ''),
    });
    const workTypes = get(updatedProjectGroup, 'work_types', []);
    setWorkingTypes([
      { type: t("IDS_WP_JOB"), value: 0,
        checked: indexOf(workTypes, "0") !== -1,
        disabled: get(updatedProjectGroup, "statistic.work_topic", 0) > 0
      },
      {
        type: t("IDS_WP_PROJECT"), value: 1,
        checked: indexOf(workTypes, "1") !== -1,
        disabled: get(updatedProjectGroup, "statistic.project", 0) > 0
      },
      {
        type: t("IDS_WP_PROCESS"), value: 2,
        checked: indexOf(workTypes, "2") !== -1,
        disabled: get(updatedProjectGroup, "statistic.process", 0) > 0
      }
    ]);
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    if (updatedProjectGroup) {
      CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
      CustomEventListener(EDIT_PROJECT_GROUP.FAIL, fail);
    }
    else {
      CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, createSuccessCallBack);
      CustomEventListener(CREATE_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
        CustomEventDispose(EDIT_PROJECT_GROUP.FAIL, fail);
      }
      else {
        CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, createSuccessCallBack);
        CustomEventDispose(CREATE_PROJECT_GROUP.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    if (updatedProjectGroup) {
      CustomEventListener(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(DETAIL_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(DETAIL_PROJECT_GROUP.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setIcon({
        url_full: '',
        url_sort: '',
      });
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    }
  }, []);

  return (
    <CustomModal
      title={updatedProjectGroup ? t("DMH.VIEW.PGP.MODAL.CUPG.U_TITLE") : t("DMH.VIEW.PGP.MODAL.CUPG.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && workingTypes.filter((item) => item.checked === true).length > 0}
      onConfirm={() => {
        handleCreateOrEditProjectGroup(name, description, icon, workingTypes);
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={true}
    >
      <CustomTextbox
        value={name}
        onChange={value => setName(value)}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.NAME")}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.DESC")}
        onChange={value => setDescription(value)}
        fullWidth
        multiline={true}
      />
      <Box className={"view_ProjectGroup_Create_ProjectGroup_applyWorkType"}>
        <div className={"view_ProjectGroup_Create_ProjectGroup_applyWorkType_title"}>{t("IDS_WP_APPLY_WORK_TYPE")}<abbr title={t("IDS_WP_REQUIRED_LABEL")}>*</abbr></div>
        <abbr title={workingTypes[0].disabled && t("IDS_WP_ALREADY_EXIST", {"object": t("IDS_WP_WORKING_TYPE")})}>
          <FormControlLabel
            control={<Checkbox checked={workingTypes[0].checked} onChange={() => handleWorkingTypeChange(0)} name={workingTypes[0].type} color={"primary"}/>}
            disabled={workingTypes[0].disabled}
            label={workingTypes[0].type}
          />
        </abbr>
        <abbr title={workingTypes[1].disabled && t("IDS_WP_ALREADY_EXIST", {"object": t("IDS_WP_PROJECT")})}>
          <FormControlLabel
            control={<Checkbox checked={workingTypes[1].checked} onChange={() => handleWorkingTypeChange(1)} name={workingTypes[1].type} color={"primary"}/>}
            disabled={workingTypes[1].disabled}
            label={workingTypes[1].type}
          />
        </abbr>
        <abbr title={workingTypes[2].disabled && t("IDS_WP_ALREADY_EXIST", {"object": t("IDS_WP_PROCESS")})}>
          <FormControlLabel
            control={<Checkbox checked={workingTypes[2].checked} onChange={() => handleWorkingTypeChange(2)} name={workingTypes[2].type} color={"primary"}/>}
            disabled={workingTypes[2].disabled}
            label={workingTypes[2].type}
          />
        </abbr>
      </Box>
      <LogoBox>
        <div>
          <Title>{t("DMH.VIEW.PGP.MODAL.CUPG.LOGO")}</Title>
          <UploadButton
            label={t('DMH.VIEW.PGP.MODAL.CUPG.LOGO_SELECT')}
            onClick={() => handleOpenModal('LOGO', {
              doSelectIcon: icon => setIcon(icon),
            })}
          />
        </div>
        <CustomAvatar src={icon.url_full} alt='avatar' />
      </LogoBox>
    </CustomModal>
  )
}

export default CreateProjectGroup;
