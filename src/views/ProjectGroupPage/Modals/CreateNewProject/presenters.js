import {FormControl, FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import CustomModal, {Title} from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import {CREATE_PROJECT, CustomEventDispose, CustomEventListener, LIST_PROJECT} from 'constants/events.js';
import {useMaxlenString, useRequiredString} from 'hooks';
import {find, first, get, isNil} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import './style.scss';
import * as images from "assets/index";
import { useHistory } from 'react-router-dom';
import { Routes } from "constants/routes";

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className}`}
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
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [workingType, setWorkingType] = React.useState(0);
  const [selectableGroup, setSelectableGroup] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    const success = () => {
      doReload();
    }
    CustomEventListener(CREATE_PROJECT.FAIL, fail);
    CustomEventListener(CREATE_PROJECT.SUCCESS, (e) => {
      history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
    });
    return () => {
      CustomEventDispose(CREATE_PROJECT.SUCCESS, (e) => {
        history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
      });
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
  React.useEffect(() => {
    if(!isNil(projectGroupId)) {
      setCurProjectGroupId(projectGroupId);
      setSelectableGroup([find(groups.groups, { id: projectGroupId })]);
    } else {
      setSelectableGroup(groups.groups.filter(e => e.work_types.find(c => c === String(workingType))));
    }
  }, [projectGroupId,groups]);

  return (
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
        className={"view_ProjectGroup_CreateNew_Project_Modal_formItem"}
      />
      <CustomTextbox
        value={description}
        onChange={value => setDescription(value)}
        label={`${t("LABEL_TASK_DETAIL")}`}
        fullWidth
        multiline={true}
      />
      <StyledFormControl fullWidth>
        <MySelect
          label={t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}
          options={selectableGroup.map(projectGroup => ({
            label: get(projectGroup, 'name'),
            value: get(projectGroup, 'id'),
          }))}
          value={{
            label: get(find(selectableGroup, { id: curProjectGroupId }), 'name'),
            value: curProjectGroupId,
          }}
          onChange={({ value: curProjectGroupId }) => setCurProjectGroupId(curProjectGroupId)}
          isRequired={true}
        />
      </StyledFormControl>
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
  )
}

export default CreateNewProject;
