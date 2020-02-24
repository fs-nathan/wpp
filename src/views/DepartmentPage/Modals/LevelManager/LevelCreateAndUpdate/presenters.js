import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { get } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../../hooks';

function LevelCreateAndUpdate({ 
  updatedLevel = null, 
  open, setOpen, 
  handleCreateOrUpdateLevel,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);

  React.useEffect(() => {
    if (updatedLevel) {
      setName(get(updatedLevel, 'name', ''));
      setDescription(get(updatedLevel, 'description', ''));
    }
  }, [updatedLevel]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedLevel ? 'Chỉnh sửa trình độ' : 'Tạo trình độ'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateLevel(name, description)}
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

export default LevelCreateAndUpdate;
