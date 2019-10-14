import React from 'react';
import styled from 'styled-components';
import { 
  Slide, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, TableCell,
  Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import ColorChip from '../../../../components/ColorChip';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';
import { listPosition } from '../../../../actions/position/listPosition';
import { deletePosition } from '../../../../actions/position/deletePosition';
import { connect } from 'react-redux'; 
import { CustomEventListener, CustomEventDispose, CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION } from '../../../../constants/events';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import _ from 'lodash';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
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

const TableCellChipsWrapper = styled(TableCell)`
  & > div {
    display: flex;
    align-items: center;
    & > *:last-child {
      margin-left: 8px;
    }
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
}); 

function TitleManager({ open, setOpen, listPosition, doListPosition, deletePosition, doDeletePosition }) {

  const [openCAU, setOpenCAU] = React.useState(0);
  const { data: { positions }, loading: listPositionLoading, error: listPositionError } = listPosition;
  const { loading: deletePositionLoading, error: deletePositionError } = deletePosition;
  const loading = listPositionLoading || deletePositionLoading;
  const error = listPositionError || deletePositionError;
  const [updatedPosition, setUpdatedPosition] = React.useState(null);

  React.useEffect(() => {
    doListPosition();
  }, [doListPosition]);

  React.useEffect(() => {
    const doListPositionHandler = () => {
      doListPosition();
    };

    CustomEventListener(CREATE_POSITION, doListPositionHandler);
    CustomEventListener(UPDATE_POSITION, doListPositionHandler);
    CustomEventListener(DELETE_POSITION, doListPositionHandler);

    return () => {
      CustomEventDispose(CREATE_POSITION, doListPositionHandler);
      CustomEventDispose(UPDATE_POSITION, doListPositionHandler);
      CustomEventDispose(DELETE_POSITION, doListPositionHandler);
    }
  }, [doListPosition]);

  function handleSelectedPosition(selectedPos) {
    setUpdatedPosition(selectedPos);
    setOpenCAU(selectedPos ? 1 : 2);
  }

  function handleDeletePosition(position) {
    doDeletePosition({
      positionId: _.get(position, 'id'),
    });
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth='sm'
        fullWidth
        open={open}
        TransitionComponent={Transition}
        onClose={() => setOpen(0)}
        aria-labelledby="alert-dialog-slide-title"
      >
        <StyledDialogTitle id="alert-dialog-slide-title">
          <ColorTypo uppercase>Quản lý chức danh</ColorTypo>
          <IconButton onClick={() => setOpen(0)}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          {loading && <LoadingBox />}
          {error !== null && <ErrorBox />}
          {!loading && error === null && (
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Tên chức danh</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>
                    <ColorButton variantColor='orange' size='small' variant='contained'
                      onClick={() => handleSelectedPosition(null)}
                    >
                      + Thêm mới
                    </ColorButton>
                  </TableCell>
                </TableRow>
              </StyledTableHead>
              <StyledTableBody>
                {positions.map(position => (
                  <TableRow key={_.get(position, 'id', '')}>
                    <TableCell>{_.get(position, 'name', '')}</TableCell>
                    <TableCell>{_.get(position, 'description', '')}</TableCell>
                    <TableCellChipsWrapper>
                      <div>
                        <ColorChip onClick={() => handleSelectedPosition(position)} label='Sửa' color='green' size='small' badge />
                        <ColorChip onClick={() => handleDeletePosition(position)} label='Xóa' color='red' size='small' badge />
                      </div>
                    </TableCellChipsWrapper>
                  </TableRow>
                ))}
              </StyledTableBody>
            </Table>
          )}
        </StyledDialogContent>
        <DialogActions>
          <ColorButton onClick={() => setOpen(0)} variant='text' variantColor='green'>
            Xong
          </ColorButton>
        </DialogActions>
      </Dialog>
      <TitleCreateAndUpdateModal updatedPosition={updatedPosition} open={openCAU !== 0} setOpen={setOpenCAU} />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listPosition: state.position.listPosition,
    deletePosition: state.position.deletePosition,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListPosition: () => dispatch(listPosition()),
    doDeletePosition: ({ positionId }) => dispatch(deletePosition({ positionId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
