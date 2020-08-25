import { listPosition } from 'actions/position/listPosition';
import React from 'react';
import { connect } from 'react-redux';
import TitleManagerPresenter from './presenters';
import { positionsSelector } from './selectors';
import TitleCreateAndUpdateModal from './TitleCreateAndUpdate';
import TitleDeleteModal from './TitleDelete';

function TitleManager({ open, setOpen, positions, doListPosition }) {

  React.useEffect(() => {
    doListPosition();
    // eslint-disable-next-line
  }, []);

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
      <TitleManagerPresenter
        open={open} setOpen={setOpen}
        positions={positions}
        handleOpenModal={doOpenModal}
      />
      <TitleCreateAndUpdateModal
        open={openCAU}
        setOpen={setOpenCAU}
        {...CAUProps}
      />
      <TitleDeleteModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    positions: positionsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListPosition: (quite) => dispatch(listPosition(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TitleManager);
