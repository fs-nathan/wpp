import { deleteMajor } from 'actions/major/deleteMajor';
import { listMajor } from 'actions/major/listMajor';
import AlertModal from 'components/AlertModal';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import MajorCreateAndUpdateModal from './MajorCreateAndUpdate';
import MajorManagerPresenter from './presenters';
import { majorsSelector } from './selectors';

function MajorManager({
  open, setOpen,
  majors,
  doDeleteMajor,
  doListMajor,
}) {

  React.useEffect(() => {
    if (open) doListMajor();
    // eslint-disable-next-line
  }, [open]);

  const [openCAU, setOpenCAU] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCAU(true);
        setCAUProps({});
        return;
      }
      case 'UPDATE': {
        setOpenCAU(true);
        setCAUProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <MajorManagerPresenter
        open={open} setOpen={setOpen}
        majors={majors}
        handleDeleteMajor={major => doDeleteMajor({ majorId: get(major, 'id') })}
        handleOpenModal={doOpenModal}
      />
      <MajorCreateAndUpdateModal
        open={openCAU}
        setOpen={setOpenCAU}
        {...CAUProps}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    majors: majorsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteMajor: ({ majorId }) => dispatch(deleteMajor({ majorId })),
    doListMajor: (quite) => dispatch(listMajor(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorManager);
