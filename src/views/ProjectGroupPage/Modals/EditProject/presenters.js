import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import { find, get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import { useMaxlenString, useRequiredString } from '../../../../hooks';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_EditProjectModal___form-control ${className}`}
    {...props}
  />;

const CustomTextField = ({ className = '', ...props }) =>
  <TextField
    className={`view_ProjectGroup_EditProjectModal___text-field ${className}`}
    {...props}
  />;

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  handleEditProject,
}) {

  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [curProjectGroupId, setCurProjectGroupId] = React.useState(get(groups.groups[0], 'id'));
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);

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

  return (
    <CustomModal
      title={`Chỉnh sửa dự án`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleEditProject({
        name,
        description,
        priority,
        currency,
        projectGroupId: curProjectGroupId !== get(groups.groups[0], 'id')
          ? curProjectGroupId
          : undefined,
      })}
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

export default EditProject;
