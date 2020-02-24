import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { get } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../../hooks';

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
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên vai trò'
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
        label='Mô tả vai trò'
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
