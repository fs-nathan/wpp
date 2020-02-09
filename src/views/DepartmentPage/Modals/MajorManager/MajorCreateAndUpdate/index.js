import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { createMajor } from '../../../../../actions/major/createMajor';
import { updateMajor } from '../../../../../actions/major/updateMajor';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../../hooks';

function MajorCreateAndUpdate({ open, setOpen, updatedMajor = null, doCreateMajor, doUpdateMajor }) {

  const [name, setName, errorName] = useRequiredString(get(updatedMajor, 'name', ''), 150);
  const [description, setDescription, errorDescription] = useRequiredString(get(updatedMajor, 'description', ''), 350);

  React.useEffect(() => {
    setName(get(updatedMajor, 'name', ''));
    setDescription(get(updatedMajor, 'description', ''));
  }, [updatedMajor, setName, setDescription]);

  function handleSubmit() {
    if (updatedMajor) {
      doUpdateMajor({
        majorId: get(updatedMajor, 'id'),
        name,
        description,
      })
    } else {
      doCreateMajor({
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
      title={updatedMajor ? 'Chỉnh sửa chuyên ngành' : 'Tạo chuyên ngành'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleSubmit()}
      onCancle={() => setOpen(0)}
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

const mapDispatchToProps = dispatch => {
  return {
    doCreateMajor: ({ name, description }) => dispatch(createMajor({ name, description })),
    doUpdateMajor: ({ majorId, name, description }) => dispatch(updateMajor({ majorId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(MajorCreateAndUpdate);
