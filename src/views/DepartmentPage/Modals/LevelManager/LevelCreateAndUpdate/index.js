import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { createLevel } from '../../../../../actions/level/createLevel';
import { updateLevel } from '../../../../../actions/level/updateLevel';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../../hooks';

function LevelCreateAndUpdate({ open, setOpen, updatedLevel = null, doCreateLevel, doUpdateLevel }) {

  const [name, setName, errorName] = useRequiredString(get(updatedLevel, 'name', ''), 150);
  const [description, setDescription, errorDescription] = useRequiredString(get(updatedLevel, 'description', ''), 350);

  React.useEffect(() => {
    setName(get(updatedLevel, 'name', ''));
    setDescription(get(updatedLevel, 'description', ''));
  }, [updatedLevel, setName, setDescription]);

  function handleSubmit() {
    if (updatedLevel) {
      doUpdateLevel({
        levelId: get(updatedLevel, 'id'),
        name,
        description,
      })
    } else {
      doCreateLevel({
        name,
        description,
      })
    }
    setOpen(0);
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedLevel ? 'Chỉnh sửa trình độ' : 'Tạo trình độ'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleSubmit()}
      onCancle={() => setOpen(0)}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên trình độ'
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <TextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Mô tả trình độ'
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
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateLevel: ({ name, description }) => dispatch(createLevel({ name, description })),
    doUpdateLevel: ({ levelId, name, description }) => dispatch(updateLevel({ levelId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(LevelCreateAndUpdate);
