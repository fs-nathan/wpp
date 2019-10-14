import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, Avatar, IconButton, 
  List, ListItem, ListItemText, ListItemAvatar,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import avatar from '../../../../assets/avatar.jpg';
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

function UserDocument({ open, setOpen, files }) {

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>File hồ sơ thành viên</ColorTypo>
        <IconButton onClick={() => setOpen(false)}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <List>
          {files.map(file => (
            <ListItem button key={_.get(file, 'id', '')} component='a' href={_.get(file, 'url', '/')} target='_blank'>
              <ListItemAvatar>
                <Avatar src={avatar} alt='avatar' />
              </ListItemAvatar>
              <ListItemText
                primary={_.get(file, 'name', '')}
                secondary={`${_.get(file, 'size', 0)} bytes`}
              />
            </ListItem>
          ))}
        </List>
      </StyledDialogContent>
      <DialogActions>
        <ColorButton onClick={() => setOpen(false)} variant='text' variantColor='green'>
          Hoàn thành
        </ColorButton>
      </DialogActions>
    </Dialog>
  )
}

export default UserDocument;
