import {FormControl, FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import CustomModal, {Title} from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import CustomTextboxSelect from 'components/CustomTextboxSelect';
import MySelect from 'components/MySelect';
import {CREATE_PROJECT, CustomEventDispose, CustomEventListener, LIST_PROJECT} from 'constants/events.js';
import {useMaxlenString, useRequiredString} from 'hooks';
import {find, first, get, isNil} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './style.scss';
import * as images from "assets/index";
import SelectGroupProject from '../SelectGroupProject';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className} per-line-step-in-form`}
    {...props}
  />;

function CreateNewProject({
  open, setOpen,
  groups, work_types,
  handleCreateProject,
  doReload, projectGroupId, timeRange
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(projectGroupId);
  const [curProjectGroupName, setCurProjectGroupName] = React.useState('');
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [workingType, setWorkingType] = React.useState(0);
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] = React.useState(false);
  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    const success = () => {
      doReload();
    }
    CustomEventListener(CREATE_PROJECT.FAIL, fail);
    CustomEventListener(CREATE_PROJECT.SUCCESS, success);
    return () => {
      CustomEventListener(CREATE_PROJECT.SUCCESS, success);
      CustomEventDispose(CREATE_PROJECT.FAIL, fail);
    }
  }, [projectGroupId, timeRange, doReload]);
  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setPriority(0);
      setCurProjectGroupId(projectGroupId);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success);
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
    }
  }, [projectGroupId, timeRange]);
  React.useEffect(() => {
    if(!isNil(work_types) && work_types.length > 0) {
      const _first = parseInt(first(work_types));
      setWorkingType(_first);
    }
  }, [work_types]);

  return (
    <>
      <CustomModal
        title={`${t("LABEL_WORKING_BOARD_CREATE_NEW")}`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName || !isNil(curProjectGroupId)}
        onConfirm={() => {
          handleCreateProject({
            projectGroupId: curProjectGroupId,
            name,
            description,
            priority,
            currency,
            work_type: workingType
          });
          setActiveLoading(true);
        }}
        onCancle={() => setOpen(false)}
        loading={groups.loading}
        activeLoading={activeLoading}
        manualClose={true}
      >
        <CustomTextbox
          value={name}
          onChange={value => setName(value)}
          label={`${t("LABEL_WORKING_BOARD_NAME")}`}
          fullWidth
          required={true}
          className={"view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"}
        />
        <CustomTextbox
          value={description}
          onChange={value => setDescription(value)}
          label={`${t("LABEL_CHAT_TASK_MO_TA_CONG_VIEC")}`}
          fullWidth
          multiline={true}
          className={"per-line-step-in-form"}
        />
        <div className="select-customer-from-input">
          <CustomTextboxSelect
            value={curProjectGroupName}
            onClick={() => setOpenSelectGroupProjectModal(true)}
            label={`${t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}`}
            fullWidth
            required={true}
            className={"view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"}
            isReadOnly={true}
          />
          <ArrowDropDownIcon className="icon-arrow" />
        </div>
        <StyledFormControl fullWidth>
          <Title>{t("LABEL_CATEGORY")}</Title>
          <div className={"view_ProjectGroup_CreateNew_selectCategory"}>
            <div
              className={`view_ProjectGroup_CreateNew_selectCategory_item ${workingType === 0 && 'active'}`}
              onClick={() => setWorkingType(0)}
            >
              <img src={images.check_64} width={20} height={20} alt={""}/>
              <span>{t("IDS_WP_TOPICS")}</span>
            </div>
            <div
              className={`view_ProjectGroup_CreateNew_selectCategory_item ${workingType === 1 && 'active'}`}
              onClick={() => setWorkingType(1)}
            >
              <img src={images.speed_64} width={20} height={20} alt={""}/>
              <span>{t("LABEL_REMIND_PROJECT")}</span>
            </div>
            <div
              className={`view_ProjectGroup_CreateNew_selectCategory_item ${workingType === 2 && 'active'}`}
              onClick={() => setWorkingType(2)}
            >
              <img src={images.workfollow_64} width={20} height={20} alt={""}/>
              <span>{t("IDS_WP_PROCESS")}</span>
            </div>
          </div>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <Title>
            {t("DMH.VIEW.PGP.MODAL.CUP.PRIO.TITLE")}
          </Title>
          <RadioGroup
            aria-label='priority'
            name='priority'
            value={priority}
            onChange={evt => setPriority(parseInt(evt.target.value))}
            row={true}
          >
            <FormControlLabel
              value={0}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.LOW")}
              labelPlacement="end"
            />
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.MED")}
              labelPlacement="end"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.HIGH")}
              labelPlacement="end"
            />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
      {
        openSelectGroupProjectModal &&
        <SelectGroupProject
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupProjectModal(value)}
          selectedOption={(group) => {
            setCurProjectGroupId(group.id);
            setCurProjectGroupName(group.name)
          }}
          groupSelected={curProjectGroupId}
        />
      }
    </>
  )
}

export default CreateNewProject;
