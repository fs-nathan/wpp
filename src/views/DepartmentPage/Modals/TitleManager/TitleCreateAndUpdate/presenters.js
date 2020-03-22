import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

function TitleManager({
  open, setOpen,
  updatedPosition = null,
  handleCreateOrUpdatePosition
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);

  React.useEffect(() => {
    if (updatedPosition) {
      setName(get(updatedPosition, 'name', ''));
      setDescription(get(updatedPosition, 'description', ''));
    }
  }, [updatedPosition, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedPosition ? 'Chỉnh sửa chức danh' : 'Tạo chức danh'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdatePosition(name, description)}
    >
      <ColorTypo>Tên chức danh</ColorTypo>
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên chức danh'
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <ColorTypo>Mô tả chức danh</ColorTypo>
      <TextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Mô tả chức danh'
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

export default TitleManager;
