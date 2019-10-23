import React from 'react';
import { 
  TextField,
} from '@material-ui/core';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { createUserRole } from '../../../../../actions/userRole/createUserRole';
import { updateUserRole } from '../../../../../actions/userRole/updateUserRole';
import { connect } from 'react-redux';
import _ from 'lodash';

function RoleCreateAndUpdate({ open, setOpen, updatedUserRole = null, doCreateUserRole, doUpdateUserRole }) {

  const [name, setName] = React.useState(_.get(updatedUserRole, 'name', ''));
  const [description, setDescription] = React.useState(_.get(updatedUserRole, 'description', ''));

  React.useEffect(() => {
    setName(_.get(updatedUserRole, 'name', ''));
    setDescription(_.get(updatedUserRole, 'description', ''));
  }, [updatedUserRole]);

  function handleSubmit() {
    if (updatedUserRole) {
      doUpdateUserRole({
        userRoleId: _.get(updatedUserRole, 'id'),
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
            Tối đa 100 ký tự
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
            Tối đa 100 ký tự
          </ColorTypo>
        }
      />
    </CustomModal>
  )
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    doCreateUserRole: ({ name, description }) => dispatch(createUserRole({ name, description })),
    doUpdateUserRole: ({ userRoleId, name, description }) => dispatch(updateUserRole({ userRoleId, name, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleCreateAndUpdate);
