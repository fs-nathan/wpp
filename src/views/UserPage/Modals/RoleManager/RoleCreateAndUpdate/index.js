import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, TextField,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../../components/ColorButton';
import ColorTypo from '../../../../../components/ColorTypo';
import { createUserRole } from '../../../../../actions/userRole/createUserRole';
import { updateUserRole } from '../../../../../actions/userRole/updateUserRole';
import { connect } from 'react-redux';
import _ from 'lodash';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

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
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(0)}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>{updatedUserRole ? 'Chỉnh sửa vai trò' : 'Tạo vai trò'}</ColorTypo>
        <IconButton onClick={() => setOpen(0)}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
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
      </StyledDialogContent>
      <DialogActions>
        <ColorButton onClick={() => handleSubmit()} variant='text' variantColor='green'>
          Xong
        </ColorButton>
      </DialogActions>
    </Dialog>
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
