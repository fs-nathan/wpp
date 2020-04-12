import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
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
        <CustomTextField
          select
          variant="outlined"
          label={t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}
          value={curProjectGroupId}
          onChange={evt => setCurProjectGroupId(evt.target.value)}
        >
          {groups.groups.map(projectGroup =>
            <MenuItem key={get(projectGroup, 'id')} value={get(projectGroup, 'id')}>
              {get(projectGroup, 'name')}
            </MenuItem>
          )}
        </CustomTextField>
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
      <ColorTypo>
        {t("DMH.VIEW.PGP.MODAL.CUP.PRIO.TITLE")}
      </ColorTypo>
      <StyledFormControl fullWidth>
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
      <CustomTextbox
        value={description}
        onChange={value => setDescription(value)}
        label={t("DMH.VIEW.PGP.MODAL.CUP.DESC")}
        helperText={get(errorDescription, 'message', '')}
      />
    </CustomModal>
  )
}

export default CreateNewProject;
