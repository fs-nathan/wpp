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
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className}`}
    {...props}
  />;

const CustomTextField = ({ className = '', ...props }) => 
  <TextField 
    className={`view_ProjectGroup_CreateNew_Project_Modal___text-field ${className}`}
    {...props}
  />;

const StyledFormLabel = ({ className = '', ...props }) => 
  <FormLabel 
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-label ${className}`}
    {...props}
  />;

function CreateNewProject({ 
  open, setOpen, 
  groups, 
  handleCreateProject, 
}) {

  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [projectGroup, setProjectGroup] = React.useState(groups.groups[0]);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);

  return (
    <CustomModal
      title={`Tạo mới dự án`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => 
        handleCreateProject({
          projectGroupId: get(projectGroup, 'id') !== '__default__'
            ? get(projectGroup, 'id')
            : undefined,
          name,
          description,
          priority,
          currency,
        })
      }
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

export default CreateNewProject;
