import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import { CustomEventDispose, CustomEventListener, DETAIL_PROJECT, LIST_PROJECT, UPDATE_PROJECT } from 'constants/events.js';
import { useMaxlenString, useRequiredString } from 'hooks';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_EditProjectModal___form-control ${className}`}
    {...props}
  />;

const SubTitle = ({ className = '', ...props }) =>
  <Typography
    className={`view_ProjectGroup_CreateNew_Project_Modal___subtitle ${className}`}
    {...props}
  />

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  handleEditProject,
  doReload,
  projectGroupId,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(get(groups.groups[0], 'id'));
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setName('');
      setDescription('');
      setPriority(0);
      setCurrency(0);
      setCurProjectGroupId(get(groups.groups[0], 'id'));
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    if (curProject) {
      setName(get(curProject, 'name', ''));
      setDescription(get(curProject, 'description', ''));
      setPriority(get(curProject, 'priority_code', 0));
      setCurrency(get(curProject, 'currency', 0));
      setCurProjectGroupId(
        !isNil(find(groups.groups, { id: get(curProject, 'project_group_id') }))
          ? get(curProject, 'project_group_id')
          : !isNil(find(groups.groups, { id: get(curProject, 'group_project_id') }))
            ? get(curProject, 'group_project_id')
            : get(groups.groups[0], 'id')
      );
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
  }, [projectGroupId, curProject]);

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
  }, [projectGroupId, curProject]);

  return (
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
        });
        setActiveMask(0);
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

export default EditProject;

export function EditProjectNoReload({
  curProject = null,
  open, setOpen,
  groups,
  handleEditProject,
  doReload,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription] = useMaxlenString('', 500);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(get(groups.groups[0], 'id'));
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    if (curProject) {
      setName(get(curProject, 'name', ''));
      setDescription(get(curProject, 'description', ''));
      setPriority(get(curProject, 'priority_code', 0));
      setCurrency(get(curProject, 'currency', 0));
      setCurProjectGroupId(
        !isNil(find(groups.groups, { id: get(curProject, 'project_group_id') }))
          ? get(curProject, 'project_group_id')
          : !isNil(find(groups.groups, { id: get(curProject, 'group_project_id') }))
            ? get(curProject, 'group_project_id')
            : get(groups.groups[0], 'id')
      );
    }
    // eslint-disable-next-line
  }, [curProject]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(UPDATE_PROJECT.SUCCESS, doReload);
    CustomEventListener(UPDATE_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_PROJECT.SUCCESS, doReload);
      CustomEventDispose(UPDATE_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
      setPriority(0);
      setCurrency(0);
      setCurProjectGroupId(get(groups.groups[0], 'id'));
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DETAIL_PROJECT.SUCCESS, success);
    CustomEventListener(DETAIL_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(DETAIL_PROJECT.SUCCESS, success);
      CustomEventDispose(DETAIL_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject]);

  return (
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