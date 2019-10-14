import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, TableCell,
  Table, TableHead, TableBody, TableRow, Radio, Checkbox,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(false, false, false, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledTableHead = styled(TableHead)` 
  background-color: #eee; 
  & * {
    text-transform: none;
  }
`;

const StyledTableBody = styled(TableBody)`
`;

const TableCellRadioWrapper = styled(TableCell)`
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TableCellCheckboxWrapper = styled(TableCell)`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

function PermissionSettings({ open, setOpen }) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
      >
        <StyledDialogTitle id="alert-dialog-slide-title">
          <ColorTypo uppercase>Phân quyền thành viên</ColorTypo>
          <IconButton onClick={() => setOpen(false)}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>Tên quyền</TableCell>
                <TableCellRadioWrapper>
                  <div>
                    <ColorTypo color='red'>Chủ tài khoản</ColorTypo>
                    <Radio 
                      checked
                    />
                  </div>
                </TableCellRadioWrapper>
                <TableCellRadioWrapper>
                  <div>
                    <ColorTypo>Quản lý</ColorTypo>
                    <Radio />
                  </div>
                </TableCellRadioWrapper>
                <TableCellRadioWrapper>
                  <div>
                    <ColorTypo>Thành viên</ColorTypo>
                    <Radio />
                  </div>
                </TableCellRadioWrapper>
                <TableCellRadioWrapper>
                  <div>
                    <ColorTypo>Khác</ColorTypo>
                    <Radio />
                  </div>
                </TableCellRadioWrapper>
              </TableRow>
            </StyledTableHead>
            <StyledTableBody>
              <TableRow>
                <TableCell>Quyền A</TableCell>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled checked />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled checked />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled />
                  </div>
                </TableCellCheckboxWrapper>
              </TableRow>
              <TableRow>
                <TableCell>Quyền B</TableCell>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled checked />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled checked />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled checked />
                  </div>
                </TableCellCheckboxWrapper>
                <TableCellCheckboxWrapper>
                  <div>
                    <Checkbox disabled />
                  </div>
                </TableCellCheckboxWrapper>
              </TableRow>
              
            </StyledTableBody>
          </Table>
        </StyledDialogContent>
        <DialogActions>
          <ColorButton onClick={() => setOpen(false)} variant='text' variantColor='green'>
            Xong
          </ColorButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PermissionSettings;
