import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { find, get, isNil } from 'lodash';
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
    className={`view_ProjectGroup_EditProjectModal___form-control ${className}`}
    {...props}
  />;

const CustomTextField = ({ className = '', ...props }) =>
  <TextField
    className={`view_ProjectGroup_EditProjectModal___text-field ${className}`}
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

export default EditProject;
