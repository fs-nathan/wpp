import React from 'react';
import styled from 'styled-components';
import { TextField, FormControl } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import ColorTypo from '../../../../components/ColorTypo';
import { createProject } from '../../../../actions/project/createProject';
import { connect } from 'react-redux';
import { get, find } from 'lodash';

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

function CreateNewProject({ open, setOpen, listProjectGroup, doCreateProject, }) {

  const { data: { projectGroups } } = listProjectGroup;
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [projectGroup, setProjectGroup] = React.useState(projectGroups[0]);
  const [priority, setPriority] = React.useState(0);
  const [currency, setCurrency] = React.useState(0);

  React.useEffect(() => {
    setProjectGroup(projectGroups[0]);
  }, [projectGroups]);

  function handleCreateNewProject() {
    doCreateProject({
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
        title={`Tạo mới dự án`}
        open={open}
        setOpen={setOpen}
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
              Tối đa 200 ký tự
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
              Tối đa 500 ký tự
            </ColorTypo>
          }
        />
        <StyledFormControl fullWidth>
          <label htmlFor='room-select'>
            Mức độ ưu tiên
          </label>
          <CustomSelect
            options={
              ['Thấp', 'Trung bình', 'Cao'].map((priority, index) => ({
                  value: index,
                  label: priority,
                })
              )}
            value={{
              value: priority,
              label: ['Thấp', 'Trung bình', 'Cao'][priority],
            }}
            onChange={({ value }) => setPriority(value)}
          />
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
