import { deleteLevel } from 'actions/level/deleteLevel';
import { listLevel } from 'actions/level/listLevel';
import AlertModal from 'components/AlertModal';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LevelCreateAndUpdateModal from './LevelCreateAndUpdate';
import LevelManagerPresenter from './presenters';
import { levelsSelector } from './selectors';

function LevelManager({
  open, setOpen,
  levels,
  doDeleteLevel,
  doListLevel,
}) {

  React.useEffect(() => {
    if (open) doListLevel();
    // eslint-disable-next-line
  }, [open]);

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
        handleDeleteLevel={level => doDeleteLevel({ levelId: get(level, 'id') })}
        handleOpenModal={doOpenModal}
      />
      <LevelCreateAndUpdateModal
        open={openCAUModal}
        setOpen={setOpenCAUModal}
        {...CAUProps}
      />
      <AlertModal
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
    doDeleteLevel: ({ levelId }) => dispatch(deleteLevel({ levelId })),
    doListLevel: (quite) => dispatch(listLevel(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelManager);
