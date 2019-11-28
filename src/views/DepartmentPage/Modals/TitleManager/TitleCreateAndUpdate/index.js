import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { createPosition } from '../../../../../actions/position/createPosition';
import { updatePosition } from '../../../../../actions/position/updatePosition';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../../hooks';

function TitleManager({ open, setOpen, updatedPosition = null, doCreatePosition, doUpdatePosition }) {

  const [name, setName, errorName] = useRequiredString(get(updatedPosition, 'name', ''), 150);
  const [description, setDescription, errorDescription] = useRequiredString(get(updatedPosition, 'description', ''), 350);

  React.useEffect(() => {
    setName(get(updatedPosition, 'name', ''));
    setDescription(get(updatedPosition, 'description', ''));
  }, [updatedPosition]);

  function handleSubmit() {
    if (updatedPosition) {
      doUpdatePosition({
        positionId: get(updatedPosition, 'id'),
        name,
        description,
      })
    } else {
      doCreatePosition({
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
      title={updatedPosition ? 'Chỉnh sửa chức danh' : 'Tạo chức danh'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleSubmit()}
      onCancle={() => setOpen(0)}
    >
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

const mapDispatchToProps = dispatch => {
  return {
    doCreatePosition: ({ name, description }) => dispatch(createPosition({ name, description })),
    doUpdatePosition: ({ positionId, name, description }) => dispatch(updatePosition({ positionId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(TitleManager);
