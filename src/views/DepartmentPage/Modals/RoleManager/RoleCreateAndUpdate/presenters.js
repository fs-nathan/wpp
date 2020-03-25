import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

function RoleCreateAndUpdate({
  open, setOpen,
  updatedUserRole = null,
  handleCreateOrUpdateUserRole
}) {

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription, errorDescription] = useMaxlenString('', 100);

  React.useEffect(() => {
    if (updatedUserRole) {
      setName(get(updatedUserRole, 'name', ''));
      setDescription(get(updatedUserRole, 'description', ''));
    }
  }, [updatedUserRole, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedUserRole ? 'Chỉnh sửa vai trò' : 'Tạo vai trò'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateUserRole(name, description)}
    >
      <ColorTypo>Tên vai trò</ColorTypo>
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
      <ColorTypo>Mô tả vai trò</ColorTypo>
      <TextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorDescription, 'message', '')}
          </ColorTypo>
        }
      />
    </CustomModal>
  )
}

export default RoleCreateAndUpdate;
