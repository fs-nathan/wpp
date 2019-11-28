import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { createUserRole } from '../../../../../actions/userRole/createUserRole';
import { updateUserRole } from '../../../../../actions/userRole/updateUserRole';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../../hooks';

function RoleCreateAndUpdate({ open, setOpen, updatedUserRole = null, doCreateUserRole, doUpdateUserRole }) {

  const [name, setName, errorName] = useRequiredString(get(updatedUserRole, 'name', ''), 100);
  const [description, setDescription, errorDescription] = useRequiredString(get(updatedUserRole, 'description', ''), 100);

  React.useEffect(() => {
    setName(get(updatedUserRole, 'name', ''));
    setDescription(get(updatedUserRole, 'description', ''));
  }, [updatedUserRole]);

  function handleSubmit() {
    if (updatedUserRole) {
      doUpdateUserRole({
        userRoleId: get(updatedUserRole, 'id'),
        name,
        description,
      })
    } else {
      doCreateUserRole({
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
      title={updatedUserRole ? 'Chỉnh sửa vai trò' : 'Tạo vai trò'}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleSubmit()}
      onCancle={() => setOpen(0)}
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

const mapDispatchToProps = dispatch => {
  return {
    doCreateUserRole: ({ name, description }) => dispatch(createUserRole({ name, description })),
    doUpdateUserRole: ({ userRoleId, name, description }) => dispatch(updateUserRole({ userRoleId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(RoleCreateAndUpdate);
