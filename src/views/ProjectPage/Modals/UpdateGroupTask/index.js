import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import { updateGroupTask } from '../../../../actions/groupTask/updateGroupTask';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../hooks';
import './style.scss';

const CustomTextField = ({ className = '', ...props }) =>
  <TextField 
    className={`view_Project_UpdateGroupTask_Modal___text-field ${className}`}
    {...props}
  />;

function UpdateGroupTask({ open, setOpen, curGroupTask = null, doUpdateGroupTask, }) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (curGroupTask !== null) {
      setName(get(curGroupTask, 'name', ''));
      setDescription(get(curGroupTask, 'description', ''));
    }
  }, [curGroupTask]);

  function handleUpdateGroupTask() {
    doUpdateGroupTask({
      groupTaskId: get(curGroupTask, 'id'),
      name,
      description,
    })
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`Cập nhập nhóm công việc`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName}
        onConfirm={() => handleUpdateGroupTask()}
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
    doUpdateGroupTask: ({ groupTaskId, name, description }) => dispatch(updateGroupTask({ groupTaskId, name, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateGroupTask);
