import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import CustomModal, { Title } from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import { CREATE_PROJECT, CustomEventDispose, CustomEventListener, LIST_PROJECT } from 'constants/events.js';
import { useMaxlenString, useRequiredString } from 'hooks';
import { find, get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className}`}
    {...props}
  />;

function CreateNewProject({
  open, setOpen,
  groups,
  handleCreateProject,
  doReload,
  projectGroupId, timeRange
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(get(groups.groups[0], 'id'));
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [workingType, setWorkingType] = React.useState(0);
  const workingTypes = [
    {type: t("IDS_WP_JOB"), value: 0},
    {type: t("IDS_WP_PROJECT"), value: 1},
    {type: t("IDS_WP_PROCESS"), value: 2}
  ]

  const handleChangeWorkType = type => {
    setWorkingType(type);
  }
  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_PROJECT.SUCCESS, doReload);
    CustomEventListener(CREATE_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_PROJECT.SUCCESS, doReload);
      CustomEventDispose(CREATE_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectGroupId, timeRange]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setPriority(0);
      setCurProjectGroupId(get(groups.groups[0], 'id'));
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
    // eslint-disable-next-line
  }, [projectGroupId, timeRange]);

  return (
    <CustomModal
      title={`${t("IDS_WP_CREATE_NEW")} ${get(find(workingTypes, { value: workingType }), 'type')}`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateProject({
          projectGroupId: curProjectGroupId,
          name,
          description,
          priority,
          currency,
        });
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      loading={groups.loading}
      activeLoading={activeLoading}
      manualClose={true}
    >
      <StyledFormControl fullWidth>
        <MySelect
          label={t("IDS_WP_SELECT_TYPE")}
          options={workingTypes.map(item => ({
            label: item.type,
            value: item.value,
          }))}
          value={{
            label: get(find(workingTypes, { value: workingType }), 'type'),
            value: workingType,
          }}
          onChange={({ value: workingType }) => handleChangeWorkType(workingType)}
          isRequired={true}
        />
        <MySelect
          label={t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}
          options={groups.groups.map(projectGroup => ({
            label: get(projectGroup, 'name'),
            value: get(projectGroup, 'id'),
          }))}
          value={{
            label: get(find(groups.groups, { id: curProjectGroupId }), 'name'),
            value: curProjectGroupId,
          }}
          onChange={({ value: curProjectGroupId }) => setCurProjectGroupId(curProjectGroupId)}
          isRequired={true}
        />
      </StyledFormControl>
      <CustomTextbox
        value={name}
        onChange={value => setName(value)}
        label={`${t("IDS_WP_NAME")} ${get(find(workingTypes, { value: workingType }), 'type')}`}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        onChange={value => setDescription(value)}
        label={`${t("GANTT_DESCRIPTION")} ${get(find(workingTypes, { value: workingType }), 'type')}`}
        fullWidth
        multiline={true}
      />
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
