import React from 'react';
import { 
  TextField, FormControl, Radio,
  FormLabel, RadioGroup, FormControlLabel, 
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import ColorTypo from '../../../../components/ColorTypo';
import { get, find } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../hooks';
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

const StyledFormLabel = ({ className = '', ...props }) => 
  <FormLabel 
    className={`view_ProjectGroup_EditProjectModal___form-label ${className}`}
    {...props}
  />;

function EditProject({ 
  curProject = null, 
  open, setOpen, 
  groups,
  handleEditProject, 
}) {

  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useMaxlenString('', 200);
  const [projectGroup, setProjectGroup] = React.useState(groups.groups[0]);
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);

  React.useEffect(() => {
    if (curProject) {
      setName(get(curProject, 'name', ''));
      setDescription(get(curProject, 'description', ''));
      setPriority(get(curProject, 'priority_code', 0));
      setCurrency(get(curProject, 'currency', 0));
      setProjectGroup(find(groups.groups, { id: get(curProject, 'project_group_id') }) 
        || find(groups.groups, { id: get(curProject, 'group_project_id') }) 
        || groups.groups[0]);
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
        projectGroupId: get(projectGroup, 'id') !== '__default__' 
          ? get(projectGroup, 'id')
          : undefined,
      })}
      loading={groups.loading}
    >
      <StyledFormControl fullWidth>
        <label htmlFor='room-select'>
          Nhóm dự án
        </label>
        <CustomSelect
          options={
            groups.groups.map(projectGroup => ({
                value: get(projectGroup, 'id'),
                label: get(projectGroup, 'name', ''),
              })
            )}
          value={{
            value: get(projectGroup, 'id'),
            label: get(projectGroup, 'name', ''),
          }}
          onChange={({ value: projectGroupId }) => setProjectGroup(find(groups.groups, { id: projectGroupId }))}
        />
      </StyledFormControl>
      <CustomTextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên dự án'
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <CustomTextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Mô tả dự án'
        fullWidth
        multiline
        rowsMax='6'
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorDescription, 'message', '')}
          </ColorTypo>
        }
      />
      <StyledFormControl fullWidth>
        <StyledFormLabel component="legend" htmlFor='room-select'>
          Mức độ ưu tiên
        </StyledFormLabel>
        <RadioGroup
          aria-label='priority'
          name='priority'
          value={priority}
          onChange={evt => setPriority(parseInt(evt.target.value))}
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
    </CustomModal>
  )
}

export default EditProject;
