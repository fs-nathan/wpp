import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { get } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../../hooks';

function MajorCreateAndUpdate({ 
  open, setOpen, 
  updatedMajor = null, 
  handleCreateOrUpdateMajor,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);

  React.useEffect(() => {
    if (updatedMajor) {
      setName(get(updatedMajor, 'name', ''));
      setDescription(get(updatedMajor, 'description', ''));
    }
  }, [updatedMajor, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedMajor ? 'Chỉnh sửa chuyên ngành' : 'Tạo chuyên ngành'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateMajor(name, description)}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên chuyên ngành'
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
        label='Mô tả chuyên ngành'
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

export default MajorCreateAndUpdate;
