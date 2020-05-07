import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
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

const SubTitle = ({ className = '', ...props }) =>
  <Typography
    className={`view_ProjectGroup_CreateNew_Project_Modal___subtitle ${className}`}
    {...props}
  />

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
      title={t("DMH.VIEW.PGP.MODAL.CUP.C_TITLE")}
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
        />
      </StyledFormControl>
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
        <SubTitle>
          {t("DMH.VIEW.PGP.MODAL.CUP.PRIO.TITLE")}
        </SubTitle>
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
