import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import { find, get, isNil } from 'lodash';
import React from 'react';
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
      <ColorTypo>Nhóm dự án</ColorTypo>
      <StyledFormControl fullWidth>
        <CustomTextField
          select
          variant="outlined"
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
      <ColorTypo>Tên dự án</ColorTypo>
      <CustomTextField
        value={name}
        onChange={evt => setName(evt.target.value)}
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
        Mức độ ưu tiên
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
            label="Thấp"
            labelPlacement="end"
          />
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label="Trung bình"
            labelPlacement="end"
          />
          <FormControlLabel
            value={2}
            control={<Radio color="primary" />}
            label="Cao"
            labelPlacement="end"
          />
        </RadioGroup>
      </StyledFormControl>
      <ColorTypo>Mô tả dự án</ColorTypo>
      <CustomTextbox
        value={description}
        onChange={value => setDescription(value)}
        helperText={get(errorDescription, 'message', '')}
      />
    </CustomModal>
  )
}

export default EditProject;
