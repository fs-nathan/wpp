import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';
import { listPosition } from '../../../../actions/position/listPosition';
import { deletePosition } from '../../../../actions/position/deletePosition';
import { connect } from 'react-redux'; 
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';

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
          <SimpleManagerTable 
            data={positions}
            handleAdd={() => handleSelectedPosition(null)}
            handleEdit={position => handleSelectedPosition(position)}
            handleDelete={position => {
              setDelPos(position)
              setAlert(true)
            }}
          />
        )}
      </CustomModal>
      <TitleCreateAndUpdateModal updatedPosition={updatedPosition} open={openCAU !== 0} setOpen={setOpenCAU} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa chức danh?'
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
