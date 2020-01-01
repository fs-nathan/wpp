import React from 'react';
import styled from 'styled-components';
import { 
  TextField, FormControl, Radio,
  FormLabel, RadioGroup, FormControlLabel, 
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import ColorTypo from '../../../../components/ColorTypo';
import { createProject } from '../../../../actions/project/createProject';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { useRequiredString } from '../../../../hooks';

const StyledFormControl = styled(FormControl)`
  min-width: 300px;
  max-width: 100%;
  & > * {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

const CustomTextField = styled(TextField)`
  & > label {
    z-index: 0;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  && {
    color: #a5a0a0;
  }
`;

function CreateNewProject({ open, setOpen, listProjectGroup, doCreateProject, }) {

  const { data: { projectGroups: _projectGroups } } = listProjectGroup;
  const [projectGroups, setProjectGroups] = React.useState([]);
  const [name, setName, errorName] = useRequiredString('', 200);
  const [description, setDescription, errorDescription] = useRequiredString('', 500);
  const [projectGroup, setProjectGroup] = React.useState(projectGroups[0]);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);

  React.useEffect(() => {
    setProjectGroups([{ id: '__default__', name: 'Chưa phân loại' }, ..._projectGroups]);
    setProjectGroup({ id: '__default__', name: 'Chưa phân loại' });
  }, [_projectGroups]);

  function handleCreateNewProject() {
    let options = {
      name,
      description,
      priority,
      currency,
    };
    if (get(projectGroup, 'id') !== '__default__') {
      options ={
        ...options,
      projectGroupId: get(projectGroup, 'id'),
      }
    }
    doCreateProject(options); 
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Tạo mới dự án`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDescription}
        onConfirm={() => handleCreateNewProject()}
      >
        <StyledFormControl fullWidth>
          <label htmlFor='room-select'>
            Nhóm dự án
          </label>
          <CustomSelect
            options={
              projectGroups.map(projectGroup => ({
                  value: get(projectGroup, 'id'),
                  label: get(projectGroup, 'name', ''),
                })
              )}
            value={{
              value: get(projectGroup, 'id'),
              label: get(projectGroup, 'name', ''),
            }}
            onChange={({ value: projectGroupId }) => setProjectGroup(find(projectGroups, { id: projectGroupId }))}
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
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listProjectGroup: state.projectGroup.listProjectGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateProject: ({ name, description, projectGroupId, priority, currency }) => dispatch(createProject({ name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewProject);
