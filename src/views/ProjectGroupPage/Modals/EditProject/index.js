import React from 'react';
import styled from 'styled-components';
import { 
  TextField, FormControl, Radio,
  FormLabel, RadioGroup, FormControlLabel, 
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import ColorTypo from '../../../../components/ColorTypo';
import { updateProject } from '../../../../actions/project/updateProject';
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

function EditProject({ curProject = null, open, setOpen, listProjectGroup, doUpdateProject, }) {

  const { data: { projectGroups } } = listProjectGroup;
  const [name, setName, errorName] = useRequiredString(get(curProject, 'name', ''), 200);
  const [description, setDescription, errorDescription] = useRequiredString(get(curProject, 'description', ''), 200);
  const [projectGroup, setProjectGroup] = React.useState(find(projectGroups, { id: get(curProject, 'project_group_id') }) || projectGroups[0]);
  const [priority, setPriority] = React.useState(get(curProject, 'priority_code', 0));
  const [currency, setCurrency] = React.useState(get(curProject, 'currency', 0));

  React.useEffect(() => {
    setName(get(curProject, 'name', ''));
    setDescription(get(curProject, 'description', ''));
    setPriority(get(curProject, 'priority_code', 0));
    setCurrency(get(curProject, 'currency', 0));
  }, [curProject, setName, setDescription]);

  React.useEffect(() => {
    setProjectGroup(find(projectGroups, { id: get(curProject, 'project_group_id') }) || projectGroups[0]);
  }, [curProject, projectGroups])

  function handleEditProject() {
    doUpdateProject({
      projectId: get(curProject, 'id'),
      name,
      description,
      projectGroupId: get(projectGroup, 'id'),
      priority,
      currency,
    }); 
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Chỉnh sửa dự án`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDescription}
        onConfirm={() => handleEditProject()}
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
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);
