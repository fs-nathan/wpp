import React from 'react';
import styled from 'styled-components';
import { TextField, FormControl } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomSelect from '../../../../components/CustomSelect';
import ColorTypo from '../../../../components/ColorTypo';
import { updateProject } from '../../../../actions/project/updateProject';
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

function EditProject({ curProject = null, open, setOpen, listProjectGroup, doUpdateProject, }) {

  const { data: { projectGroups } } = listProjectGroup;
  const [name, setName] = React.useState(get(curProject, 'name', ''));
  const [description, setDescription] = React.useState(get(curProject, 'description', ''));
  const [projectGroup, setProjectGroup] = React.useState(find(projectGroups, { id: get(curProject, 'project_group_id') }) || projectGroups[0]);
  const [priority, setPriority] = React.useState(get(curProject, 'priority_code', 0));
  const [currency, setCurrency] = React.useState(get(curProject, 'currency', 0));

  React.useEffect(() => {
    setName(get(curProject, 'name', ''));
    setDescription(get(curProject, 'description', ''));
    setProjectGroup(find(projectGroups, { id: get(curProject, 'project_group_id') }) || projectGroups[0]);
    setPriority(get(curProject, 'priority_code', 0));
    setCurrency(get(curProject, 'currency', 0));
  }, [curProject])

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
        onConfirm={() => handleEditProject()}
      >
        <TextField
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
        <TextField
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
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);
