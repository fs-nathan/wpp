import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { 
  TextField,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import { createGroupTask } from '../../../../actions/groupTask/createGroupTask';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../hooks';

const CustomTextField = styled(TextField)`
  & > label {
    z-index: 0;
  }
`;

function CreateNewGroupTask({ open, setOpen, doCreateGroupTask, }) {

  const { projectId } = useParams();
  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription] = useRequiredString('', 200);

  function handleCreateNewGroupTask() {
    doCreateGroupTask({
      projectId,
      name,
      description,
    }); 
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Tạo mới nhóm công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDescription}
        onConfirm={() => handleCreateNewGroupTask()}
      >
        <CustomTextField
          value={name}
          onChange={evt => setName(evt.target.value)}
          margin="normal"
          variant="outlined"
          label='Tên nhóm công việc'
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
          label='Mô tả nhóm công việc'
          fullWidth
          multiline
          rowsMax='4'
          helperText={
            <ColorTypo variant='caption' color='red'>
              {get(errorDescription, 'message', '')}
            </ColorTypo>
          }
        />
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
    doCreateGroupTask: ({ projectId, name, description }) => dispatch(createGroupTask({ projectId, name, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewGroupTask);
