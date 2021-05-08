import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import CustomModal, { Title } from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import { CustomEventDispose, CustomEventListener, DETAIL_PROJECT, LIST_PROJECT, UPDATE_PROJECT } from 'constants/events.js';
import { useMaxlenString, useRequiredString } from 'hooks';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
import SelectGroupProject from '../SelectGroupProject';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CustomTextboxSelect from 'components/CustomTextboxSelect';
import * as images from "assets/index";

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_EditProjectModal___form-control ${className}`}
    {...props}
  />;

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  handleEditProject,
  doReload,
  projectGroupId, timeRange,
  projectGroupName,
  workType
}) {
  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(projectGroupId);
  const [curProjectGroupName, setCurProjectGroupName] = React.useState(projectGroupName);
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] = React.useState(false);
  const [workingType, setWorkingType] = React.useState(workType);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setName('');
      setDescription('');
      setPriority(0);
      setCurrency(0);
      setCurProjectGroupId(projectGroupId);
      setCurProjectGroupName(projectGroupName);
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    if (curProject) {
      setName(get(curProject, 'name', ''));
      setDescription(get(curProject, 'description', ''));
      setPriority(get(curProject, 'priority_code', 0));
      setCurrency(get(curProject, 'currency', 0));
      setCurProjectGroupId(projectGroupId)
      setCurProjectGroupName(projectGroupName)
      setWorkingType(workType)
    }
    // eslint-disable-next-line
  }, [curProject]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(UPDATE_PROJECT.SUCCESS, doReload);
    CustomEventListener(UPDATE_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_PROJECT.SUCCESS, doReload);
      CustomEventDispose(UPDATE_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectGroupId, curProject, timeRange]);

  React.useEffect(() => {
    const success = bit => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success(0));
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    CustomEventListener(DETAIL_PROJECT.SUCCESS, success(1));
    CustomEventListener(DETAIL_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success(0));
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
      CustomEventDispose(DETAIL_PROJECT.SUCCESS, success(1));
      CustomEventDispose(DETAIL_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectGroupId, curProject, timeRange]);

  return (
    <>
      <CustomModal
        title={t("DMH.VIEW.PGP.MODAL.CUP.U_TITLE")}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName}
        onConfirm={() => {
          handleEditProject({
            name,
            description,
            priority,
            currency,
            projectGroupId: curProjectGroupId,
            workType: workingType
          });
          setActiveMask(0);
        }}
        onCancle={() => setOpen(false)}
        loading={groups.loading}
        activeLoading={activeLoading}
        manualClose={true}
      >
        <div className="select-customer-from-input">
          <CustomTextboxSelect
            value={curProjectGroupName}
            onClick={() => setOpenSelectGroupProjectModal(true)}
            label={t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}
            fullWidth
            required={true}
            className={"view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"}
            isReadOnly={true}
          />
          <ArrowDropDownIcon className="icon-arrow" />
        </div>
        <CustomTextbox
          value={name}
          onChange={value => setName(value)}
          label={t("DMH.VIEW.PGP.MODAL.CUP.NAME")}
          fullWidth
          required={true}
        />
        <CustomTextbox
          value={description}
          onChange={value => setDescription(value)}
          label={t("DMH.VIEW.PGP.MODAL.CUP.DESC")}
          fullWidth
          multiline={true}
        />
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
            <abbr className="EditProject_required_label" title={t("IDS_WP_REQUIRED_LABEL")}>*</abbr>
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

export default EditProject;