import React from 'react';
import styled from 'styled-components';
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import LeftPart from './LeftPart';
import RightPart from './RightPart';

const StyledDialogContent = styled(DialogContent)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr);
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

function TableSettings({ open, setOpen }) {

  return (
    <React.Fragment>
      <Dialog
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
      >
        <StyledDialogTitle id="alert-dialog-slide-title">
          <ColorTypo uppercase>Cài đặt bảng</ColorTypo>
          <IconButton onClick={() => setOpen(0)}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <LeftPart />
          <RightPart />
        </StyledDialogContent>
        <DialogActions>
          <ColorButton onClick={() => setOpen(0)} variant='text' variantColor='green'>
            Hoàn thành
          </ColorButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default TableSettings;
