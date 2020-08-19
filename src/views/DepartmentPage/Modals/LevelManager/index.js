import { listLevel } from 'actions/level/listLevel';
import React from 'react';
import { connect } from 'react-redux';
import LevelCreateAndUpdateModal from './LevelCreateAndUpdate';
import LevelDeleteModal from './LevelDelete';
import LevelManagerPresenter from './presenters';
import { levelsSelector } from './selectors';

function LevelManager({
  open, setOpen,
  levels,
  doDeleteLevel,
  doListLevel,
}) {

  React.useEffect(() => {
    doListLevel();
    // eslint-disable-next-line
  }, []);

  const [openCAUModal, setOpenCAUModal] = React.useState(false);
  const [CAUProps, setCAUProps] = React.useState({});
  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': {
        setOpenCAUModal(true);
        setCAUProps({});
        return;
      }
      case 'UPDATE': {
        setOpenCAUModal(true);
        setCAUProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlertModal(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <LevelManagerPresenter
        open={open} setOpen={setOpen}
        levels={levels}
        handleOpenModal={doOpenModal}
      />
      <LevelCreateAndUpdateModal
        open={openCAUModal}
        setOpen={setOpenCAUModal}
        {...CAUProps}
      />
      <LevelDeleteModal
        open={openAlertModal}
        setOpen={setOpenAlertModal}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    levels: levelsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListLevel: (quite) => dispatch(listLevel(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelManager);
