import React from 'react';
import SimpleManagerTable from '../../../../components/SimpleManagerTable';
import MajorCreateAndUpdateModal from './MajorCreateAndUpdate';
import { listMajor } from '../../../../actions/major/listMajor';
import { deleteMajor } from '../../../../actions/major/deleteMajor';
import { connect } from 'react-redux'; 
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomModal from '../../../../components/CustomModal';
import AlertModal from '../../../../components/AlertModal';
import { get } from 'lodash';

function MajorManager({ open, setOpen, listMajor, doDeleteMajor }) {

  const [openCAU, setOpenCAU] = React.useState(0);
  const { data: { majors }, loading, error } = listMajor;
  const [updatedMajor, setUpdatedMajor] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [delMajor, setDelMajor] = React.useState();

  function handleSelectedMajor(selectedMajor) {
    setUpdatedMajor(selectedMajor);
    setOpenCAU(selectedMajor ? 1 : 2);
  }

  function handleDeleteMajor(major) {
    doDeleteMajor({
      majorId: get(major, 'id'),
    });
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title='Quản lý chuyên ngành'
        confirmRender={null}
        cancleRender={() => 'Thoát'}
        onCancle={() => setOpen(0)}
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <SimpleManagerTable 
            data={majors}
            handleAdd={() => handleSelectedMajor(null)}
            handleEdit={major => handleSelectedMajor(major)}
            handleDelete={major => {
              setDelMajor(major)
              setAlert(true)
            }}
          />
        )}
      </CustomModal>
      <MajorCreateAndUpdateModal updatedMajor={updatedMajor} open={openCAU !== 0} setOpen={setOpenCAU} />
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa chuyên ngành?'
        onConfirm={() => handleDeleteMajor(delMajor)}
      />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listMajor: state.major.listMajor,
    deleteMajor: state.major.deleteMajor,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doDeleteMajor: ({ majorId }) => dispatch(deleteMajor({ majorId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorManager);
