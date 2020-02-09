import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import LevelCreateAndUpdateModal from './LevelCreateAndUpdate';
import { listLevel } from '../../../../actions/level/listLevel';
import { deleteLevel } from '../../../../actions/level/deleteLevel';
import { connect } from 'react-redux'; 
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';

function LevelManager({ open, setOpen, listLevel, doDeleteLevel }) {

  const [openCAU, setOpenCAU] = React.useState(0);
  const { data: { levels }, loading, error } = listLevel;
  const [updatedLevel, setUpdatedLevel] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [delLevel, setDelLevel] = React.useState();

  function handleSelectedLevel(selectedLevel) {
    setUpdatedLevel(selectedLevel);
    setOpenCAU(selectedLevel ? 1 : 2);
  }

  function handleDeleteLevel(level) {
    doDeleteLevel({
      levelId: get(level, 'id'),
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Quản lý trình độ'
        confirmRender={null}
        cancleRender={() => 'Thoát'}
        onCancle={() => setOpen(0)}
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <SimpleManagerTable 
            data={levels}
            handleAdd={() => handleSelectedLevel(null)}
            handleEdit={level => handleSelectedLevel(level)}
            handleDelete={level => {
              setDelLevel(level)
              setAlert(true)
            }}
          />
        )}
      </CustomModal>
      <LevelCreateAndUpdateModal updatedLevel={updatedLevel} open={openCAU !== 0} setOpen={setOpenCAU} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa trình độ?'
        onConfirm={() => handleDeleteLevel(delLevel)}
      />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listLevel: state.level.listLevel,
    deleteLevel: state.level.deleteLevel,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListLevel: (quite) => dispatch(listLevel(quite)),
    doDeleteLevel: ({ levelId }) => dispatch(deleteLevel({ levelId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelManager);
