import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

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
  }, [updatedLevel, setDescription, setName]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedLevel ? 'Chỉnh sửa trình độ' : 'Tạo trình độ'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateLevel(name, description)}
    >
      <ColorTypo>Tên trình độ</ColorTypo>
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <ColorTypo>Mô tả trình độ</ColorTypo>
      <TextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
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
