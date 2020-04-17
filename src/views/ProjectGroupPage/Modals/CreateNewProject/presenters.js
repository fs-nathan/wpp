import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { find, get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import MySelect from '../../../../components/MySelect';
import { useMaxlenString, useRequiredString } from '../../../../hooks';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className}`}
    {...props}
  />;

const CustomTextField = ({ className = '', ...props }) =>
  <TextField
    className={`view_ProjectGroup_CreateNew_Project_Modal___text-field ${className}`}
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
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(get(groups.groups[0], 'id'));

  return (
    <CustomModal
      title={t("DMH.VIEW.PGP.MODAL.CUP.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() =>
        handleCreateProject({
          projectGroupId: curProjectGroupId !== get(groups.groups[0], 'id')
            ? curProjectGroupId
            : undefined,
          name,
          description,
          priority,
          currency,
        })
      }
      loading={groups.loading}
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
      <CustomTextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        label={t("DMH.VIEW.PGP.MODAL.CUP.NAME")}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <CustomTextbox
        value={description}
        onChange={value => setDescription(value)}
        label={t("DMH.VIEW.PGP.MODAL.CUP.DESC")}
        helperText={get(errorDescription, 'message', '')}
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
