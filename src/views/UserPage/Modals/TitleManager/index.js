import React from 'react';
import styled from 'styled-components';
import { 
  TableCell, Table, TableHead, TableBody, TableRow,
} from '@material-ui/core';
import ColorButton from '../../../../components/ColorButton';
import PillButton from '../../../../components/PillButton';
import colorPal from '../../../../helpers/colorPalette';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';
import { listPosition } from '../../../../actions/position/listPosition';
import { deletePosition } from '../../../../actions/position/deletePosition';
import { connect } from 'react-redux'; 
import { CustomEventListener, CustomEventDispose, CREATE_POSITION, UPDATE_POSITION, DELETE_POSITION } from '../../../../constants/events';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';

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

const StyledTableCell = styled(TableCell)`
  font-weight: 500;
  &:first-child {
    min-width: 200px;
  }
`;

const StyledTable = styled(Table)`
  & * {
    font-size: 14px;
  }
`;

function TitleManager({ open, setOpen, listPosition, doDeletePosition }) {

  const [openCAU, setOpenCAU] = React.useState(0);
  const { data: { positions }, loading, error } = listPosition;
  const [updatedPosition, setUpdatedPosition] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [delPos, setDelPos] = React.useState();

  function handleSelectedPosition(selectedPos) {
    setUpdatedPosition(selectedPos);
    setOpenCAU(selectedPos ? 1 : 2);
  }

  function handleDeletePosition(position) {
    doDeletePosition({
      positionId: get(position, 'id'),
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Quản lý chức danh'
        onCancle={() => setOpen(0)}
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <StyledTable
            fullWidth
          >
            <StyledTableHead>
              <TableRow>
                <StyledTableCell>Tên chức danh</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
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
                <TableRow key={get(position, 'id', '')}>
                  <StyledTableCell>{get(position, 'name', '')}</StyledTableCell>
                  <TableCell>{get(position, 'description', '')}</TableCell>
                  <TableCellChipsWrapper>
                    <div>
                      <PillButton 
                        onClick={() => handleSelectedPosition(position)}
                        background={'#eeeeee'}
                        text={'#222222'}
                        size='large' 
                      >
                        Sửa
                      </PillButton>
                      <PillButton 
                        onClick={() => {
                          setDelPos(position)
                          setAlert(true)
                        }}
                        background={'#eeeeee'}
                        text={colorPal['red'][0]}
                        size='large' 
                      >
                        Xóa
                      </PillButton>
                     </div>
                  </TableCellChipsWrapper>
                </TableRow>
              ))}
            </StyledTableBody>
          </StyledTable>
        )}
      </CustomModal>
      <TitleCreateAndUpdateModal updatedPosition={updatedPosition} open={openCAU !== 0} setOpen={setOpenCAU} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa vị trí?'
        onConfirm={() => handleDeletePosition(delPos)}
      />
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
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doDeletePosition: ({ positionId }) => dispatch(deletePosition({ positionId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
