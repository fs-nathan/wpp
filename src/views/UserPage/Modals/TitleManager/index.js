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
import _ from 'lodash';

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
    if (window.confirm('Bạn chắc chắn muốn xóa vị trí?')) {
      doDeletePosition({
        positionId: _.get(position, 'id'),
      });
    }
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
                      <PillButton 
                        onClick={() => handleSelectedPosition(position)}
                        background={colorPal['green'][0]}
                        text={colorPal['green'][1]}
                        size='small' 
                      >
                        Sửa
                      </PillButton>
                      <PillButton 
                        onClick={() => handleDeletePosition(position)}
                        background={colorPal['red'][0]}
                        text={colorPal['red'][1]}
                        size='small' 
                      >
                        Xóa
                      </PillButton>
                     </div>
                  </TableCellChipsWrapper>
                </TableRow>
              ))}
            </StyledTableBody>
          </Table>
        )}
      </CustomModal>
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
