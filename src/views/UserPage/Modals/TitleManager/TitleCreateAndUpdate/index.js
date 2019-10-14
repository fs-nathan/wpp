import React from 'react';
import styled from 'styled-components';
import { 
  Slide, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, TextField,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../../components/ColorButton';
import ColorTypo from '../../../../../components/ColorTypo';
import { createPosition } from '../../../../../actions/position/createPosition';
import { updatePosition } from '../../../../../actions/position/updatePosition';
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
  return <Slide direction='down' ref={ref} {...props} />;
}); 

function TitleManager({ open, setOpen, updatedPosition = null, doCreatePosition, doUpdatePosition }) {

  const [name, setName] = React.useState(_.get(updatedPosition, 'name', ''));
  const [description, setDescription] = React.useState(_.get(updatedPosition, 'description', ''));

  React.useEffect(() => {
    setName(_.get(updatedPosition, 'name', ''));
    setDescription(_.get(updatedPosition, 'description', ''));
  }, [updatedPosition]);

  function handleSubmit() {
    if (updatedPosition) {
      doUpdatePosition({
        positionId: _.get(updatedPosition, 'id'),
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
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(0)}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>{updatedPosition ? 'Chỉnh sửa chức danh' : 'Tạo chức danh'}</ColorTypo>
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
          label='Tên chức danh'
          fullWidth
          helperText={
            <ColorTypo variant='caption' color='red'>
              Tối đa 150 ký tự
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
              Tối đa 350 ký tự
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
    doCreatePosition: ({ name, description }) => dispatch(createPosition({ name, description })),
    doUpdatePosition: ({ positionId, name, description }) => dispatch(updatePosition({ positionId, name, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
